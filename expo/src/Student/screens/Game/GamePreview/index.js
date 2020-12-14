import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'
import { fontFamilies, fonts } from '../../../../utils/theme'
import * as Progress from 'react-native-progress'
import TeamsReadinessFooter from '../../../components/TeamsReadinessFooter'
import HorizontalPageView from '../../../components/HorizontalPageView'
import Card from '../../../components/Card'
import Spinner from './Spinner'
import ScrollableQuestion from '../Components/ScrollableQuestion'
import TrickAnswers from './TrickAnswers'
import HintsView from '../Components/HintsView'


const GamePreview = ({ navigation, route }) => {
  const { selectedTeam, isFacilitator } = route.params
  const [availableHints, setAvailableHints] = useState([
    { hintNo: 1, hint: 'A stop sign is a regular octagon, a polygon with 8 congruent sides.' },
    { hintNo: 2, hint: 'We can create triangles within the octagon. For example, starting with any vertex, or corner, we can draw a line to each of the 5 non-adjacent vertices (or corners) of the octagon.' },
    { hintNo: 3, hint: 'Count the number of triangles that have been created.' },
  ])
  const [countdown, setCountdown] = useState(300)
  const [progress, setProgress] = useState(1)
  const [showTrickAnswersHint, setShowTrickAnswersHint] = useState(false)
  const [hints, setHints] = useState([availableHints[0]])

  useEffect(() => {
    if (countdown == 0) {
      return
    }
    const totalNoSecondsLeftForShowingHints = 295
    var refreshIntervalId = setInterval(() => {
      setCountdown(countdown - 1)
      setProgress(countdown / 300)
      setShowTrickAnswersHint(countdown <= totalNoSecondsLeftForShowingHints)
    }, 1000)
    return () => {
      clearInterval(refreshIntervalId)
    }
  })

  const showNewHint = () => {
    if (hints.length == availableHints.length) {
      return
    }
    setHints([...hints, availableHints[hints.length]])
  }

  const showAllHints = () => {
    setShowTrickAnswersHint(true)
    setHints(availableHints)
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        colors={['rgba(62, 0, 172, 1)', 'rgba(98, 0, 204, 1)']}
        style={styles.headerContainer}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerText}>
          Trick Your Class!
        </Text>
        <View style={styles.timerContainer}>
          <Progress.Bar
            style={styles.timerProgressBar}
            progress={progress}
            color={'#349E15'}
            unfilledColor={'rgba(255,255,255,0.8)'}
            width={Dimensions.get('window').width - scale(90)}
          />
          <Text style={styles.timerText}>
            {Math.floor(countdown / 60)}:{('0' + Math.floor(countdown % 60)).slice(-2)}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.carouselContainer}>
        <HorizontalPageView>
          <Card headerTitle="Question">
            <ScrollableQuestion />
          </Card>
          <Card headerTitle="Trick Answers">
            <TrickAnswers isFacilitator={isFacilitator} onAnsweredCorrectly={() => showAllHints()} />
          </Card>
          <Card headerTitle="Hints">
            {
              showTrickAnswersHint
                ? <HintsView hints={hints} onTappedShowNextHint={() => showNewHint()} isMoreHintsAvailable={hints.length < availableHints.length} />
                : <Spinner text="Hints will be available after one minute." />
            }
          </Card>
        </HorizontalPageView>
      </View>
      <TeamsReadinessFooter
        style={styles.footer}
        onTappedFirst={() => {
          navigation.navigate('TeamInfo', {
            availableHints,
            answeringOwnQuestion: true,
            team: 1,
          })
        }}
        onTappedLast={() => {
          navigation.navigate('TeamInfo', {
            availableHints,
            answeringOwnQuestion: false,
            team: 5,
          })
        }}
      />
    </SafeAreaView>
  )
}

export default GamePreview

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(247,249,250,1)'
  },
  headerContainer: {
    height: verticalScale(225),
    shadowColor: 'rgba(0, 141, 239, 0.3)',
  },
  headerText: {
    marginTop: scale(24),
    marginLeft: scale(30),
    fontFamily: fontFamilies.montserratBold,
    fontSize: fonts.large,
    fontWeight: 'bold',
    color: 'white'
  },
  timerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: scale(15),
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: scale(30),
    marginRight: scale(21),
  },
  timerProgressBar: {
    marginRight: 9,
    marginTop: 5,
  },
  timerText: {
    color: 'white',
    opacity: 0.8,
    fontSize: fonts.xSmall,
    fontFamily: fontFamilies.latoBold,
    fontWeight: 'bold',
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: -scale(75),
  },
  footer: {
    marginBottom: moderateScale(30)
  }
})
