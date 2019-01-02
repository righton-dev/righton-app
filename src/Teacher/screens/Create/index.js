import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { IOTSubscribeToTopic, unsubscribeFromTopic, publishMessage } from '../../../../lib/Categories/IoT';
// import { postGameToDynamoDB } from '../../../../lib/Categories/DynamoDB';
import Swiper from 'react-native-swiper';
import Touchable from 'react-native-platform-touchable';
import Portal from '../../../screens/Portal';
import ButtonBack from '../../../components/ButtonBack';
import ButtonWide from '../../../components/ButtonWide';
import LocalStorage from '../../../../lib/Categories/LocalStorage';
import { colors, deviceWidth, fonts } from '../../../utils/theme';
import firstStyles from '../../../Student/screens/StudentFirst/styles';
import quizStyles from '../Quizzes/styles';
import debug from '../../../utils/debug';


const blockSize = deviceWidth / 4;


class Create extends React.Component {
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
        navigate: () => {},
      },
    },
  };
  
  constructor(props) {
    super(props);

    this.state = {
      activeQuiz: {},
      room: '',
      quizzes: [],
    };

    this.handleRoomInput = this.handleRoomInput.bind(this);
    this.handleRoomSubmit = this.handleRoomSubmit.bind(this);
    this.handleGroupSelection = this.handleGroupSelection.bind(this);

    this.handleBackFromGroups = this.handleBackFromGroups.bind(this);
    this.handleBackFromHost = this.handleBackFromHost.bind(this);

    this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
  }

  
  componentWillUnmount() {
    const { room } = this.state;
    unsubscribeFromTopic(room);
  }


  handleRoomInput(room) {
    this.setState({ room });
  }


  async hydrateQuizzes() {
    let quizzes;
    try {
      quizzes = await LocalStorage.getItem('@RightOn:Quizzes');
      if (quizzes === undefined) {
        LocalStorage.setItem('@RightOn:Quizzes', JSON.stringify([]));
        // TODO! Handle when user is logged in with different account??
        quizzes = [];
      } else {
        quizzes = JSON.parse(quizzes);
      }
    } catch (exception) {
      debug.log('Caught exception getting item from LocalStorage @Quizzes, hydrateQuizzes():', exception);
    }
    this.setState({ quizzes }, () => {
      setTimeout(() => this.swiperRef.scrollBy(1, false), 500);
    });
  }


  handleRoomSubmit() {
    // TODO Handle entering game in DynamoDB
    // Hydrate Dashboard w/ game details
    const { room } = this.state;
    // TODO Save teacher account name in table for conditional checking
    // postGameToDynamoDB(room);
    this.setState({ room });
    this.hydrateQuizzes();
    this.swiperRef.scrollBy(1, false);
  }


  handleBackFromHost() {
    this.swiperRef.scrollBy(-2, false);
  }


  handleBackFromGroups() {
    this.swiperRef.scrollBy(-1, false);
  }


  handleQuizSelection(e, quiz) {
    this.setState({ activeQuiz: quiz });
    this.swiperRef.scrollBy(1, false);
  }


  async handleGroupSelection(number) {
    const { activeQuiz, room } = this.state;
    const awsQuiz = {
      ...activeQuiz,
      groups: number,
      answering: null,
    };
    const data = {
      action: 'SET_QUIZ_STATE',
      data: { ...awsQuiz },
    };
    // const schema = {
    //   avatar: 'string',
    //   title: 'string',
    //   description: 'string',
    //   group#: [{ /* question schema */
    //     answer: 'string',
    //     image: 'string',
    //     instructions: ['string'],
    //     question: 'string',
    //     uid: 'string',
    //     group: 'number', ??
    //     tricks: ['string'],
    //   }],
    //   GameRoomID: 'string',
    //   groups: 'number',
    //   answering: 'number', // index of quiz in questions array
    // };

    IOTSubscribeToTopic(room, this.handleReceivedMessage);
    setTimeout(() => {
      const message = JSON.stringify(data);
      publishMessage(room, message);
    }, 5000);
  }


  handleReceivedMessage = (message) => {
    console.log('Received Message', message);
  }


  renderQuizBlock(quiz) {
    return (
      <Touchable
        activeOpacity={0.8}
        background={Touchable.Ripple(colors.dark, false)}
        hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
        key={quiz.title}
        onPress={() => this.handleQuizSelection(null, quiz)}
      >
        <View style={quizStyles.quizButton}>
          <View style={quizStyles.imageContainer}>
            {quiz.image ?
              <Image source={{ uri: quiz.image }} style={quizStyles.image} />
              :
              <Text style={quizStyles.imageLabel}>RightOn!</Text>}
          </View>
          <Text style={quizStyles.quizTitle}>{ quiz.title }</Text>
          <Text style={[quizStyles.quizTitle, quizStyles.quizDescription]}>
            { quiz.description }
          </Text>
          <Text style={quizStyles.quizCount}>{ `${quiz.questions.length}Q` }</Text>
        </View>
      </Touchable>
    );
  }


  renderNumberBlock = number => (
    <Touchable
      activeOpacity={0.8}
      background={Touchable.Ripple(colors.primary, false)}
      key={`${number}`}      
      onPress={() => this.handleGroupSelection(number)}
      style={styles.blockContainer}
    >
      <Text style={styles.blockNumber}>{ number }</Text>
    </Touchable>
  );


  renderNumberBlocks = () => {
    const { activeQuiz } = this.state;
    if (!activeQuiz.questions) return null;
    const len = activeQuiz.questions.length;
    const arr = [];
    arr[len] = undefined;
    return (
      <View style={styles.blocksContainer}>
        {arr.map((n, idx) => len % idx === 0 && this.renderNumberBlock(idx))}
      </View>
    );
  }


  render() {
    const {
      quizzes,
      room,
    } = this.state;

    return (
      <Swiper
        horizontal={false}
        index={0}
        loadMinimal={false}
        loop={false}
        ref={(ref) => { this.swiperRef = ref; }}
        scrollEnabled={false}
        showsPagination={false}
      >


        <View style={firstStyles.container}>
          <StatusBar backgroundColor={colors.dark} />
          <Text style={firstStyles.title}>Game Room</Text>
          <TextInput
            keyboardType={'default'}
            maxLength={30}
            multiline={false}
            onChangeText={this.handleRoomInput}
            onSubmitEditing={this.handleRoomSubmit}
            placeholder={'Game Name'}
            placeholderTextColor={colors.primary} 
            returnKeyType={'done'}
            style={firstStyles.input}
            textAlign={'center'}
            underlineColorAndroid={colors.dark}   
            value={room}
          />
          <ButtonWide
            label={'Enter Game'}
            onPress={this.handleRoomSubmit}
          />
        </View>


        <Portal messageType={'single'} messageValues={{ message: `Launching ${room}` }} />


        <ScrollView contentContainerStyle={[firstStyles.container, styles.scrollview]}>
          <ButtonBack
            onPress={this.handleBackFromHost}
          />
          <Text style={firstStyles.title}>Host a quiz</Text>
          {quizzes.map(quiz => this.renderQuizBlock(quiz))}
        </ScrollView>


        <ScrollView contentContainerStyle={[firstStyles.container, styles.scrollview]}>
          <ButtonBack
            onPress={this.handleBackFromGroups}
          />
          <Text style={firstStyles.title}>Number of groups</Text>
          {this.renderNumberBlocks()}
          <ButtonWide
            label={'Launch Game'}
            onPress={this.handleGroupSelection}
          />
        </ScrollView>


      </Swiper>
    );
  }
}


const styles = StyleSheet.create({
  blockContainer: {
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    height: blockSize,
    justifyContent: 'center',
    marginBottom: 15,
    width: blockSize,
  },
  blocksContainer: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  blockNumber: {
    color: colors.white,
    fontSize: fonts.large,
    fontWeight: 'bold',
  },
  scrollview: {
    justifyContent: 'flex-start',
    paddingBottom: 50,
    paddingTop: 90,
  },
});


export default props => <Create screenProps={{ ...props }} />;
