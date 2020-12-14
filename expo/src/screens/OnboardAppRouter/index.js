import React from 'react'
import {
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { colors, fonts, fontFamilies } from '../../utils/theme'
import RoundButton from '../../components/RoundButton'
import PurpleBackground from '../../components/PurpleBackground'

export default function OnboardAppRouter({ navigation }) {
  function handleTeacher() {
    // screenProps.handleSetAppState('deviceSettings', { role: 'teacher' });
    setTimeout(() => navigation.navigate('TeacherApp'), 250)
  }

  function handleStudent() {
    // screenProps.handleSetAppState('deviceSettings', { username: `${Math.random()}`, role: 'student' });
    setTimeout(() => navigation.navigate('StudentFirst'), 250)
  }

  return (
    <SafeAreaView style={styles.container}>
      <PurpleBackground>
        <ImageBackground style={styles.heroImage} source={require('../../assets/images/mathBottleHero.png')}>
          <Image
            style={styles.rightOnHeroImage}
            resizeMode="contain"
            resizeMethod="resize"
            source={require('../../assets/images/rightOnLogo.png')}
          />
          <Text style={styles.headerText}>
            Unlocking every student’s potential in math!
          </Text>
        </ImageBackground>
        <View style={styles.buttonsContainer}>
          <RoundButton
            title="I'm a Student"
            style={{ backgroundColor: colors.buttonSecondary }}
            onPress={() => handleStudent()}
          />
          <RoundButton
            title="I'm a Teacher"
            style={{ backgroundColor: colors.buttonPrimary }}
            onPress={() => handleTeacher()}
          />
        </View>
        <Text style={styles.footerText}>
          Legal notice legal notice legal notice legal notice legal notice legal notice
        </Text>
      </PurpleBackground>
    </SafeAreaView>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPurple
  },
  buttonsContainer: {
    height: 145,
    marginLeft: 33,
    marginRight: 33,
    justifyContent: 'space-between'
  },
  footerText: {
    height: 30,
    marginTop: 10,
    marginLeft: 82,
    marginRight: 74,
    marginBottom: 12,
    fontSize: fonts.tiny,
    lineHeight: 15,
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: -0.04,
    fontFamily: fontFamilies.poppinsRegular,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  heroImage: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  rightOnHeroImage: {
    marginTop: 22,
    width: 230,
    height: 118,
    alignSelf: 'center'
  },
  headerText: {
    fontSize: fonts.small,
    fontWeight: 'bold',
    fontFamily: fontFamilies.montserratBold,
    color: colors.white,
    marginTop: 9,
    width: 230,
    textAlign: 'center'
  }
})
