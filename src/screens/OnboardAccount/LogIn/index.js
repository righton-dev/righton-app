import React from 'react';
import {
  findNodeHandle,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import NativeMethodsMixin from 'NativeMethodsMixin';
import Touchable from 'react-native-platform-touchable';
import InputModal from '../../../components/InputModal';
import Message from '../../../components/Message';
import ButtonRound from '../../../components/ButtonRound';
import { elevation, fonts, colors } from '../../../utils/theme';
import styles from './styles';
import debug from '../../../utils/debug';
import { getItemFromTeacherAccountFromDynamoDB } from '../../../../lib/Categories/DynamoDB/TeacherAccountsAPI';
import { getStudentAccountFromDynamoDB } from '../../../../lib/Categories/DynamoDB/StudentAccountsAPI';
import LocalStorage from '../../../../lib/Categories/LocalStorage';


class LogIn extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
    screenProps: PropTypes.shape({
      auth: PropTypes.shape({
        signIn: PropTypes.func,
      }),
      deviceSettings: PropTypes.shape({
        role: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    navigation: {
      navigate: () => {},
    },
    screenProps: {      
      auth: {
        signIn: () => {},
      },
      deviceSettings: {
        role: '',
      },
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      buttonActivity: false,
      cognitoUser: '',
      email: '',
      messageProps: null,
      password: '',
      showInput: false,
    };

    this.baseState = this.state;

    
    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    
    this.emailRef = undefined;
    this.passwordRef = undefined;
    this.handleEmailRef = this.handleEmailRef.bind(this);
    this.onEmailLayout = this.onEmailLayout.bind(this);
    this.handlePasswordRef = this.handlePasswordRef.bind(this);
    this.onPasswordLayout = this.onPasswordLayout.bind(this);

    this.closeInputModal = this.closeInputModal.bind(this);
    this.handleInputModal = this.handleInputModal.bind(this);

    this.doLogin = this.doLogin.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
    this.handleLogInClick = this.handleLogInClick.bind(this);
  }


  async onLogIn() {
    this.setState(this.baseState, () => {
      if (this.props.screenProps.deviceSettings.role === 'student') {
        this.props.navigation.navigate('StudentApp');        
      } else {
        this.props.navigation.navigate('TeacherApp');
      }
    });
  }


  onEmailLayout() {
    if (this.emailRef) {
      NativeMethodsMixin.measureInWindow.call(
        findNodeHandle(this.emailRef),
        (x, y) => {
          this['Your email addressX'] = x;
          this['Your email addressY'] = y + 9 + fonts.small;
        }
      );
    }
  }


  onPasswordLayout() {
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


  handlePasswordRef(ref) {
    this.passwordRef = ref;
  }


  handleEmailRef(ref) {
    this.emailRef = ref;
  }


  async doLogin() {
    const allReqsPass = this.checkRequirements();
    if (!allReqsPass) {
      this.setState({ buttonActivity: false });
      return;
    }

    const { auth, deviceSettings } = this.props.screenProps;
    const { email, password } = this.state;
    let errorMessage = 'Successfully logged in.';
    let session = null;

    const username = email.toLowerCase();

    try {
      session = await auth.signIn(username, password)
        .then((data) => {
          debug.log('We get the Cognito User', JSON.stringify(data));
          this.setState({ cognitoUser: data });
          if (deviceSettings.role === 'student') {
            this.handleSignIn(data, 'student');     
          } else {
            this.handleSignIn(data, 'teacher');
          }
          return true;
        });
    } catch (exception) {
      debug.warn('Error caught in Account LogIn:', JSON.stringify(exception));

      errorMessage = exception.invalidCredentialsMessage || exception.message || exception;

      if (exception === 'Username cannot be empty') {
        errorMessage = 'Email must be provided.';
      } else if (exception.code === 'UserNotConfirmedException') {
        errorMessage = 'Email unconfirmed. Please sign up again.';
      } else if (exception.code === 'UserNotFoundException') {
        errorMessage = 'Email not found. Please sign up again.';
      }
    }
    this.setState({
      buttonActivity: false,
      session,
      messageProps: {
        closeFunc: this.handleCloseMessage,
        bodyStyle: null,
        textStyle: null,
        duration: null,
        message: errorMessage,
        timeout: 4000,
      },
    }, () => {
      if (session) {
        this.onLogIn();
      }
    });
  }


  handleSignIn(session, role) {
    const { deviceSettings, handleSetAppState } = this.props.screenProps;
    handleSetAppState('session', session);
    if (session && (session.username || (session.idToken && session.idToken.payload))) {
      const username = session.username || session.idToken.payload['cognito:username'];
      if (role === 'teacher' && username !== deviceSettings.username) {
        // Hydrate LocalStorage w/ new user's DynamoDB
        this.hydrateNewTeacherData(username);
      } else if (role === 'student' && username !== deviceSettings.username) {
        this.hydrateNewStudentData(username);
      }
    }
  }


  hydrateNewStudentData(StudentID) {
    const { handleSetAppState } = this.props.screenProps;
    getStudentAccountFromDynamoDB(
      StudentID,
      (res) => {
        handleSetAppState('account', res);
        const accountJSON = JSON.stringify(res);
        LocalStorage.setItem(`@RightOn:${StudentID}`, accountJSON);
        this.resetDeviceSettings('student', StudentID);
        debug.log('Result from GETTING student account from DynamoDB:', JSON.stringify(res));
      },
      exception => debug.warn('Error GETTING student account from DynamoDB:', JSON.stringify(exception)),
    );
  }


  hydrateNewTeacherData(TeacherID) {
    const { handleSetAppState } = this.props.screenProps;
    getItemFromTeacherAccountFromDynamoDB(
      TeacherID,
      '',
      (res) => {
        handleSetAppState('account', { games: [], history: [], ...res });
        const accountJSON = JSON.stringify(res);
        LocalStorage.setItem(`@RightOn:${TeacherID}`, accountJSON);
        this.resetDeviceSettings('teacher', TeacherID);
        debug.log('Result from GETTING teacher account from DynamoDB:', JSON.stringify(res));
      },
      exception => debug.warn('Error GETTING teacher account from DynamoDB:', JSON.stringify(exception)),
    );
  }


  resetDeviceSettings(accountType, username) {
    const { deviceSettings, handleSetAppState } = this.props.screenProps;
    const updatedDeviceSettings = {};
    updatedDeviceSettings.username = username;
    updatedDeviceSettings.role = accountType;
    if (accountType === 'teacher') {
      updatedDeviceSettings.quizTime = deviceSettings.quizTime || '1:00';
      updatedDeviceSettings.trickTime = deviceSettings.trickTime || '3:00';
    }
    handleSetAppState('deviceSettings', updatedDeviceSettings);
  }


  checkRequirements() {
    const { email, password } = this.state;

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
    if (password.length < 8) {
      this.setState({
        messageProps: {
          closeFunc: this.handleCloseMessage,
          bodyStyle: null,
          textStyle: null,
          duration: null,
          message: 'Password must have a minimum of 8 characters.',
          timeout: null,
        },
      });
      return false;
    }

    return true;
  }


  closeInputModal(input, inputLabel) {
    switch (inputLabel) {
      case 'Your email address':
        this.setState({ email: input, showInput: false });
        if (!this.state.password && input) {
          this.handleInputModal('Password', 'Password', 75, '');
        }
        break;
      case 'Password':
        this.setState({ password: input, showInput: false }, () => {
          this.checkRequirements();
        });
        break;
      default:
        break;
    }
  }


  handleInputModal(inputLabel, placeholder, maxLength, input, keyboardType = 'default') {
    if (inputLabel === 'Your email address') {
      this.onEmailLayout();
    } else if (inputLabel === 'Password') {
      this.onPasswordLayout();
    }
    setTimeout(() => {
      this.setState({
        showInput: {
          backgroundColor: colors.dark,
          closeModal: this.closeInputModal,
          keyboardType,
          height: 45,
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


  handleLogInClick() {
    this.setState({ buttonActivity: true });

    setTimeout(this.doLogin, 0);
  }


  handleCloseMessage() {
    this.setState({ messageProps: null });
  }


  render() {
    const {
      buttonActivity,
      email,
      messageProps,
      password,
      showInput,
    } = this.state;

    const { deviceSettings } = this.props.screenProps;

    return (
      <View style={styles.container}>

        {showInput &&
          <InputModal {...showInput} />}

        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, styles.italic]}>RightOn!</Text>
            <Text style={styles.title}>
              {deviceSettings.role === 'student' ?
                'Student Account' :
                'Teacher Account'}
            </Text>
          </View>

          <View
            onLayout={this.onEmailLayout}
            ref={this.handleEmailRef}
            style={styles.inputContainer}
          >
            <Text style={styles.inputLabel}>Your email address</Text>
            <Touchable
              onPress={() => this.handleInputModal('Your email address', 'Email address', 75, email, 'email-address')}
              style={[styles.inputButton, elevation]}
            >
              <Text style={[styles.inputButtonText, !email && styles.inputPlaceholder]}>{showInput && showInput.inputLabel === 'Your email address' ? '' : (email || 'Email address')}</Text>
            </Touchable>
          </View>

          <View
            onLayout={this.onPasswordLayout}
            ref={this.handlePasswordRef}
            style={styles.inputContainer}
          >
            <Text style={styles.inputLabel}>Password</Text>
            <Touchable
              onPress={() => this.handleInputModal('Password', 'Password', 75, password)}
              style={[styles.inputButton, elevation]}
            >
              <Text style={[styles.inputButtonText, !password && styles.inputPlaceholder]}>{showInput && showInput.inputLabel === 'Password' ? '' : (password || 'Password')}</Text>
            </Touchable>
          </View>

          {
            Boolean(email) && Boolean(password) && !showInput &&
            <ButtonRound
              activity={buttonActivity}
              animated
              icon={'arrow-right'}
              onPress={this.handleLogInClick}
            />
          }
        </View>

        { messageProps && <Message {...messageProps} /> }

      </View>
    );
  }
}


export default LogIn;
