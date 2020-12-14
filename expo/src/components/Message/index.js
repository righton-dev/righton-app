import React from 'react';
import {
  Animated,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { ScaledSheet } from 'react-native-size-matters';
import Touchable from 'react-native-platform-touchable';
import { colors, fonts } from '../../utils/theme';

export default class Message extends React.Component {
  constructor() { 
    super();
    this.opacity = new Animated.Value(0);
    this.timeout = undefined;
  }


  componentDidMount() {
    if (this.props.message) {
      this.handleAnimation(this.props.duration, this.props.timeout);
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.handleAnimation(nextProps.duration, nextProps.timeout);
    }
  }


  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  
  processMessage(message) {
    const { textStyle } = this.props;
    if (message.includes('*')) {
      const firstIndex = message.indexOf('*');
      const lastIndex = message.lastIndexOf('*');
      if (firstIndex === lastIndex) {
        return <Text style={[styles.message, textStyle]}>{ message }</Text>;
      }
      return (
        <Text style={[styles.message, textStyle]}>
          { message.substring(0, firstIndex) }
          <Text style={styles.bold}>{ message.substring(firstIndex + 1, lastIndex) }</Text>
          { message.substring(lastIndex + 1) }
        </Text>
      );
    }
    return <Text style={[styles.message, textStyle]}>{ message }</Text>;
  }


  handleAnimation(duration, timeout) {
    Animated.timing(
      this.opacity, {
        duration: duration || 1500,
        toValue: 1,
        useNativeDriver: true,
      }
    ).start();
    this.timeout = setTimeout(() => {
      this.handleTouchClose();
    }, timeout || 5500);
  }


  handleTouchClose = () => {
    const { closeFunc } = this.props;
    Animated.timing(
      this.opacity, {
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
      }
    ).start(() => {
      closeFunc();
    });
  }


  render() {
    const {
      // closeFunc,
      bodyStyle,
      // textStyle,
      // duration,
      message,
      // timeout,
    } = this.props;

    return (
      <Animated.View style={[{ opacity: this.opacity }, styles.container, bodyStyle]}>
        <Touchable
          activeOpacity={0.8}
          background={Touchable.Ripple(colors.dark, false)}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          onPress={this.handleTouchClose}
        >
          { this.processMessage(message) }
        </Touchable>
      </Animated.View>
    );
  }
}

Message.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  bodyStyle: PropTypes.shape({ type: PropTypes.any }),
  textStyle: PropTypes.shape({ type: PropTypes.any }),
  duration: PropTypes.number,
  message: PropTypes.string.isRequired,
  timeout: PropTypes.number,
};

Message.defaultProps = {
  closeFunc: () => {},
  bodyStyle: {},
  textStyle: {},
  duration: 0,
  message: '',
  timeout: 0,
};

const styles = ScaledSheet.create({
  bold: {
    fontWeight: '500',
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 100,
    bottom: '40@vs',
    justifyContent: 'center',
    marginHorizontal: '15@s',
    paddingHorizontal: '15@s',
    paddingVertical: '10@vs',
    position: 'absolute',
    zIndex: 100,
  },
  message: {
    color: colors.white,
    fontSize: fonts.small,
    textAlign: 'center',
  },
});
