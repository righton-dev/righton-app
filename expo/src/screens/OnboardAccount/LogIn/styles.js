import { scale, ScaledSheet } from 'react-native-size-matters'
import { colors, deviceWidth, fonts } from '../../../utils/theme'

export default ScaledSheet.create({
  activityIndicator: {
    backgroundColor: colors.mask,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.dark,
  },
  formContainer: {
    alignItems: 'center',
    flex: 1,
  },
  inputButton: {
    backgroundColor: colors.white,
    borderColor: colors.dark,
    borderWidth: 1,
    height: '45@vs',
    justifyContent: 'center',
    paddingHorizontal: '15@s',
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
    marginTop: '15@vs',
  },
  inputLabel: {
    color: colors.primary,
    fontSize: fonts.small,
    fontWeight: 'bold',
    marginBottom: '5@vs',
  },
  inputPlaceholder: {
    color: colors.lightGray,
  },
  italic: {
    fontStyle: 'italic',
  },
  req: {
    color: colors.white,
    fontSize: fonts.small,
  },
  title: {
    color: colors.white,
    fontSize: fonts.large,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: '55@vs',
    marginTop: '35@vs',
  },
})
