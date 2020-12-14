import React from 'react'
import {
  Modal,
  Text,
  TextInput,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { shareGameWithTeacher } from '../../../../../../lib/Categories/DynamoDB/TeacherAccountsAPI'
import ButtonBack from '../../../../../components/ButtonBack'
import ButtonWide from '../../../../../components/ButtonWide'
import { colors, deviceWidth, elevation, fonts } from '../../../../../utils/theme'
import debug from '../../../../../utils/debug'

export default class GamesShare extends React.PureComponent {
  static propTypes = {
    handleClose: PropTypes.func,
    game: PropTypes.shape({}),
  };

  static defaultProps = {
    handleClose: () => { },
    game: {},
  };

  constructor(props) {
    super(props)

    this.state = {
      email: '',
    }
  }


  onSuccess = () => {
    // TODO Tell teacher
    debug.log('Successfully shared game with teacher')
    this.props.handleClose()
  }


  onError = (exception) => {
    debug.warn('Caught exception sharing game:', JSON.stringify(exception))
  }


  handleShareGame = () => {
    const { email } = this.state
    if (!email) return
    const lowerCaseEmail = email.toLowerCase()
    shareGameWithTeacher(lowerCaseEmail, this.props.game, this.onSuccess, this.onError)
  }


  handleInput = value => this.setState({ email: value });


  render() {
    const {
      handleClose,
    } = this.props

    const { email } = this.state

    return (
      <Modal
        animationType={'slide'}
        onRequestClose={handleClose}
        visible
      >
        <View style={styles.container}>

          <ButtonBack
            iconName={'close'}
            onPress={handleClose}
          />

          <Text style={styles.label}>Share game with teacher</Text>

          <View style={styles.itemContainer}>
            <TextInput
              keyboardType={'default'}
              maxLength={65}
              multiline={false}
              onChangeText={this.handleInput}
              placeholder={'teacher@email.edu'}
              placeholderTextColor={colors.lightGray}
              returnKeyType={'done'}
              style={[styles.textinput, elevation]}
              textAlign={'center'}
              underlineColorAndroid={colors.white}
              value={email}
            />
          </View>

          <ButtonWide
            label={'Share game'}
            onPress={this.handleShareGame}
          />

        </View>
      </Modal>
    )
  }
}


const styles = ScaledSheet.create({
  closeButton: {
    left: '15@ms',
    position: 'absolute',
    top: '15@ms',
  },
  closeIcon: {
    color: colors.white,
    fontSize: fonts.large,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.dark,
    flex: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'column',
    paddingHorizontal: '15@s',
    paddingVertical: '20@vs',
  },
  label: {
    color: colors.white,
    fontSize: fonts.large,
    fontWeight: 'bold',
    position: 'absolute',
    top: '90@vs',
  },
  textinput: {
    backgroundColor: colors.white,
    color: colors.primary,
    fontSize: fonts.xMedium,
    paddingVertical: '15@ms',
    paddingHorizontal: '20@ms',
    width: deviceWidth - scale(30),
  },
})
