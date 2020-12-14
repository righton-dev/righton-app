import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import sharedStyles from '../sharedStyles'
import { verticalScale } from 'react-native-size-matters'

const Question = () => {
    return (
        <View style={[sharedStyles.cardContainer, { alignItems: 'center' }]}>
            <Image
                source={require('../../img/Stop.png')}
                resizeMethod='resize'
                style={styles.image} />
            <Text style={[sharedStyles.text, styles.text]}>
                In many countries, a stop sign is represented as a red eight-sided shape with the word “STOP” in the middle.{"\n\n"}This eight-sided shape is known as an octagon.{"\n\n"}How many degrees are in the interior angles of a stop sign?
            </Text>
        </View>
    )
}

export default Question

const styles = StyleSheet.create({
    image: {
        marginBottom: verticalScale(15),
    },
    text: {
        marginBottom: verticalScale(15)
    }
})
