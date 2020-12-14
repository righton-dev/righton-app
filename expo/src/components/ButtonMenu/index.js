import React from 'react';
import PropTypes from 'prop-types';
import { ScaledSheet } from 'react-native-size-matters';
import Eicon from 'react-native-vector-icons/Entypo';
import Touchable from 'react-native-platform-touchable';
import { colors, fonts } from '../../utils/theme';

export default function ButtonMenu({
  buttonStyles,
  iconName,
  iconStyles,
  onPress,
}) {
  return (
    <Touchable
      activeOpacity={0.8}
      hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
      onPress={onPress}
      style={[styles.button, { ...buttonStyles }]}
    >
      <Eicon name={iconName} style={[styles.icon, { ...iconStyles }]} />
    </Touchable>
  );
}

const styles = ScaledSheet.create({
  button: {
    position: 'absolute',
    right: '10@ms',
  },
  icon: {
    color: colors.primary,
    fontSize: fonts.large,
  },
});

ButtonMenu.propTypes = {
  buttonStyles: PropTypes.shape({ type: PropTypes.any }),
  iconName: PropTypes.string,
  iconStyles: PropTypes.shape({ type: PropTypes.any }),
  onPress: PropTypes.func,
};

ButtonMenu.defaultProps = {
  buttonStyles: {},
  iconName: 'dots-three-vertical',
  iconStyles: {},
  onPress: null,
};
