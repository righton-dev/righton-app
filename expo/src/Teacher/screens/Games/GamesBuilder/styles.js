import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters'
import { colors, deviceWidth, fonts } from '../../../../utils/theme'


export default ScaledSheet.create({
  alignStart: {
    alignItems: 'flex-start',
  },
  bannerAddContainer: {
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    borderColor: colors.dark,
    borderWidth: 1,
    height: '45@vs',
    justifyContent: 'center',
    paddingHorizontal: '15@ms',
    width: deviceWidth - scale(30),
  },
  bannerIcon: {
    color: colors.primary,
    fontSize: fonts.large,
    marginRight: '15@ms',
  },
  bannerImage: {
    height: '200@vs',
    width: deviceWidth - scale(30),
  },
  bannerImageContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  bannerLabel: {
    color: colors.dark,
    fontSize: fonts.xMedium,
  },
  caret: {
    fontSize: '18@ms0.2',
  },
  closeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: colors.white,
    fontSize: '25@ms0.2',
    position: 'absolute',
  },
  closeIconShadow: {
    color: colors.primary,
    fontSize: '33@ms0.2',
  },
  colorPrimary: {
    color: colors.primary,
  },
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  createContainer: {
    position: 'absolute',
    right: '100@ms',
  },
  createLabel: {
    color: colors.primary,
    fontSize: fonts.xMedium,
    fontWeight: 'bold',
  },
  donePosition: {
    right: '15@ms',
  },
  headerContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    elevation: 2,
    flexDirection: 'row',
    height: '65@vs',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderColor: colors.dark,
    paddingLeft: '20@s',
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    color: colors.white,
    fontSize: fonts.xMedium,
    position: 'absolute',
  },
  heartIconBig: {
    color: colors.primary,
    fontSize: fonts.large,
  },
  heartWrapper: {
    position: 'absolute',
    right: '60@ms',
  },
  inactive: {
    backgroundColor: colors.lightGray,
  },
  inputButton: {
    backgroundColor: colors.white,
    borderColor: colors.dark,
    borderWidth: 1,
    minHeight: '45@vs',
    justifyContent: 'center',
    paddingHorizontal: '15@ms',
    paddingVertical: '10@ms',
    width: deviceWidth - scale(30),
  },
  inputButtonText: {
    color: colors.dark,
    fontSize: fonts.xMedium,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '15@vs',
  },
  inputLabel: {
    color: colors.dark,
    fontSize: fonts.small,
    fontWeight: 'bold',
    marginBottom: '5@vs',
  },
  inputPadding: {
    paddingHorizontal: '15@ms',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  marginTop: {
    marginTop: '15@vs',
  },
  placeholder: {
    color: colors.lightGray,
  },
  questionAnswer: {
    flexWrap: 'wrap',
    fontSize: fonts.xMedium,
  },
  questionContainer: {
    backgroundColor: colors.white,
    borderColor: colors.dark,
    borderRadius: 1,
    flexDirection: 'column',
    marginBottom: '25@vs',
    width: deviceWidth - scale(30),
  },
  questionImage: {
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    height: '100@ms',
    justifyContent: 'center',
    width: deviceWidth - scale(30),
  },
  questionImageText: {
    color: colors.white,
    fontSize: fonts.small,
    fontStyle: 'italic',
  },
  questionInstructions: {
    fontSize: fonts.small,
    marginTop: '15@ms',
  },
  questionQuestion: {
    color: colors.dark,
    flexWrap: 'wrap',
    fontSize: fonts.xMedium,
  },
  questionTextContainer: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: '10@ms',
    paddingVertical: '15@ms',
  },
  questionsContainer: {
    alignSelf: 'stretch',
    marginTop: '15@vs',
  },
  right: {
    right: '15@ms'
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollview: {
    flexGrow: 1,
    paddingTop: '25@vs',
    paddingHorizontal: '15@ms',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  timeSelectionContainer: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
    bottom: verticalScale(-30),
    height: '60@ms',
    justifyContent: 'center',
    position: 'absolute',
    right: scale(-10),
    width: '60@ms',
    zIndex: 2,
  },
  timeSelectionLabel: {
    color: colors.white,
    fontSize: fonts.xMedium,
  },
  title: {
    color: colors.dark,
    fontSize: fonts.large,
    fontWeight: 'bold',
    marginLeft: '25@s',
  },
  warning: {
    color: colors.red,
    fontSize: fonts.xMedium,
    bottom: '5@vs',
    position: 'absolute',
    right: '5@s',
  },
})
