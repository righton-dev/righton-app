import { StyleSheet } from 'react-native'
import { fontFamilies, fonts } from '../../../../utils/theme'
import { scale, verticalScale } from 'react-native-size-matters'

export default StyleSheet.create({
    text: {
        textAlign: 'center',
        fontFamily: fontFamilies.karlaBold,
        fontWeight: 'bold',
        fontSize: fonts.small,
        color: '#384466'
    },
    cardContainer: {
        padding: scale(24),
    }
})