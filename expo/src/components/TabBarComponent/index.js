import React from 'react';
import {
  Platform,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Aicon from 'react-native-vector-icons/FontAwesome';
import { deviceWidth } from '../../utils/theme';

export default function TabBarComponent({ icon, label, tintColor }) {
  return (
    <View style={styles.tabBarIconContainer}>
      <Aicon type={'font-awesome'} name={icon} style={styles.tabBarIcon} color={tintColor} />
      {Platform.OS === 'ios' && <Text numberOfLines={1} style={[styles.tabBarLabel, { color: tintColor }]}>{ label }</Text>}
    </View>
  );
}

TabBarComponent.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  tintColor: PropTypes.string,
};

TabBarComponent.defaultProps = {
  icon: '',
  label: '',
  tintColor: '#000',
};

const styles = ScaledSheet.create({
  tabBarIconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: deviceWidth / 5,
  },
  tabBarIcon: { fontSize: moderateScale(15, 0.2) },
  tabBarLabel: { fontSize: moderateScale(16, 0.2) },
});
