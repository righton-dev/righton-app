import React from 'react'
import { StyleSheet, Text, View, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Header from './Header'
import StudentStats from './StudentStats'
import TeamCard from './TeamCard'
import { verticalScale, scale } from 'react-native-size-matters'
import RoundButton from '../../../../components/RoundButton'
import { colors } from '../../../../utils/theme'

const GameDetailsScreen = ({ navigation }) => {
    const onClose = () => {
        navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <LinearGradient
                colors={["#0D68B1", "#02215F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.backgroundGradient}
            >
                <View style={styles.contentContainer}>
                    <Header style={styles.header} gameCode="9349" onClose={() => onClose()} />
                    <StudentStats totalStudents="28" joinedStudents="2" style={styles.studentStats} />
                    <View style={styles.teams}>
                        <ScrollView style={{ flexGrow: 0 }}>
                            <TeamCard team="1" totalPlayers="2" style={{ marginBottom: 12 }} />
                            <TeamCard team="2" totalPlayers="0" style={{ marginBottom: 12 }} />
                            <TeamCard team="3" totalPlayers="1" style={{ marginBottom: 12 }} />
                            <TeamCard team="4" totalPlayers="0" style={{ marginBottom: 12 }} />
                            <TeamCard team="5" totalPlayers="0" style={{ marginBottom: 12 }} />
                            <TeamCard team="6" totalPlayers="0" style={{ marginBottom: 12 }} />
                            <TeamCard team="7" totalPlayers="0" style={{ marginBottom: 12 }} />
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <RoundButton
                        style={styles.startGame}
                        title="Start Game"
                        onPress={() => console.log("Start Game")} />
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default GameDetailsScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#003668',
    },
    contentContainer: {
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        marginTop: verticalScale(16)
    },
    studentStats: {
        marginTop: 25
    },
    backgroundGradient: {
        flex: 1
    },
    teams: {
        marginTop: 40,
        maxHeight: '50%'
    },
    startGame: {
        marginEnd: 41,
        marginStart: 41,
        height: scale(64),
        backgroundColor: colors.buttonSecondary
    },
    bottomContainer: {
        backgroundColor: '#02215F',
        paddingTop: 16,
        paddingBottom: 16
    }
})
