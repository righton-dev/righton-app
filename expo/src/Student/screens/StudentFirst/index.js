import React, { Fragment } from 'react'
import {
  Text,
  TextInput,
  SafeAreaView,
  Image,
  View,
  StatusBar
} from 'react-native'
import { navigationPropTypes, navigationDefaultProps, screenPropsPropTypes, screenPropsDefaultProps } from '../../../config/propTypes'
import { verticalScale } from 'react-native-size-matters'
import NetInfo from '@react-native-community/netinfo'
import { colors } from '../../../utils/theme'
import styles from './styles'
import debug from '../../../utils/debug'
import RoundButton from '../../../components/RoundButton'
import PurpleBackground from '../../../components/PurpleBackground'



export default class StudentFirst extends React.PureComponent {
  // static propTypes = {
  //   screenProps: screenPropsPropTypes,
  //   navigation: navigationPropTypes,
  // }

  // static defaultProps = {
  //   screenProps: screenPropsDefaultProps,
  //   navigation: navigationDefaultProps,
  // }

  constructor(props) {
    super(props)

    this.state = {
      messageProps: null,
      portal: null,
      room: '',
    }

    this.gameInput = null
  }

  componentWillUnmount() {
    this.props.screenProps.handleSetAppState('deviceSettings', { role: 'student' })
  }

  onRoomInput = room => this.setState({ room });

  onRoomSubmit = () => {
    this.handleGameEntry()
  }

  handleGameEntry = () => {
    const { room } = this.state
    if (!room && this.gameInput) {
      this.gameInput.focus()
      return
    }
    const GameRoomID = room
    this.setState({ portal: `Joining ${GameRoomID}` })
    NetInfo.fetch()
      .then(async (state) => {
        if (GameRoomID == '1234') {
          this.props.navigation.navigate('StudentChooseTeam')
        }
      })
  }

  handleNavigateToOnboardApp = () => {
    this.props.navigation.navigate('OnboardAppRouter')
  }

  render() {
    const {
      room,
    } = this.state

    return (
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#483a82' }} />
        <SafeAreaView style={styles.container}>
          <PurpleBackground style={styles.innerContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.rightOnHeroImage}
                resizeMode='contain'
                source={require('../../../assets/images/rightOnLogo.png')} />
            </View>
            <View style={styles.entryContainer}>
              <Text style={styles.title}>
                Enter Game Code
              </Text>
              <TextInput
                keyboardType={'number-pad'}
                maxLength={4}
                multiline={false}
                onChangeText={this.onRoomInput}
                onSubmitEditing={this.onRoomSubmit}
                placeholder={'####'}
                placeholderTextColor={colors.primary}
                ref={(ref) => { this.gameInput = ref }}
                returnKeyType={'done'}
                style={styles.input}
                textAlign={'center'}
                value={room}
                autoFocus={true}
              />

              <RoundButton
                title="Enter"
                style={styles.enterButton}
                onPress={this.onRoomSubmit}
              />
            </View>
          </PurpleBackground>
        </SafeAreaView>
      </Fragment>
    )
  }
}
