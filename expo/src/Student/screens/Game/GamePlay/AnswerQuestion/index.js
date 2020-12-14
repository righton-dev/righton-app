import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, Platform } from 'react-native'
import sharedStyles from '../../Components/sharedStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { fontFamilies, fonts, colors } from '../../../../../utils/theme'
import RoundTextIcon from '../../../../components/RoundTextIcon'
import { KeyboardAwareFlatList } from '@codler/react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'

const AnswerQuestion = ({ correctAnswer, answers }) => {
    const [selectedAnswer, setSelectedAnswer] = useState({})
    const [showExplainAnswer, setShowExplainAnswer] = useState(false)

    const onToggleAnswer = (answer) => {
        setSelectedAnswer(answer)
        setShowExplainAnswer(true)
    }

    const onAnswerChanged = (answer, newText) => {
        answers[answer.id].text = newText
    }
    const titleText = correctAnswer !== undefined ? "Pick the most popular trick answer for a bonus" : "Pick the correct answer to get for your team"
    return (
        <View style={[sharedStyles.cardContainer, styles.container]}>
            {
                correctAnswer !== undefined && <View style={styles.answerContainer}>
                    <Text style={sharedStyles.text}>The correct answer is</Text>
                    <Text style={styles.answerTextInput}>{correctAnswer}</Text>
                </View>
            }
            <View style={styles.explainAnswerContainer}>
                <Text
                    style={[sharedStyles.text, { textAlign: 'left', marginRight: 5 }]}
                >
                    {titleText}
                </Text>
                <LinearGradient
                    colors={['#22B851', '#7BDD61']}
                    style={styles.pointsContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.pointsText}>+25</Text>
                </LinearGradient>
            </View>
            <KeyboardAwareFlatList
                style={styles.answers}
                data={answers}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) =>
                    <RoundTextIcon
                        icon={item.id == selectedAnswer.id ? require('../../img/checkmark_checked.png') : require('../../img/gray_circle.png')}
                        height={43}
                        text={item.text}
                        borderColor={item.id == selectedAnswer.id ? '#8DCD53' : '#D9DFE5'}
                        onPress={onToggleAnswer}
                        data={item}
                        onChangeText={onAnswerChanged}
                        readonly={true}
                        showIcon={true}
                    />
                }
            />
            <View style={[
                styles.explainAnswerContainer,
                {
                    opacity: (correctAnswer !== undefined && showExplainAnswer) ? 1 : 0
                }]}
            >
                <Text style={[sharedStyles.text, { textAlign: 'left' }]}>How did you come up with the answer?</Text>
                <Image source={require('./img/explain_answer.png')} />
            </View>
        </View>
    )
}

export default AnswerQuestion

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    answerContainer: {
        marginBottom: verticalScale(20),
    },
    answerTextInput: {
        backgroundColor: '#D7EFC3',
        borderRadius: 8,
        width: moderateScale(140),
        height: verticalScale(40),
        marginTop: verticalScale(8),
        textAlign: 'center',
        fontFamily: fontFamilies.karlaRegular,
        fontSize: fonts.xMedium,
        marginBottom: verticalScale(8),
        textAlignVertical: 'center',
        color: '#384466',
    },
    textTrickAnswers: {
        marginTop: verticalScale(24)
    },
    addTrickAnswerContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: verticalScale(10),
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    addTrickAnswer: {
        backgroundColor: colors.buttonSecondary,
        height: 43,
    },
    addTrickAnswerTitle: {
        fontFamily: fontFamilies.karlaBold,
        fontWeight: 'bold',
        fontSize: fonts.xxMedium,
    },
    answers: {
        marginTop: verticalScale(15),
        alignSelf: 'stretch'
    },
    explainAnswerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 23,
        marginLeft: 23,
        alignContent: 'center'
    },
    pointsContainer: {
        height: 28,
        width: scale(58),
        borderRadius: 23,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
            },
            android: {
                elevation: 5
            }
        }),
    },
    pointsText: {
        color: '#F5F5F5',
        fontFamily: fontFamilies.montserratExtraBold,
        fontStyle: 'normal',
        fontSize: fonts.xMedium,
        textAlign: 'center',
        lineHeight: 22,
        textAlignVertical: 'center',
        flex: 1,
        color: '#f5f5f5',
        fontWeight: '800',
    }
})
