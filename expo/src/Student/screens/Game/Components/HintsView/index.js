import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import { scale, verticalScale } from 'react-native-size-matters'
import { fontFamilies, fonts, colors } from '../../../../../utils/theme'
import Hint from './Hint'
import Button from '../../../../components/Button'

const HintsView = ({ hints, onTappedShowNextHint, isMoreHintsAvailable }) => {
    const [showNextHintEnabled, setShowNextHintEnabled] = useState(false)

    const onTappedNextHint = () => {
        setShowNextHintEnabled(false)
        onTappedShowNextHint()
    }

    const isShowHintsDisabled = !showNextHintEnabled || !isMoreHintsAvailable

    const showNextStepButton = {
        ...styles.buttonStyle, ...{
            backgroundColor: isShowHintsDisabled ? '#9BA5B4' : colors.buttonSecondary,
        }
    }
    return (
        <View>
            <FlatList
                data={hints}
                keyExtractor={item => `${item.hintNo}`}
                renderItem={({ item }) =>
                    <Hint hintNo={item.hintNo} hint={item.hint} />
                }
            />
            <View style={styles.showNextHintContainer}>
                <Button
                    title="Show Next Step"
                    buttonStyle={showNextStepButton}
                    onPress={onTappedNextHint}
                    titleStyle={styles.showNextStepTitle}
                    disabled={isShowHintsDisabled}
                />
                {
                    !showNextHintEnabled && isMoreHintsAvailable &&
                    <LoadingIndicator
                        theme={[
                            '#FF78A520',
                            '#FF78A540',
                            '#FF78A560',
                            '#FF78A580',
                            '#FF78A5A0',
                            '#FF78A5C0',
                            '#FF78A5E0',
                            '#FF78A5FF',
                        ]}
                        radius={scale(29)}
                        shouldShowCountdown={true}
                        fontSize={24}
                        textColor={'#384466'}
                        timerStartInSecond={5}
                        onTimerFinished={() => setShowNextHintEnabled(!showNextHintEnabled)}
                    />
                }
            </View>
        </View>
    )
}

export default HintsView

const styles = StyleSheet.create({
    showNextHintContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: scale(24),
        marginRight: scale(24),
        height: scale(58)
    },
    showNextStepButton: {
        height: 26,
        borderRadius: 22,
        marginRight: scale(26),
    },
    showNextStepTitle: {
        color: 'white',
        fontFamily: fontFamilies.karlaBold,
        fontWeight: 'bold',
        fontSize: fonts.xxMedium,
    },
})
