import React, { Fragment, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, Image } from 'react-native'
import { fontFamilies, fonts } from '../../../../../utils/theme'
import { verticalScale } from 'react-native-size-matters'

const TeamInfo = ({ navigation, route }) => {
    const { answeringOwnQuestion, availableHints, team } = route.params


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('GamePlay', {
                availableHints,
                answeringOwnQuestion
            })
        }, 3000)
    })
    const img = team == 1 ?
        require('./img/answer_question_team1.png') :
        require('../../../img/answer_question_team5.png')
    return (
        <Fragment>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.container}>
                <Text style={styles.titleText}>Team</Text>
                <Text style={styles.titleTeamText}>{team}</Text>
                <Text style={styles.bodyText}>Your team’s question is up next!</Text>
                <Image
                    style={styles.teamImage}
                    source={img}
                />
                <Text style={styles.bodyText}>Pick the answer you think will be most popular!</Text>
            </SafeAreaView>
        </Fragment>
    )
}

export default TeamInfo

const styles = StyleSheet.create({
    topSafeArea: {
        backgroundColor: 'rgba(54, 60, 100, 1.0)',
        flex: 0,
    },
    container: {
        backgroundColor: 'rgba(54, 60, 100, 1.0)',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: verticalScale(20),
    },
    titleText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: fontFamilies.montserratBold,
        fontSize: fonts.large,
    },
    titleTeamText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: fontFamilies.montserratBold,
        fontSize: fonts.xxxLarge,
    },
    bodyText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: fontFamilies.montserratBold,
        fontSize: fonts.xMedium,
        marginBottom: verticalScale(40),
    },
    teamImage: {
        alignSelf: 'center',
        marginBottom: verticalScale(30),
    }
})
