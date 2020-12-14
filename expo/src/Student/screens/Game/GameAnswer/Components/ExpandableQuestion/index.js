import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, Animated } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import Question from '../../../Components/Question'

const ExpandableQuestion = () => {
    const [expanded, setExpanded] = useState(false)

    const updateExpandState = (newValue) => {
        setExpanded(newValue)
    }
    return (
        <View style={styles.mainContainer}>
            <View
                style={[
                    expanded ? { flex: 1 } : { height: verticalScale(207) },
                    styles.questionContainer
                ]}
            >
                <Question />
            </View>
            <Pressable
                onPress={() => setExpanded(!expanded)}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? '#e4e4e4'
                            : '#F4F4F4'
                    }, styles.footer]}
            >
                <Image
                    source={expanded ? require('./img/minus.png') : require('./img/plus.png')}
                    style={styles.expandIcon}
                    resizeMode='cover'
                    resizeMethod='resize'
                />
                <Text style={[
                    styles.showMoreText,
                    { marginRight: expanded ? 8 : 0 }
                ]}>
                    {expanded ? 'SHOW LESS' : 'SHOW MORE'}
                </Text>
            </Pressable>
        </View>
    )
}

export default ExpandableQuestion

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    questionContainer: {

    },
    expandIcon: {
        width: 12,
        height: 12,
        marginRight: 5,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    showMoreText: {
        color: '#1C55FD',
    }
})
