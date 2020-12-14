import React from 'react'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { ScaledSheet, verticalScale } from 'react-native-size-matters'
import ButtonBack from '../../components/ButtonBack'
import ButtonWide from '../../components/ButtonWide'
import { colors, fonts } from '../../utils/theme'
import OnboardTeacherIntroSlides from '../OnboardTeacherIntroSlides'

export default class OnboardTeacherRouter extends React.PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }),
    screenProps: PropTypes.shape({
      handleSetAppState: PropTypes.func.isRequired,
    }),
  }

  static defaultProps = {
    navigation: {},
    screenProps: {
      handleSetAppState: () => { },
    },
  }


  handleTeacherOnboard = () => {
    this.props.navigation.navigate('OnboardAccount')
  }


  handleTeacherApp = () => {
    this.props.screenProps.handleSetAppState('deviceSettings', {
      role: 'teacher',
      quizTime: '1:00',
      trickTime: '3:00',
    })
    this.props.navigation.navigate('TeacherApp')
  }


  handleBack = () => this.props.navigation.navigate('OnboardAppRouter');


  render() {
    return (
      <View style={styles.mainContainer}>

        <OnboardTeacherIntroSlides />

        <ButtonBack
          buttonStyles={{ top: 40 }}
          onPress={this.handleBack} />

        <ButtonWide
          buttonStyles={{ bottom: verticalScale(65) }}
          label={'Log In / Sign Up'}
          onPress={this.handleTeacherOnboard}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.handleTeacherApp}
          style={styles.maybeContainer}
        >
          <Text style={styles.maybe}>Maybe later</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = ScaledSheet.create({
  mainContainer: {
    backgroundColor: colors.dark,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  maybe: {
    color: colors.white,
    fontSize: fonts.xMedium,
    textAlign: 'center',
  },
  maybeContainer: {
    // Removing background color causes Swiper dot primary color to shine through
    backgroundColor: colors.dark,
    bottom: 0,
    height: '65@vs',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
  },
})
