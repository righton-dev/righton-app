import React from 'react'
import { StyleSheet, Image, View, Pressable } from 'react-native'

const TeamsReadinessFooter = ({ onTappedFirst, onTappedLast }) => {
    return (
        <View style={styles.footer}>
            <Pressable
                onPress={() => {
                    if (onTappedFirst !== undefined) onTappedFirst()
                }}
            >
                <Image source={require('./img/Team1Ready.png')} style={styles.footerImage} />
            </Pressable>
            <Image source={require('./img/Team2NotReady.png')} style={styles.footerImage} />
            <Image source={require('./img/Team3Ready.png')} style={styles.footerImage} />
            <Image source={require('./img/Team4NotReady.png')} style={styles.footerImage} />
            <Pressable
                onPress={() => {
                    if (onTappedLast !== undefined) onTappedLast()
                }}
            >
                <Image source={require('./img/Team5NotReady.png')} style={styles.footerImage} />
            </Pressable>
        </View>
    )
}

export default TeamsReadinessFooter

const styles = StyleSheet.create({
    footer: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    footerImage: {
        marginLeft: 5,
        marginRight: 5,
        width: 56,
        resizeMode: 'contain'
    }
})
