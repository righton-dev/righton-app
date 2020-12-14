import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import styles from './styles';

export default class Prompt extends Component {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    cancelText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    borderColor: PropTypes.string,
    promptStyle: PropTypes.shape({ type: PropTypes.any }),
    titleStyle: PropTypes.shape({ type: PropTypes.any }),
    buttonStyle: PropTypes.shape({ type: PropTypes.any }),
    buttonTextStyle: PropTypes.shape({ type: PropTypes.any }),
    submitButtonStyle: PropTypes.shape({ type: PropTypes.any }),
    submitButtonTextStyle: PropTypes.shape({ type: PropTypes.any }),
    cancelButtonStyle: PropTypes.shape({ type: PropTypes.any }),
    cancelButtonTextStyle: PropTypes.shape({ type: PropTypes.any }),
    inputStyle: PropTypes.shape({ type: PropTypes.any }),
    textInputProps: PropTypes.shape({ type: PropTypes.any }),
  }

  static defaultProps = {
    visible: false,
    defaultValue: '',
    cancelText: 'Cancel',
    submitText: 'OK',
    borderColor: '#ccc',
    placeholder: '',
    promptStyle: {},
    title: '',
    titleStyle: {},
    buttonStyle: {},
    buttonTextStyle: {},
    submitButtonStyle: {},
    submitButtonTextStyle: {},
    cancelButtonStyle: {},
    cancelButtonTextStyle: {},
    inputStyle: {},
    onChangeText: () => {},
    textInputProps: {},
  }

  state = {
    value: '',
    visible: false,
  };

  componentDidMount() {
    this.setDefaultValue();
  }

  componentWillReceiveProps(nextProps) {
    const { visible, defaultValue } = nextProps;
    this.setState({ visible, value: defaultValue });
  }

  onChangeText = (value) => {
    this.setState({ value });
    this.props.onChangeText(value);
  }

  onSubmitPress = () => {
    const { value } = this.state;
    this.props.onSubmit(value);
  }

  onCancelPress = () => {
    this.props.onCancel();
  }

  setDefaultValue() {
    this.setState({ value: this.props.defaultValue });
  }

  close = () => {
    this.setState({ visible: false });
  }

  renderDialog = () => {
    const {
      title,
      placeholder,
      defaultValue,
      // cancelText,
      submitText,
      borderColor,
      promptStyle,
      titleStyle,
      buttonStyle,
      buttonTextStyle,
      submitButtonStyle,
      submitButtonTextStyle,
      // cancelButtonStyle,
      // cancelButtonTextStyle,
      inputStyle
    } = this.props;
    return (
      <View style={styles.dialog} key="prompt">
        <View style={styles.dialogOverlay} />
        <View style={[styles.dialogContent, { borderColor }, promptStyle]}>
          <View style={[styles.dialogTitle, { borderColor }]}>
            <Text style={[styles.dialogTitleText, titleStyle]}>
              { title }
            </Text>
          </View>
          <View style={styles.dialogBody}>
            <TextInput
              style={[styles.dialogInput, inputStyle]}
              defaultValue={defaultValue}
              onChangeText={this.onChangeText}
              placeholder={placeholder}
              autoFocus
              underlineColorAndroid="white"
              {...this.props.textInputProps} 
            />
          </View>
          <View style={[styles.dialogFooter, { borderColor }]}>
            {/* <TouchableWithoutFeedback onPress={this.onCancelPress}>
              <View style={[styles.dialogAction, buttonStyle, cancelButtonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle, cancelButtonTextStyle]}>
                  {cancelText}
                </Text>
              </View>
            </TouchableWithoutFeedback> */}
            <TouchableWithoutFeedback onPress={this.onSubmitPress}>
              <View style={[styles.dialogAction, buttonStyle, submitButtonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle, submitButtonTextStyle]}>
                  {submitText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <Modal onRequestClose={() => this.close()} transparent visible={this.props.visible}>
        { this.renderDialog() }
      </Modal>
    );
  }
}
