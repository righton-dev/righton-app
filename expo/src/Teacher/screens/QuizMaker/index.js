import React from 'react'
import {
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { ScaledSheet } from 'react-native-size-matters'
import Aicon from 'react-native-vector-icons/FontAwesome'
// import Touchable from 'react-native-platform-touchable';
import { colors, fonts } from '../../../utils/theme'


class QuizMaker extends React.PureComponent {
  static propTypes = {
    screenProps: PropTypes.shape({
      navigation: PropTypes.shape({
        navigate: PropTypes.func,
      }),
    }),
  };

  static defaultProps = {
    screenProps: {
      navigation: {
        navigate: () => { },
      },
    },
  };

  constructor(props) {
    super(props)

    this.state = {

    }
  }


  renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Quiz Maker</Text>
    </View>
  );


  renderMessage = () => (
    <View style={styles.message}>
      <Aicon name={'puzzle-piece'} style={styles.messageIcon} />
      <Text style={styles.messageTeaser}>
        Access our repository of questions and student generated {'&'} tested
        distractors to include in your homework and exams.
      </Text>
      <Text style={styles.messageDetail}>Coming soon!</Text>
    </View>
  );


  render() {
    // const {

    // } = this.state;

    // const { navigation } = this.props.screenProps;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView
          contentContainerStyle={styles.scrollview}
        >
          {this.renderMessage()}
        </ScrollView>
      </View>
    )
  }
}


const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  header: {
    alignSelf: 'stretch',
    backgroundColor: colors.primary,
    height: '200@vs',
  },
  headerTitle: {
    color: colors.white,
    fontSize: fonts.large,
    marginTop: '50@vs',
    textAlign: 'center',
  },
  message: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '25@s',
  },
  messageDetail: {
    bottom: '50@vs',
    color: colors.white,
    fontSize: fonts.large,
    position: 'absolute',
  },
  messageIcon: {
    color: colors.white,
    fontSize: '50@ms0.2',
    marginBottom: '75@vs',
  },
  messageTeaser: {
    color: colors.white,
    fontSize: fonts.xMedium,
    textAlign: 'center',
  },
  scrollview: {
    flexGrow: 1,
  },
})


export default props => <QuizMaker screenProps={{ ...props }} />
