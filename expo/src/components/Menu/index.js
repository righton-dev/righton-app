import React from 'react'
import {
  Modal,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { ScaledSheet } from 'react-native-size-matters'
import Touchable from 'react-native-platform-touchable'
import { colors, elevation, fonts } from '../../utils/theme'

export default class Menu extends React.PureComponent {
  static propTypes = {
    menuStyles: PropTypes.shape({ type: PropTypes.any }),
    handleClose: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({})),
    textStyles: PropTypes.shape({ type: PropTypes.any }),
  };

  static defaultProps = {
    menuStyles: {},
    handleClose: () => { },
    items: [],
    textStyles: {},
  };


  renderMenuItem = (item, textStyles) => (
    <Touchable
      key={item.label}
      onPress={item.onPress}
      style={[styles.button, elevation]}
    >
      <Text style={[styles.buttonLabel, textStyles]}>{item.label}</Text>
    </Touchable>
  );


  render() {
    const {
      menuStyles,
      handleClose,
      items,
      textStyles,
    } = this.props

    return (
      <Modal
        animationType={'none'}
        onRequestClose={handleClose}
        transparent
        visible
      >
        <View style={styles.container}>
          <Touchable
            activeOpacity={0.8}
            onPress={handleClose}
            style={styles.container}
          >
            <View />
          </Touchable>
          <View style={[styles.menuContainer, elevation, menuStyles]}>
            {items.map(item => this.renderMenuItem(item, textStyles))}
          </View>
        </View>
      </Modal>
    )
  }
}


const styles = ScaledSheet.create({
  container: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  button: {
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderColor: colors.darkGray,
    paddingVertical: '10@ms',
    paddingLeft: '10@ms',
    paddingRight: '25@ms',
  },
  buttonLabel: {
    color: colors.darkGray,
    fontSize: fonts.xMedium,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderBottomWidth: 0,
    borderColor: colors.darkGray,
    top: '65@vs',
    right: 0,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
  },
})
