import React from 'react'
import {
  Keyboard,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import { scale, ScaledSheet } from 'react-native-size-matters'
import Touchable from 'react-native-platform-touchable'
import { colors, deviceWidth, elevation, fonts } from '../../utils/theme'

export default class ButtonWide extends React.PureComponent {
  static propTypes = {
    buttonStyles: PropTypes.shape({ type: PropTypes.any }),
    label: PropTypes.string.isRequired,
    onLongPress: PropTypes.func,
    onPress: PropTypes.func.isRequired,
    ripple: PropTypes.string,
    textStyles: PropTypes.shape({ type: PropTypes.any }),
  };

  static defaultProps = {
    buttonStyles: {},
    label: '',
    onLongPress: () => { },
    onPress: () => { },
    ripple: '',
    textStyles: {},
  };


  handlePress = () => {
    Keyboard.dismiss()
    this.props.onPress()
  }


  render() {
    const {
      buttonStyles,
      onLongPress,
      // onPress,
      label,
      ripple,
      textStyles,
    } = this.props

    return (
      <Touchable
        activeOpacity={0.8}
        background={Touchable.Ripple(ripple || colors.primary, false)}
        hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
        onLongPress={onLongPress}
        onPress={this.handlePress}
        style={[styles.button, buttonStyles, elevation]}
      >
        <Text style={[styles.label, textStyles]}>{label || 'Okay'}</Text>
      </Touchable>
    )
  }
}


const styles = ScaledSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    bottom: '15@vs',
    height: '65@vs',
    justifyContent: 'center',
    position: 'absolute',
    width: deviceWidth - scale(75),
    zIndex: 10,
  },
  label: {
    color: colors.white,
    fontSize: fonts.xMedium,
  },
})
