import React from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const PurpleBackground = (props) => {
    const style = { ...styles.background, ...props.style }
    return (
        <LinearGradient
            colors={['#483a82', '#7962c4', '#483a82']}
            start={{ x: 0.4, y: 0.2 }} end={{ x: 0.6, y: 0.8 }}
            locations={[0, 0.7, 1]}
            style={style}>
            {props.children}
        </LinearGradient>
    )
}

export default PurpleBackground

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
})
