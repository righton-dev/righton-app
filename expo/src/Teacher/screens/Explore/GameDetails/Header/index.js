import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { fontFamilies, fonts } from '../../../../../utils/theme'

const Header = ({ onClose, onSettings, style, gameCode }) => {
    const containerStyle = { ...styles.container, ...style }

    const handleCloseTapped = () => {
        console.warn(onClose)
        onClose && onClose()
    }

    const handleSettingsTapped = () => {
        onSettings && onSettings()
    }

    return (
        <View style={containerStyle}>
            <TouchableOpacity style={styles.close} onPress={() => handleCloseTapped()}>
                <Image
                    source={require('../../../../../assets/images/close_icon.png')}
                />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Enter game with:</Text>
                <Text style={styles.gameCodeText}>{gameCode}</Text>
            </View>
            <TouchableOpacity style={styles.settings} onPress={() => handleSettingsTapped()}>
                <Image
                    source={require('../../../../../assets/images/settings_icon.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'baseline',
        justifyContent: 'center'
    },
    close: {
        flex: 2,
        marginRight: 16,
        maxWidth: 44
    },
    settings: {
        flex: 2,
        marginLeft: 16,
        maxWidth: 44,
    },
    titleContainer: {
        borderRadius: 8,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        borderWidth: 1,
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingEnd: 16,
        paddingStart: 16,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleText: {
        fontFamily: fontFamilies.poppinsRegular,
        fontSize: fonts.xxMedium,
        color: 'white',
        textAlign: 'center',
    },
    gameCodeText: {
        fontFamily: fontFamilies.poppinsBold,
        fontSize: fonts.xLarge,
        color: 'white',
        marginLeft: 5
    }
})
