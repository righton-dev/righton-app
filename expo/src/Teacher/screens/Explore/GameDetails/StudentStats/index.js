import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { fontFamilies, fonts } from '../../../../../utils/theme'

const StudentStats = (props) => {
    const { totalStudents, joinedStudents } = props
    const style = { ...styles.container, ...props.style }
    return (
        <View style={style}>
            <HalfWidthContainer text="Students in Room" number={totalStudents} />
            <View style={styles.divider} />
            <HalfWidthContainer text="Students Joined" number={joinedStudents} />
        </View>
    )
}

const HalfWidthContainer = (props) => {
    const { number, text } = props
    return (
        <View style={styles.halfWidth}>
            <Text style={styles.studentNumber}>{number}</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default StudentStats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    divider: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        width: 1,
    },
    halfWidth: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingStart: 28,
        paddingEnd: 24,
        justifyContent: 'center',
        padding: 0,
    },
    studentNumber: {
        fontFamily: fontFamilies.poppinsBold,
        color: 'white',
        fontSize: fonts.xxxLarge,
        textAlign: 'center',
        includeFontPadding: false,
        lineHeight: 90
    },
    text: {
        color: 'white',
        fontSize: fonts.xxMedium,
        fontFamily: fontFamilies.poppinsRegular,
        textAlign: 'center',
        includeFontPadding: false,
        marginTop: -10
    }
})
