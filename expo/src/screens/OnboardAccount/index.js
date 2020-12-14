/* eslint react/prop-types: 0 */

import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from './LogIn';
import SignUp from './SignUp';
import TabBarComponent from '../../components/TabBarComponent';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../utils/theme';

const OnboardAccount = createBottomTabNavigator({


  LogIn: {
    screen: (props) => {
      const { navigation, screenProps } = props;

      return (
        <LogIn
          navigation={navigation}
          screenProps={{
            auth: screenProps.auth,
            deviceSettings: screenProps.deviceSettings,
            handleSetAppState: screenProps.handleSetAppState,
          }}
        />
      );
    },
    navigationOptions: {
      tabBarLabel: 'Log In',
      tabBarIcon: ({ tintColor }) => <TabBarComponent icon={'sign-in'} tintColor={tintColor} label={'Log In'} />,
    },
  },


  SignUp: {
    screen: (props) => {
      const { navigation, screenProps } = props;

      return (
        <SignUp
          navigation={navigation}
          screenProps={{
            deviceSettings: screenProps.deviceSettings,
            handleSetAppState: screenProps.handleSetAppState,
          }}
        />
      );
    },
    navigationOptions: {
      tabBarLabel: 'Sign Up',
      tabBarIcon: ({ tintColor }) => <TabBarComponent icon={'sign-out'} tintColor={tintColor} label={'Sign Up'} />
    },
  },


}, {
  animationEnabled: true,
  initialRouteName: 'LogIn',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: colors.white,
    inactiveTintColor: colors.dark,
    iconStyle: {
      padding: 0,
    },
    labelStyle: {
      fontSize: moderateScale(12, 0.2),
      margin: 0,
      padding: 0,
    },
    tabStyle: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderTopWidth: 0.5,
      borderTopColor: '#ededed',
      flex: 1,
    },
    showIcon: true,
    showLabel: Platform.OS !== 'ios',
    style: {
      height: verticalScale(55),
      justifyContent: 'center',
    },
  },
});

export default OnboardAccount;
