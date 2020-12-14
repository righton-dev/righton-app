import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LoadingIndicator from '../../../../components/LoadingIndicator'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'
import { fontFamilies, fonts } from '../../../../../utils/theme'
import sharedStyles from '../../Components/sharedStyles'

const Spinner = ({ text }) => {
    return (
        <View style={[styles.container, sharedStyles.cardContainer]}>
            <LoadingIndicator
                theme={[
                    '#66CB1320',
                    '#66CA0340',
                    '#66C90360',
                    '#66C70380',
                    '#66C703A0',
                    '#66C703C0',
                    '#66C703E0',
                    '#66C703FF',
                ]}
                radius={scale(80)}
                shouldShowCountdown={false}
            />
            <Text style={[sharedStyles.text, styles.text]}>
                {text}
            </Text>
        </View>
    )
}

export default Spinner

const styles = StyleSheet.create({
    container: {
        marginTop: verticalScale(42)
    },
    text: {
        marginTop: verticalScale(25)
    }
})
