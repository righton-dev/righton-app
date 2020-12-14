import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import PurpleBackground from '../../../components/PurpleBackground'
import LoadingIndicator from '../../components/LoadingIndicator'
import { scale } from 'react-native-size-matters'
import { fontFamilies, fonts } from '../../../utils/theme'

const PregameCountDown = ({ navigation, route }) => {
    const { selectedTeam } = route.params
    return (
        <PurpleBackground style={styles.mainContainer}>
            <LoadingIndicator
                theme={[
                    '#F5246A20',
                    '#F5246A40',
                    '#F5246A60',
                    '#F5246A80',
                    '#F5246AA0',
                    '#F5246AC0',
                    '#F5246AE0',
                    '#F5246AFF',
                ]}
                radius={Dimensions.get('window').width / 2 - scale(30) * 2}
                shouldShowCountdown={true}
                fontSize={scale(100)}
                timerStartInSecond={5}
                onTimerFinished={() => navigation.navigate('GamePreview', {
                    selectedTeam, isFacilitator: selectedTeam == 1
                })}
            />
            <Text style={styles.text}>
                Your team's question will appear soon.
            </Text>
        </PurpleBackground>
    )
}

export default PregameCountDown

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: scale(30),
        paddingRight: scale(30),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "white",
        fontFamily: fontFamilies.montserratBold,
        fontSize: fonts.medium,
        fontWeight: 'bold',
        marginLeft: 34,
        marginRight: 34,
        textAlign: 'center'
    }
})
