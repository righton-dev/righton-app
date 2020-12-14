import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { colors, fonts, fontFamilies } from '../../utils/theme'
import { ScaledSheet } from 'react-native-size-matters'

RoundButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}
export default function RoundButton(props) {
    const style = { ...styles.roundButton, ...props.style }
    return (
        <TouchableOpacity
            onPress={() => { props.onPress() }}
        >
            <View style={style}>
                <Text style={[styles.buttonTitle, props.titleStyle]}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = ScaledSheet.create({
    roundButton: {
        height: 68,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 34
    },
    buttonTitle: {
        fontSize: fonts.large,
        fontFamily: fontFamilies.poppinsRegular,
        fontWeight: 'bold',
        color: colors.white
    },
})
