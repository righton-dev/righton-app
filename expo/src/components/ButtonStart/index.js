import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { ScaledSheet } from 'react-native-size-matters';
import Aicon from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';
import { colors, elevation } from '../../utils/theme';

export default function ButtonStart({
  buttonStyles = {},
  iconStyles = {},
  iconLabel = 'Play',
  icon = 'play',
  onPress = () => {},
}) {
  return (
    <Touchable
      activeOpacity={0.8}
      background={Touchable.Ripple(colors.primary, false)}
      hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
      onPress={onPress}
      style={styles.buttonWrapper}
    >
      <View style={[styles.button, buttonStyles, elevation]}>
        <Aicon name={icon} style={[styles.icon, iconStyles]} />
        <Text style={[styles.icon, iconStyles]}>{iconLabel}</Text>
      </View>
    </Touchable>
  );
}


ButtonStart.propTypes = {
  buttonStyles: PropTypes.shape({}),
  icon: PropTypes.string,
  iconLabel: PropTypes.string,
  iconStyles: PropTypes.shape({}),
  onPress: PropTypes.func.isRequired,
};

ButtonStart.defaultProps = {
  buttonStyles: {},
  icon: 'play',
  iconLabel: 'Start',
  iconStyles: {},
  onPress: () => {},
};


const styles = ScaledSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: '5@ms',
    paddingRight: '15@ms',

  },
  buttonWrapper: {
    backgroundColor: colors.primary,
    borderColor: colors.white,
    borderRadius: 100,
    borderWidth: 1,
    bottom: '15@vs',
    height: '45@ms',
    position: 'absolute',
    right: '15@s',
    width: '100@ms',
    zIndex: 100,
  },
  icon: {
    color: colors.white,
    fontSize: '20@ms0.2',
  },
});
