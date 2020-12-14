import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fontFamilies, fonts } from '../../../../../utils/theme'
import { scale } from 'react-native-size-matters'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TeamCard = (props) => {
    const style = { ...styles.container, ...props.style }
    const { team, totalPlayers } = props
    return (
        <TouchableOpacity onPress={() => console.log("here")}>
            <View style={style}>
                <Text style={styles.teamText}>Team {team}</Text>
                <View style={styles.rightContainer}>
                    <Text style={styles.noPlayers}>{totalPlayers}</Text>
                    <Text style={styles.players}>player(s)</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TeamCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        flex: 1,
        marginEnd: 25,
        marginStart: 25,
        paddingStart: 18,
        paddingEnd: 18,
        flexDirection: 'row',
        alignItems: 'center',
        height: scale(64),
        borderRadius: 18
    },
    teamText: {
        fontFamily: fontFamilies.poppinsRegular,
        fontSize: fonts.xSmall,
        color: 'rgba(255,255,255,0.8)',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    players: {
        fontFamily: fontFamilies.poppinsRegular,
        fontSize: fonts.xSmall,
        color: 'white'
    },
    noPlayers: {
        color: 'white',
        fontFamily: fontFamilies.poppinsBold,
        fontSize: fonts.xxLarge,
        marginEnd: 10,
        lineHeight: 54
    }
})
