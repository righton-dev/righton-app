import React, { NativeMethodsMixin } from 'react';
import {
  findNodeHandle,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';
import InputModal from '../../../components/InputModal';
import { Auth } from 'aws-amplify';
import MFAPrompt from '../../../../lib/Categories/Auth/Components/MFAPrompt';
import ButtonRound from '../../../components/ButtonRound';
import Message from '../../../components/Message';
import Constants from '../../../utils/constants';
import debug from '../../../utils/debug';
import { colors, elevation, fonts } from '../../../utils/theme';
import styles from '../LogIn/styles';
import { putStudentAccountToDynamoDB } from '../../../../lib/Categories/DynamoDB/StudentAccountsAPI';
import { putTeacherAccountToDynamoDB } from '../../../../lib/Categories/DynamoDB/TeacherAccountsAPI';
import LocalStorage from '../../../../lib/Categories/LocalStorage';


class SignUp extends React.Component {
  static navigationOptions = {
    title: Constants.APP_NAME,
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    screenProps: PropTypes.shape({
      deviceSettings: PropTypes.shape({
        role: PropTypes.string,
      }),
      handleSetAppState: PropTypes.func.isRequired,
    }),
  };

  static defaultProps = {
    navigation: {
      navigate: () => {},
    },
    screenProps: {      
      deviceSettings: {
        role: '',
      },
      handleSetAppState: () => {},
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      buttonActivity: false,
      email: '',
      messageProps: null,
      password: '',
      passwordFocused: false,
      retypePassword: '',
      showInput: null,
      showMFAPrompt: false,
    };

    this.baseState = this.state;
    this.emailRef = null;
    this.passwordRef = null;
    this.retypeRef = null;
  }


  onEmailLayout = () => {
    if (this.emailRef) {
      NativeMethodsMixin.measureInWindow.call(
        findNodeHandle(this.emailRef),
        (x, y) => {
          this['Your Email AddressX'] = x;
          this['Your Email AddressY'] = y + 9 + fonts.small;
        }
      );
    }
  }


  onPasswordLayout = () => {
    if (this.passwordRef) {
      NativeMethodsMixin.measureInWindow.call(
        findNodeHandle(this.passwordRef),
        (x, y) => {
          this.PasswordX = x;
          this.PasswordY = y + 9 + fonts.small;
        }
      );
    }
  }


  onRetypeLayout = () => {
    if (this.retypeRef) {
      NativeMethodsMixin.measureInWindow.call(
        findNodeHandle(this.retypeRef),
        (x, y) => {
          this['Retype PasswordX'] = x;
          this['Retype PasswordY'] = y + 9 + fonts.small;
        }
      );
    }
  }


  onSignUp = () => {
    // this.setState(this.baseState);

    if (this.props.screenProps.deviceSettings.role === 'student') {
      this.props.navigation.navigate('StudentApp');        
    } else {
      this.props.navigation.navigate('TeacherApp');
    }
  }

  handleSignUp = () => {
    this.setState({ buttonActivity: true });
    const allReqsPass = this.checkRequirements();
    if (!allReqsPass) {
      this.setState({ buttonActivity: false });
      return;
    }

    const { password, email } = this.state;
    let userConfirmed = true;

    debug.log('Attempting sign up w/ email & password:', email, password);


    const username = email.toLowerCase();

    Auth.signUp(username, password, username, null)
      .then((data) => {
        userConfirmed = data.userConfirmed;

        debug.log('Sign up data received:', JSON.stringify(data));
        this.setState({ showMFAPrompt: !userConfirmed });

        if (userConfirmed) {
          this.onSignUp();
        }
      })
      .catch((exception) => {
        if (exception.message === 'User is already confirmed') {
          this.setState({
            buttonActivity: false,
            messageProps: {
              closeFunc: this.handleCloseMessage,
              bodyStyle: null,
              textStyle: null,
              duration: null,
              message: 'This email already exists.',
              timeout: 4000,
            },
            showMFAPrompt: false,
          });
          return;
        }
        if (exception.code === 'UsernameExistsException') {
          Auth.resendSignUp(username)
            .catch((err) => {
              if (err.message === 'User is already confirmed.') {
                this.setState({
                  buttonActivity: false,
                  messageProps: {
                    closeFunc: this.handleCloseMessage,
                    bodyStyle: null,
                    textStyle: null,
                    duration: null,
                    message: 'An account with that email already exists.',
                    timeout: 8000,
                  },
                });
              }
            });

          this.setState({
            buttonActivity: false,
            messageProps: {
              closeFunc: this.handleCloseMessage,
              bodyStyle: null,
              textStyle: null,
              duration: null,
              message: 'Please verify email account with verification code.',
              timeout: 4000,
            },
          }, () => {
            setTimeout(() => {
              if (this.state.messageProps.message === 'Please verify email account with verification code.') {
                // Only display prompt is the exception above was not caught
                this.setState({ showMFAPrompt: true });
              }
            }, 3500);
          });
          return;
        }

        const errorMessage = exception.invalidCredentialsMessage || exception.message || exception;
        debug.warn('Sign up exception:', JSON.stringify(exception));
        this.setState({
          buttonActivity: false,
          messageProps: {
            closeFunc: this.handleCloseMessage,
            bodyStyle: null,
            textStyle: null,
            duration: null,
            message: errorMessage,
            timeout: null,
          },
        });
      });
  }


  handleConfirmedSignUp = (accountType, username) => {
    const deviceSettings = {};
    const account = {};
    deviceSettings.username = username;
    const date = Date.now();
    account.signUpDate = date;

    if (accountType === 'teacher') {
      account.TeacherID = username;
      account.gamesCreated = 0;
      account.gamesPlayed = 0;
      account.schoolID = null;
      account.games = [];
      account.history = [];
      account.sharedGames = [];
      account.gamesRef = { local: 0, db: 0 };
      account.historyRef = { local: 0, db: 0 };

      deviceSettings.quizTime = '1:00';
      deviceSettings.trickTime = '3:00';
      deviceSettings.role = 'teacher';

      LocalStorage.setItem(`@RightOn:${username}/Games`, '[]');
      LocalStorage.setItem(`@RightOn:${username}/History`, '[]');

      putTeacherAccountToDynamoDB(
        account,
        res => debug.log('Successfully PUT new teacher account into DynamoDB', res),
        exception => debug.warn('Error PUTTING new teacher account into DynamoDB', exception),
      );
    } else if (accountType === 'student') {
      account.StudentID = username;
      account.gamesPlayed = 0;
      account.playersTricked = 0;
      account.tricksSuggested = 0;
      account.points = 0;

      deviceSettings.role = 'student';
      deviceSettings.ID = `${Math.random()}`;

      putStudentAccountToDynamoDB(
        account,
        res => debug.log('Successfully PUT new student account into DynamoDB', res),
        exception => debug.warn('Error PUTTING new student account into DynamoDB', exception),
      );
    }

    const { handleSetAppState } = this.props.screenProps;
    handleSetAppState('account', account);
    handleSetAppState('deviceSettings', deviceSettings);
    
    const stringifiedAccount = JSON.stringify(account);
    LocalStorage.setItem(`@RightOn:${username}`, stringifiedAccount);

    const stringifiedDeviceSettings = JSON.stringify(deviceSettings);
    LocalStorage.setItem('@RightOn:DeviceSettings', stringifiedDeviceSettings);
  }


  handleEmailRef = (ref) => {
    this.emailRef = ref;
  }

  
  handlePasswordRef = (ref) => {
    this.passwordRef = ref;
  }


  handleRetypeRef = (ref) => {
    this.retypeRef = ref;
  }


  checkRequirements = () => {
    const emailPassed = this.handleEmailSubmit();
    if (!emailPassed) return false;
    const passwordPassed = this.handlePasswordSubmit();
    if (!passwordPassed) return false;
    const retypePassed = this.handleRetypePasswordSubmit();
    if (!retypePassed) return false;
    return true;
  }


  handleMFAValidate = async (code = '') => {
    const { email } = this.state;
    const username = email.toLowerCase();
    try {
      await Auth.confirmSignUp(username, code)
        .then((data) => {
          if (this.props.screenProps.deviceSettings.role === 'student') {
            this.handleConfirmedSignUp('student', username);     
          } else {
            this.handleConfirmedSignUp('teacher', username);
          }
          debug.log('sign up successful ->', JSON.stringify(data));
        });
    } catch (exception) {
      const errorMessage = exception.invalidCredentialsMessage || exception.message || exception;
      this.setState({
        buttonActivity: false,
        messageProps: {
          closeFunc: this.handleCloseMessage,
          bodyStyle: null,
          textStyle: null,
          duration: null,
          message: errorMessage,
          timeout: 4000,
        },
      });
      return exception.message || exception;
    }
    return true;
  }


  handleMFACancel = () => {
    this.setState({ buttonActivity: false, showMFAPrompt: false });
  }


  handleMFASuccess = () => {
    this.setState({
      showMFAPrompt: false,
      messageProps: {
        closeFunc: this.handleCloseMessage,
        bodyStyle: null,
        textStyle: null,
        duration: null,
        message: 'Sign up successful!',
        timeout: null,
      },
    }, () => this.onSignUp());
  }


  closeInputModal = (input, inputLabel) => {
    switch (inputLabel) {
      case 'Your Email Address': {
        this.setState({ email: input, showInput: false }, () => {
          const emailPassed = this.handleEmailSubmit();
  
          if (input && emailPassed && !this.state.password) {
            this.handleInputModal('Password', 'Password', 75, '');
          }
        });
        break;
      }
      case 'Password': {
        this.setState({ password: input, showInput: false }, () => {
          const passwordPassed = this.handlePasswordSubmit();
  
          if (input && passwordPassed && !this.state.retypePassword) {
            this.handleInputModal('Retype Password', 'Retype Password', 75, '');
          }
        });
        break;
      }
      case 'Retype Password': {
        this.setState({ retypePassword: input, showInput: false }, () => {
          this.checkRequirements();
        });
        break;
      }
      default:
        break;
    }
  }


  handleInputModal = (inputLabel, placeholder, maxLength, input, keyboardType = 'default') => {
    if (inputLabel === 'Your Email Address') {
      this.onEmailLayout();
    } else if (inputLabel === 'Password') {
      this.onPasswordLayout();
    } else if (inputLabel === 'Retype Password') {
      this.onRetypeLayout();
    }

    setTimeout(() => {
      this.setState({
        showInput: {
          backgroundColor: colors.dark,
          closeModal: this.closeInputModal,
          keyboardType,
          hiddenLabel: false,
          input,
          inputLabel,
          maxLength,
          multiline: false,
          placeholder,
          visible: true,
          spellCheck: true,
          x: this[`${inputLabel}X`],
          y: this[`${inputLabel}Y`],
        }
      });
    }, 100);
  }


  handleEmailInput = (email) => {
    this.setState({ email });
  }


  handleEmailBlur = () => {
    this.handleEmailSubmit();
  }


  handleEmailSubmit = () => {
    const { email } = this.state;
    if (!email.includes('@') || !email.includes('.')) {
      this.setState({
        messageProps: {
          closeFunc: this.handleCloseMessage,
          bodyStyle: null,
          textStyle: null,
          duration: null,
          message: 'Enter valid email address.',
          timeout: null,
        },
      });
      return false;
    }
    return true;
  }


  handlePasswordSubmit = () => {
    const { password } = this.state;
    if (password.length < 8) {
      this.setState({
        messageProps: {
          closeFunc: this.handleCloseMessage,
          bodyStyle: null,
          textStyle: null,
          duration: null,
          message: 'Password must be 8 characters minimum.',
          timeout: null,
        },
      });
      return false;
    }
    return true;
  }


  handleRetypePasswordSubmit = () => {
    const { password, retypePassword } = this.state;
    if (password !== retypePassword) {
      this.setState({
        messageProps: {
          closeFunc: this.handleCloseMessage,
          bodyStyle: null,
          textStyle: null,
          duration: null,
          message: 'Passwords do not match.',
          timeout: 4000,
        },
      });
      return false;
    }
    return true;
  }


  handleCloseMessage = () => this.setState({ messageProps: null });


  render() {
    const {
      buttonActivity,
      email,
      messageProps,
      password,
      // passwordFocused,
      retypePassword,
      showInput,
      showMFAPrompt,
    } = this.state;

    const { deviceSettings } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <Message {...messageProps} />

        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, styles.italic]}>RightOn!</Text>
            <Text style={styles.title}>
              {deviceSettings.role === 'student' ?
                'Student Sign Up' :
                'Teacher Sign Up'}
            </Text>
          </View>

          {showInput &&
          <InputModal {...showInput} />}

          <View
            onLayout={this.onEmailLayout}
            ref={this.handleEmailRef}
            style={styles.inputContainer}
          >
            <Text style={styles.inputLabel}>{showInput && showInput.inputLabel === 'Your Email Address' ? '' : 'Your Email Address'}</Text>
            <Touchable
              onPress={() => this.handleInputModal('Your Email Address', 'Email address', 75, email, 'email-address')}
              style={[styles.inputButton, elevation]}
            >
              <Text style={[styles.inputButtonText, !email && styles.inputPlaceholder]}>{showInput && showInput.inputLabel === 'Your Email Address' ? '' : (email || 'Email address')}</Text>
            </Touchable>
          </View>
          
          <View
            onLayout={this.onPasswordLayout}
            ref={this.handlePasswordRef}
            style={styles.inputContainer}
          >
            <Text style={styles.inputLabel}>{showInput && showInput.inputLabel === 'Password' ? '' : 'Password'}</Text>
            <Touchable
              onPress={() => this.handleInputModal('Password', 'Password', 75, password)}
              style={[styles.inputButton, elevation]}
            >
              <Text style={[styles.inputButtonText, !password && styles.inputPlaceholder]}>{showInput && showInput.inputLabel === 'Password' ? '' : (password || 'Password')}</Text>
            </Touchable>
          </View>

          <View
            onLayout={this.onRetypeLayout}
            ref={this.handleRetypeRef}
            style={styles.inputContainer}
          >
            <Text style={styles.inputLabel}>{showInput && showInput.inputLabel === 'Password' ? '' : 'Retype Password'}</Text>
            <Touchable
              onPress={() => this.handleInputModal('Retype Password', 'Password', 75, retypePassword)}
              style={[styles.inputButton, elevation]}
            >
              <Text style={[styles.inputButtonText, !password && styles.inputPlaceholder]}>{showInput && showInput.inputLabel === 'Retype Password' ? '' : (retypePassword || 'Retype Password')}</Text>
            </Touchable>
          </View>

          {Boolean(email) && Boolean(password) && Boolean(retypePassword) &&
            <ButtonRound
              activity={buttonActivity}
              animated
              icon={'arrow-right'}
              onPress={this.handleSignUp}
            />}

        </View>
        {
          showMFAPrompt &&
          <MFAPrompt
            navigation={this.props.navigation}
            onValidate={this.handleMFAValidate}
            onCancel={this.handleMFACancel}
            onSuccess={this.handleMFASuccess}
          />
        }
      </View>
    );
  }
}


export default SignUp;
