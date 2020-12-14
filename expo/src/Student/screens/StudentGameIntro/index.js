import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import PurpleBackground from '../../../components/PurpleBackground'
import { colors, fonts, fontFamilies } from '../../../utils/theme'
import ViewPager from '@react-native-community/viewpager'
import IntroInfo from './IntroInfo'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const StudentGameIntro = ({ route, navigation }) => {
    const { selectedTeam } = route.params

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('PregameCountDown', {
                selectedTeam,
            })
        }, 5000)
    })

    const [currentPage, setCurrentPage] = useState(0)

    const onPageSelected = (event) => {
        setCurrentPage(event.nativeEvent.position)
    }

    return (
        <SafeAreaView style={styles.container}>
            <PurpleBackground style={styles.mainContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTeam}>Team</Text>
                    <Text style={styles.headerTeamNo}>{selectedTeam}</Text>
                </View>
                <View style={styles.carouselContainer}>
                    <ViewPager
                        style={styles.carousel}
                        initialPage={currentPage}
                        orientation='horizontal'
                        onPageSelected={onPageSelected}
                    >
                        <IntroInfo key="1" image={require('../img/answer_question_team5.png')} text="Read the question..." />
                        <IntroInfo key="2" image={require('./img/TeamIntroStep2.png')} text="Think with your team..." />
                        <IntroInfo key="3" image={require('./img/TeamIntroStep3.png')} text="Understand the hints..." />
                        <IntroInfo key="4" image={require('./img/TeamIntroStep4.png')} text="Trick your class!" />
                    </ViewPager>
                    <View style={styles.pageIndicatorContainer}>
                        <Image source={currentPage == 0 ? require('../../../assets/images/PageIndicatorActive.png') : require('../../../assets/images/PageIndicatorInactive.png')} style={styles.pageIndicator} />
                        <Image source={currentPage == 1 ? require('../../../assets/images/PageIndicatorActive.png') : require('../../../assets/images/PageIndicatorInactive.png')} style={styles.pageIndicator} />
                        <Image source={currentPage == 2 ? require('../../../assets/images/PageIndicatorActive.png') : require('../../../assets/images/PageIndicatorInactive.png')} style={styles.pageIndicator} />
                        <Image source={currentPage == 3 ? require('../../../assets/images/PageIndicatorActive.png') : require('../../../assets/images/PageIndicatorInactive.png')} style={styles.pageIndicator} />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerNote}>Waiting for the teacher to start the game...</Text>
                </View>
            </PurpleBackground>
        </SafeAreaView>
    )
}

export default StudentGameIntro

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundPurple,
        flex: 1,
    },
    mainContainer: {
        zIndex: 100,
        paddingTop: 21,
        flex: 1,
        flexDirection: 'column',
    },
    header: {
    },
    headerTeam: {
        color: colors.white,
        fontFamily: fontFamilies.montserratBold,
        fontSize: fonts.large,
        textAlign: 'center',
    },
    headerTeamNo: {
        color: colors.white,
        fontFamily: fontFamilies.montserratBold,
        fontSize: fonts.xxxLarge,
        textAlign: 'center',
    },
    carouselContainer: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 37,
        marginTop: 40,
        justifyContent: 'space-between',
    },
    carousel: {
        flex: 1,
    },
    pageIndicatorContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    pageIndicator: {
        marginLeft: 5,
        marginRight: 5,
        width: 20,
        resizeMode: 'contain'
    },
    footer: {
        marginBottom: moderateScale(30)
    },
    footerNote: {
        fontFamily: fontFamilies.karlaBold,
        fontSize: fonts.small,
        color: 'white',
        textAlign: 'center',
    }
})
