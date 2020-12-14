import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { fontFamilies, fonts } from '../../../utils/theme'
import { moderateScale } from 'react-native-size-matters'

const Button = ({ onPress, titleStyle, buttonStyle, title, disabled }) => {
    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
        >
            <View style={[styles.container, buttonStyle]}>
                <Text style={[styles.buttonTitle, titleStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 22,
        paddingLeft: moderateScale(15),
        paddingRight: moderateScale(15),
    },
    buttonTitle: {
        color: 'white',
        fontFamily: fontFamilies.karlaBold,
        fontSize: fonts.xMedium
    }
})
