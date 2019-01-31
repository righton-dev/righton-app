import { scale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import { colors, deviceWidth, fonts } from '../../../../utils/theme';


export default ScaledSheet.create({
  bannerContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.dark,
    borderWidth: 1,
    height: '200@vs',
    justifyContent: 'center',
    width: deviceWidth - scale(30),
  },
  bannerIcon: {
    alignSelf: 'center',
    color: colors.primary,
    fontSize: fonts.large,
    marginBottom: '10@vs',
  },
  bannerImage: {
    height: '200@vs',
    width: deviceWidth - scale(30),
  },
  bannerLabel: {
    color: colors.dark,
    fontSize: fonts.medium,
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
    right: '15@s',
  },
  createLabel: {
    color: colors.primary,
    fontSize: fonts.medium,
    fontWeight: 'bold',
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
    fontSize: fonts.medium,
    position: 'absolute',
  },
  heartIconBig: {
    color: colors.primary,
    fontSize: fonts.large,
  },
  heartWrapper: {
    position: 'absolute',
    right: '95@ms',
  },
  inputButton: {
    backgroundColor: colors.white,
    borderColor: colors.dark,
    borderWidth: 1,
    minHeight: '45@vs',
    justifyContent: 'center',
    paddingHorizontal: '15@s',
    paddingVertical: '10@vs',
    minWidth: deviceWidth - scale(30),
  },
  inputButtonText: {
    color: colors.dark,
    fontSize: fonts.medium,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'column',
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
    paddingHorizontal: '15@s',
  },
  marginTop: {
    marginTop: '15@vs',
  },
  placeholder: {
    color: colors.lightGray,
  },
  questionAnswer: {
    flexWrap: 'wrap',
    fontSize: fonts.medium,
  },
  questionContainer: {
    borderColor: colors.dark,
    borderRadius: 1,
    flexDirection: 'row',
    height: '100@ms',
    marginBottom: '25@vs',
    width: deviceWidth - scale(30),
  },
  questionImage: {
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    height: '100@ms',
    justifyContent: 'center',
    width: '100@ms',
  },
  questionImageText: {
    color: colors.white,
    fontSize: fonts.small,
    fontStyle: 'italic',
  },
  questionInstructions: {
    bottom: '10@ms',
    fontSize: fonts.small,
    left: '10@ms',
    position: 'absolute',
  },
  questionQuestion: {
    color: colors.dark,
    flexWrap: 'wrap',
    fontSize: fonts.medium,
  },
  questionTextContainer: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '10@ms',
  },
  questionsContainer: {
    alignSelf: 'stretch',
    marginTop: '15@vs',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  scrollview: {
    flexGrow: 1,
    paddingBottom: '95@vs',
    paddingTop: '25@vs',
    paddingHorizontal: '15@s',
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
    fontSize: fonts.medium,
  },
  title: {
    color: colors.dark,
    fontSize: fonts.large,
    fontWeight: 'bold',
    marginLeft: '25@s',
  },
  warning: {
    color: colors.red,
    fontSize: fonts.medium,
    bottom: '5@vs',
    position: 'absolute',
    right: '5@s',
  },
});
