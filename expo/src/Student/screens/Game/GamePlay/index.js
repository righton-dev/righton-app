import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'
import { fontFamilies, fonts } from '../../../../utils/theme'
import * as Progress from 'react-native-progress'
import TeamsReadinessFooter from '../../../components/TeamsReadinessFooter'
import HorizontalPageView from '../../../components/HorizontalPageView'
import Card from '../../../components/Card'
import ScrollableQuestion from '../Components/ScrollableQuestion'
import AnswerQuestion from './AnswerQuestion'
import HintsView from '../Components/HintsView'

const GamePreview = ({ route, navigation }) => {
    const { answeringOwnQuestion, availableHints } = route.params
    const [countdown, setCountdown] = useState(300)
    const [progress, setProgress] = useState(1)
    const [showTrickAnswersHint, setShowTrickAnswersHint] = useState(false)
    const [hints, setHints] = useState([availableHints[0]])

    useEffect(() => {
        if (countdown == 0) {
            return
        }
        const totalNoSecondsLeftForShowingHints = 295//240
        var refreshIntervalId = setInterval(() => {
            setCountdown(countdown - 1)
            setProgress(countdown / 300)
            setShowTrickAnswersHint(countdown <= totalNoSecondsLeftForShowingHints)
        }, 1000)
        return () => {
            clearInterval(refreshIntervalId)
        }
    })

    const showNewHint = () => {
        if (hints.length == availableHints.length) {
            return
        }
        setHints([...hints, availableHints[hints.length]])
    }

    var answers = []
    if (answeringOwnQuestion) {
        answers = [
            {
                id: 1,
                text: '8',
                isSelected: false,
            }, {
                id: 2,
                text: '360',
                isSelected: false,
            }, {
                id: 3,
                text: '540',
                isSelected: false,
            }
        ]
    } else {
        answers = [
            {
                id: 1,
                text: '1080',
                isSelected: false,
            },
            {
                id: 2,
                text: '8',
                isSelected: false,
            }, {
                id: 3,
                text: '360',
                isSelected: false,
            }, {
                id: 4,
                text: '540',
                isSelected: false,
            }
        ]
    }

    return (
        <View style={styles.mainContainer}>
            <LinearGradient
                colors={['rgba(62, 0, 172, 1)', 'rgba(98, 0, 204, 1)']}
                style={styles.headerContainer}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.headerText}>
                    {answeringOwnQuestion ? 'What’s Your Guess?' : 'Don’t Get Tricked!'}
                </Text>
                <View style={styles.timerContainer}>
                    <Progress.Bar
                        style={styles.timerProgressBar}
                        progress={progress}
                        color={'#349E15'}
                        unfilledColor={'rgba(255,255,255,0.8)'}
                        width={Dimensions.get('window').width - scale(90)}
                    />
                    <Text style={styles.timerText}>
                        {Math.floor(countdown / 60)}:{('0' + Math.floor(countdown % 60)).slice(-2)}
                    </Text>
                </View>
            </LinearGradient>
            <View style={styles.carouselContainer}>
                {
                    answeringOwnQuestion ?
                        <HorizontalPageView
                            initialPage={1}
                        >
                            <Card headerTitle="Question">
                                <ScrollableQuestion />
                            </Card>
                            <Card headerTitle="Choose One">
                                <AnswerQuestion
                                    answers={answers}
                                    correctAnswer={'1080'}
                                />
                            </Card>
                        </HorizontalPageView> :
                        <HorizontalPageView
                            initialPage={1}
                        >
                            <Card headerTitle="Question">
                                <Question />
                            </Card>
                            <Card headerTitle="Choose One">
                                <AnswerQuestion
                                    answers={answers}
                                />
                            </Card>
                            <Card headerTitle="Hints">
                                <HintsView hints={hints} onTappedShowNextHint={() => showNewHint()} isMoreHintsAvailable={hints.length < availableHints.length} />
                            </Card>
                        </HorizontalPageView>
                }

            </View>
            <TeamsReadinessFooter
                style={styles.footer}
                onTappedFirst={() => {
                    navigation.navigate('GameAnswerReview', {
                    })
                }}
                onTappedLast={() => {
                    navigation.navigate('GameAnswerReview', {
                    })
                }}
            />
        </View>
    )
}

export default GamePreview

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(247,249,250,1)'
    },
    headerContainer: {
        height: verticalScale(225),
        shadowColor: 'rgba(0, 141, 239, 0.3)',
    },
    headerText: {
        marginTop: scale(24),
        marginLeft: scale(30),
        fontFamily: fontFamilies.montserratBold,
        fontSize: fonts.large,
        fontWeight: 'bold',
        color: 'white'
    },
    timerContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: scale(15),
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: scale(30),
        marginRight: scale(21),
    },
    timerProgressBar: {
        marginRight: 9,
        marginTop: 5,
    },
    timerText: {
        color: 'white',
        opacity: 0.8,
        fontSize: fonts.xSmall,
        fontFamily: fontFamilies.latoBold,
        fontWeight: 'bold',
    },
    carouselContainer: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 10,
        marginTop: -scale(75),
    },
    footer: {
        marginBottom: moderateScale(30)
    }
})
