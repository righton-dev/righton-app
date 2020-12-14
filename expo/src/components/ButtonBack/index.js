import React from 'react';
import {
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { ScaledSheet } from 'react-native-size-matters';
import Aicon from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';
import { colors } from '../../utils/theme';

export default class ButtonBack extends React.PureComponent {
  static propTypes = {
    buttonStyles: PropTypes.shape({ type: PropTypes.any }),
    iconName: PropTypes.string,
    iconStyles: PropTypes.shape({ type: PropTypes.any }),
    navigator: PropTypes.shape({
      goBack: PropTypes.func,
    }),
    onPress: PropTypes.func,
  }
  
  static defaultProps = {
    buttonStyles: {},
    iconName: 'arrow-left',
    iconStyles: {},
    navigator: {},
    onPress: null,
  }


  handlePress = () => {
    Keyboard.dismiss();
    if (this.props.onPress) {
      this.props.onPress();
    } else {
      this.props.navigation.goBack();
    }
  }


  render() {
    const {
      buttonStyles,
      iconName,
      iconStyles,
      // navigator,
      // onPress,
    } = this.props;

    return (
      <Touchable
        activeOpacity={0.8}
        hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
        onPress={this.handlePress}
        style={[styles.button, { ...buttonStyles }]}
      >
        <Aicon name={iconName} style={[styles.icon, { ...iconStyles }]} />
      </Touchable>
    );
  }
}


const styles = ScaledSheet.create({
  button: {
    position: 'absolute',
    left: '15@s',
    top: '25@vs',
    zIndex: 10,
  },
  icon: {
    color: colors.white,
    fontSize: '20@ms0.2',
  },
});
