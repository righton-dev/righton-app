import { scale, ScaledSheet } from 'react-native-size-matters'
import { colors, deviceWidth, fonts } from '../../../utils/theme'

export default ScaledSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  colorGrey: {
    color: colors.grey,
  },
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  header: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    height: '150@vs',
  },
  headerIcon: {
    color: colors.white,
    fontSize: '25@ms0.2',
  },
  headerPlus: {
    bottom: '15@ms',
    position: 'absolute',
    right: '15@ms',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fonts.large,
    marginTop: '30@vs',
    textAlign: 'center',
  },
  image: {
    height: '150@vs',
    width: '150@vs',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    height: '125@vs',
    justifyContent: 'center',
    width: '125@vs',
  },
  imageLabel: {
    color: colors.white,
    fontSize: fonts.large,
    fontStyle: 'italic',
  },
  gameButton: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: '125@vs',
    marginHorizontal: '15@s',
    marginVertical: '10@vs',
    paddingRight: '5@ms',
    width: deviceWidth - scale(30),
  },
  gameColumn: {
    flexDirection: 'column',
    flex: 1,
  },
  gameCount: {
    bottom: '5@vs',
    color: colors.white,
    fontSize: fonts.xMedium,
    fontWeight: 'bold',
    position: 'absolute',
  },
  gameDescription: {
    fontWeight: 'normal',
    fontSize: fonts.small,
    paddingTop: 0,
  },
  gameOpenButton: {
    bottom: '8@vs',
    right: '40@s',
    position: 'absolute',
  },
  gameOpenText: {
    color: colors.primary,
    fontSize: fonts.xMedium,
    fontWeight: 'bold',
  },
  gameStartButton: {
    alignItems: 'center',
    bottom: '5@vs',
    backgroundColor: colors.primary,
    borderRadius: 100,
    height: '25@ms',
    justifyContent: 'center',
    right: '5@s',
    width: '25@ms',
  },
  gameStartIcon: {
    color: colors.white,
    fontSize: fonts.small,
  },
  gameTitle: {
    color: colors.dark,
    flexWrap: 'wrap',
    fontSize: fonts.xMedium,
    fontWeight: 'bold',
    padding: '10@ms',
  },
  navButton: {
    marginLeft: '20@ms',
  },
  navRow: {
    bottom: '15@ms',
    flexDirection: 'row',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  scrollview: {
    flexGrow: 1,
    marginTop: '15@vs',
    paddingBottom: '25@vs',
  },
})
