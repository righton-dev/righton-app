import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';
import Aicon from 'react-native-vector-icons/FontAwesome';
import GameBuilder from './GameBuilder';
import { colors } from '../../../utils/theme';
import debug from '../../../utils/debug';
import styles from './styles';

import { playGame, saveGamesToDatabase } from '../../../utils/gameBuilder';

import {
  getItemFromTeacherAccountFromDynamoDB,
} from '../../../../lib/Categories/DynamoDB/TeacherAccountsAPI';
import LocalStorage from '../../../../lib/Categories/LocalStorage';


class Games extends React.PureComponent {
  static propTypes = {
    screenProps: PropTypes.shape({
      account: PropTypes.shape({
        gamesRef: PropTypes.shape({
          local: PropTypes.number,
          db: PropTypes.number,
        }),
        TeacherID: PropTypes.string,
      }),
      deviceSettings: PropTypes.shape({
        quizTime: PropTypes.string,
        trickTime: PropTypes.string,
      }),
      gameState: PropTypes.shape({}),
      handleSetAppState: PropTypes.func.isRequired,
      IOTPublishMessage: PropTypes.func.isRequired,
      IOTSubscribeToTopic: PropTypes.func.isRequired,
      // Root navigation (Switch Navigator)
      navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
      }),
    }),
  };
  
  static defaultProps = {
    screenProps: {
      account: {
        gamesRef: PropTypes.shape({
          local: 0,
          db: 0,
        }),
        TeacherID: '',
      },
      deviceSettings: {
        quizTime: '',
        trickTime: '',
      },
      gameState: {},
      handleSetAppState: () => {},
      IOTPublishMessage: () => {},
      IOTSubscribeToTopic: () => {},
      navigation: {
        navigate: () => {},
      },
    },
  };
  
  constructor(props) {
    super(props);

    this.state = {
      viewGame: null,
      games: [],
      filter: '',
    };

    this.currentGame = null;

    this.handleRenderFavorites = this.handleRenderFavorites.bind(this);
    this.handleRenderMyGames = this.handleRenderMyGames.bind(this);

    this.handleCloseGame = this.handleCloseGame.bind(this);
    this.handleCreateGame = this.handleCreateGame.bind(this);
    this.handleViewGame = this.handleViewGame.bind(this);

    this.handlePlayGame = this.handlePlayGame.bind(this);
  }


  componentDidMount() {
    this.hydrateGames();
  }
  

  getGamesFromDynamoDB(TeacherID) {
    getItemFromTeacherAccountFromDynamoDB(
      'TeacherGamesAPI',
      'games',
      TeacherID,
      (res) => {
        this.setState({ games: res });
        const gamesJSON = JSON.stringify(res);
        LocalStorage.setItem(`@RightOn:${TeacherID}/Games`, gamesJSON);
        debug.log('Successful GETTING teacher games from DynamoDB to hydrate local state in games:', JSON.stringify(res));
      },
      exception => debug.warn('Error GETTING teacher games from DynamoDB to hydrate local state in games:', JSON.stringify(exception))
    );
  }


  async hydrateGames() {
    try {
      const { TeacherID } = this.props.screenProps.account;
      if (!TeacherID) {
        // TODO! Notify user that they must create an account to create a game
        return;
      }
      let games = [];
      games = await LocalStorage.getItem(`@RightOn:${TeacherID}/Games`);
      if (typeof games === 'string') {
        games = JSON.parse(games);
        this.setState({ games }, () => {
          const { account } = this.props.screenProps;
          if (account.gamesRef.local !== account.gamesRef.db) {
            // Previous attempt to save games to DynamoDB failed so we try again.
            this.handleSaveGamesToDatabase(games);
          }
        });
      } else if (games === undefined || games === null) {
        // User signed in on a different device so let's get their games from the cloud
        // and hydrate state as well as store them in LocalStorage.

        // Note: technically we handle this is App.js when user signs in with a username
        // that is different from that of the one saved on device, but we'll leave this
        // here just in case as a fallback.
        this.getGamesFromDynamoDB(TeacherID);
      }
    } catch (exception) {
      debug.log('Caught exception getting Games from LocalStorage @Games, hydrateGames():', exception);
    }
  }


  handleRenderFavorites() {
    this.setState({ filter: 'Favorites' });
  }


  handleRenderMyGames() {
    this.setState({ filter: '' });
  }


  handleViewGame(event, game = {}, idx = null) {
    this.currentGame = idx;
    this.setState({ viewGame: game });
  }


  handleCloseGame() {
    this.setState({ viewGame: null });
    this.currentGame = null;
  }


  handleCreateGame(game) {
    const { games } = this.state;
    if (this.currentGame === null) {
      const updatedGames = [game, ...games];
      this.setState({ games: updatedGames, viewGame: null });
      this.handleSaveGamesToDatabase(updatedGames);
    } else {
      const updatedGames = [...games];
      updatedGames.splice(this.currentGame, 1, game);
      this.setState({ games: updatedGames, viewGame: null });
      this.handleSaveGamesToDatabase(updatedGames);
      this.currentGame = null;
    }
  }


  handleSaveGamesToDatabase = async (updatedGames) => {
    const { account, handleSetAppState } = this.props.screenProps;

    saveGamesToDatabase(updatedGames, account, handleSetAppState);
  }


  handlePlayGame(e, game) {
    const { quizTime, trickTime } = this.props.screenProps.deviceSettings;
    const { handleSetAppState, IOTSubscribeToTopic, navigation } = this.props.screenProps;

    playGame(
      game,
      quizTime,
      trickTime,
      handleSetAppState,
      this.handleCloseGame,
      navigation,
      IOTSubscribeToTopic,
    );
  }


  renderHeader = filter => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Games</Text>

      <Touchable
        activeOpacity={0.8}
        hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
        onPress={this.handleRenderMyGames}
        style={[styles.headerButton, styles.headerGames]}
      >
        <View style={styles.alignCenter}>
          <Aicon name={'gamepad'} style={[styles.headerIcon, filter === 'Favorites' && styles.colorGrey]} />
          <Text style={[styles.gameStartIcon, filter === 'Favorites' && styles.colorGrey]}>My Games</Text>
        </View>
      </Touchable>

      <Touchable
        activeOpacity={0.8}
        hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
        onPress={this.handleRenderFavorites}
        style={[styles.headerButton, styles.headerFavorites]}
      >
        <View style={styles.alignCenter}>
          <Aicon name={'heart'} style={[styles.headerIcon, filter === '' && styles.colorGrey]} />
          <Text style={[styles.gameStartIcon, filter === '' && styles.colorGrey]}>Favorites</Text>
        </View>
      </Touchable>

      <Touchable
        activeOpacity={0.8}
        hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
        onPress={this.handleViewGame}
        style={[styles.headerButton, styles.headerPlus]}
      >
        <Aicon name={'plus'} style={styles.headerIcon} />
      </Touchable>
    </View>
  );


  renderGameBlock(game, idx, filter) {
    if (filter === 'Favorites' && !game.favorite) return null;
    return (
      <View
        key={game.title}
        style={styles.gameButton}
      >
        <View style={styles.imageContainer}>
          {game.image ?
            <Image source={{ uri: game.image }} style={styles.image} />
            :
            <Text style={styles.imageLabel}>RightOn!</Text>}
          <Text style={styles.gameCount}>{ `${game.questions.length} Team${game.questions.length === 1 ? '' : 's'}` }</Text>
        </View>
        <View style={styles.gameColumn}>
          <Text numberOfLines={1} style={styles.gameTitle}>{ game.title }</Text>
          <Text
            numberOfLines={2}
            style={[styles.gameTitle, styles.gameDescription]}
          >
            { game.description }
          </Text>
        </View>
        <Touchable
          activeOpacity={0.8}
          background={Touchable.Ripple(colors.primary, false)}
          hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
          onPress={() => this.handleViewGame(null, game, idx)}
          style={styles.gameOpenButton}
        >
          <Text style={styles.gameOpenText}>View game</Text>
        </Touchable>
        <Touchable
          activeOpacity={0.8}
          background={Touchable.Ripple(colors.primary, false)}
          hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
          onPress={() => this.handlePlayGame(null, game)}
          style={[styles.gameOpenButton, styles.gameStartButton]}
        >
          <Aicon name={'play'} style={styles.gameStartIcon} />
        </Touchable>
      </View>
    );
  }


  renderGames(filter) {
    const { games } = this.state;
    if (!Array.isArray(games)) return null;

    return (
      <ScrollView contentContainerStyle={styles.scrollview}>
        {games.map((game, idx) => this.renderGameBlock(game, idx, filter))}
      </ScrollView>
    );
  }


  render() {
    const { viewGame, filter } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} />
        {viewGame &&
          <GameBuilder
            currentGame={this.currentGame}
            handleClose={this.handleCloseGame}
            handleCreateGame={this.handleCreateGame}
            handlePlayGame={this.handlePlayGame}
            game={viewGame}
            visible
          />}
        {this.renderHeader(filter)}
        {this.renderGames(filter)}
      </View>
    );
  }
}


export default props => <Games screenProps={{ ...props }} />;
