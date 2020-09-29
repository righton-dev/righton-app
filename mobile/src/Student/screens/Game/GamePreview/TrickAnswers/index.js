import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import sharedStyles from '../../Components/sharedStyles'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { fontFamilies, fonts, colors } from '../../../../../utils/theme'
import RoundTextIcon from '../../../../components/RoundTextIcon'
import { KeyboardAwareFlatList } from '@codler/react-native-keyboard-aware-scroll-view'
import uuid from 'react-native-uuid'

const TrickAnswers = ({ onAnsweredCorrectly }) => {
    const Status = {
        none: 'none',
        hasAnsweredCorrectly: 'answered',
        hasAnsweredIncorrectly: 'incorrectAnswer',
    }
    const [estimatedAnswer, setEstimatedAnswer] = useState('')
    const [showTrickAnswers, setShowTrickAnswers] = useState(false)
    const [trickAnswers, setTrickAnswers] = useState([])
    const [status, setStatus] = useState(Status.none)
    const [answer, setAnswer] = useState(undefined)

    const createAnswer = (text) => {
        return {
            id: uuid.v4(),
            text: text,
            isSelected: false
        }
    }

    const onAnswerSubmitted = (event) => {
        const text = event.nativeEvent.text
        const newAnswer = createAnswer(text)
        if (newAnswer.text == '1080') {
            setAnswer(newAnswer)
            setStatus(Status.hasAnsweredCorrectly)
            if (onAnsweredCorrectly !== undefined) {
                onAnsweredCorrectly()
            }
            setTrickAnswers([...trickAnswers, createAnswer('')])
            startTrickAnswersTimer()
            return
        }

        setEstimatedAnswer('')
        setTrickAnswers([...trickAnswers, newAnswer])

        if (status == Status.none) {
            setStatus(Status.hasAnsweredIncorrectly)
            startTrickAnswersTimer()
        }
    }

    const toggleAnswer = (answerId) => {
        if (status != Status.hasAnsweredCorrectly) {
            return
        }

        const answers = trickAnswers.filter(answer => answer.isSelected)
        const newAnswerIndex = trickAnswers.findIndex(answer => answer.id == answerId)
        if (trickAnswers[newAnswerIndex].isSelected) {
            trickAnswers[newAnswerIndex].isSelected = false
        } else if (answers.length < 3 && trickAnswers[newAnswerIndex].text !== '') {
            trickAnswers[newAnswerIndex].isSelected = !trickAnswers[newAnswerIndex].isSelected
        }

        setTrickAnswers(trickAnswers)
    }

    const onTrickyAnswerChanged = (answerId, newText) => {
        if (status != Status.hasAnsweredCorrectly) {
            return
        }
        const index = trickAnswers.findIndex(answer => answer.id == answerId)
        trickAnswers[index].text = newText
        if (index == trickAnswers.length - 1) {
            setTrickAnswers([...trickAnswers, createAnswer('')])
        } else {
            setTrickAnswers(trickAnswers)
        }
    }

    const startTrickAnswersTimer = () => {
        setTimeout(() => {
            setShowTrickAnswers(true)
        }, 500)
    }

    const onAddTrickAnswer = () => {
        setTrickAnswers([...trickAnswers, createAnswer('')])
    }

    const lastAnswer = () => {
        const trickAnswersCount = trickAnswers.length - 1
        return trickAnswersCount == 0 ? { text: '', id: 0 } : trickAnswers[trickAnswersCount - 1]
    }

    return (
        <View style={[sharedStyles.cardContainer, styles.container]}>
            <Text
                style={[sharedStyles.text, { opacity: status == Status.none ? 1 : 0.3 }]}>
                Help guide your team to guess the correct answer!
            </Text>
            <TextInput
                style={
                    [
                        styles.answerTextInput,
                        {
                            backgroundColor: status == Status.hasAnsweredCorrectly ? '#D7EFC3' : 'white',
                        }
                    ]
                }
                value={estimatedAnswer}
                onChangeText={text => setEstimatedAnswer(text)}
                onSubmitEditing={onAnswerSubmitted}
                editable={status != Status.hasAnsweredCorrectly}
            />
            <View style={{ opacity: status == Status.none ? 0 : 1, flex: 1, alignSelf: 'stretch' }}>
                {
                    status == Status.hasAnsweredCorrectly &&
                    <Text style={
                        [
                            sharedStyles.text,
                            {
                                opacity: showTrickAnswers > 0 ? 0.3 : 1
                            }
                        ]
                    }>
                        {
                            'Nice job, that’s right!'
                        }
                    </Text>
                }
                {
                    status == Status.hasAnsweredIncorrectly &&
                    <Text style={sharedStyles.text}>
                        {
                            'Pick your team’s favorite 3 to trick your class.'
                        }
                    </Text>
                }
                {
                    status == Status.hasAnsweredCorrectly &&
                    <Text style={[sharedStyles.text, { marginTop: 10 }]}>
                        Now come up with other answers that might trick your class!
                    </Text>
                }
                <KeyboardAwareFlatList
                    style={[styles.answers, { opacity: showTrickAnswers ? 1 : 0 }]}
                    data={trickAnswers}
                    extraData={trickAnswers}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) =>
                        <RoundTextIcon
                            icon={item.isSelected ? require('../../img/checkmark_checked.png') : require('../../img/gray_circle.png')}
                            text={item.text}
                            height={43}
                            borderColor={item.isSelected ? '#8DCD53' : '#D9DFE5'}
                            onIconPress={toggleAnswer}
                            data={item.id}
                            onTextChanged={onTrickyAnswerChanged}
                        />
                    }
                />
            </View>
        </View>
    )
}

export default TrickAnswers

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    answerTextInput: {
        borderRadius: 8,
        marginTop: verticalScale(8),
        textAlign: 'center',
        fontFamily: fontFamilies.karlaRegular,
        fontSize: fonts.xMedium,
        marginBottom: verticalScale(8),
        borderColor: '#B1BACB',
        borderWidth: 1,
        alignSelf: 'stretch',
    },
    trickAnswerInput: {
        borderWidth: 2,
        borderRadius: 22,
        marginBottom: 10,
        paddingLeft: 20,
        height: 43,
    },
    answers: {
        marginTop: verticalScale(15),
        alignSelf: 'stretch'
    }
})
