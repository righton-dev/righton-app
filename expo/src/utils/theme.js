/**
 * @providesModule theme
 */

import { moderateScale } from 'react-native-size-matters'

import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen')
const deviceHeight = height
const deviceWidth = width

const fonts = {
  tiny: moderateScale(10, 0.2),
  xSmall: moderateScale(12, 0.2),
  small: moderateScale(14, 0.2),
  xxMedium: moderateScale(16, 0.2),
  xMedium: moderateScale(18, 0.2),
  medium: moderateScale(20, 0.2),
  large: moderateScale(24, 0.2),
  xLarge: moderateScale(30, 0.2),
  xxLarge: moderateScale(36, 0.2),
  xxxLarge: moderateScale(72, 0.2),
}

const fontFamilies = {
  poppinsRegular: 'Poppins-Regular',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsBold: 'Poppins-Bold',
  montserratBold: 'Montserrat-Bold',
  montserratExtraBold: 'Montserrat-ExtraBold',
  montserratRegular: 'Montserrat-Regular',
  karlaBold: 'Karla-Bold',
  karlaRegular: 'Karla-Regular',
  latoBold: 'Lato-Bold',
}

const colors = {
  primary: '#384466',
  secondary: '#8cd5df',
  black: '#000',
  white: '#fff',
  grey: '#d3d3d3',
  dark: '#23282d',
  darkGray: '#4a4a4a',
  lightGray: '#e3e3e3',
  mediumGray: '#c9c9c9',
  grayIcon: '#828f9b',
  mask: 'rgba(52, 52, 52, 0.8)',
  red: '#c0001d',
  buttonPrimary: '#FC1047',
  buttonSecondary: '#159EFA',
  backgroundPurple: "#483a82"
}

const elevation = {
  elevation: 2,
  shadowOpacity: 0.5,
  shadowRadius: 2,
  shadowColor: colors.dark,
  shadowOffset: { height: 1, width: 0 },
}

export {
  colors,
  deviceHeight,
  deviceWidth,
  elevation,
  fonts,
  fontFamilies
}
