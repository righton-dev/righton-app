import React from 'react'
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native'
import { navigationPropTypes, navigationDefaultProps, screenPropsPropTypes, screenPropsDefaultProps } from '../../../config/propTypes'
import Touchable from 'react-native-platform-touchable'
import Aicon from 'react-native-vector-icons/FontAwesome'
import { NavigationEvents } from '@react-navigation/native'
import GamesBuilder from './GamesBuilder'
import { colors } from '../../../utils/theme'
import debug from '../../../utils/debug'
import styles from './styles'

import { playGame, saveGamesToDatabase } from '../../../utils/gamesBuilder'

import {
  getItemFromTeacherAccountFromDynamoDB,
} from '../../../../lib/Categories/DynamoDB/TeacherAccountsAPI'
import LocalStorage from '../../../../lib/Categories/LocalStorage'


class Games extends React.Component {
  static propTypes = {
    screenProps: screenPropsPropTypes,
    navigation: navigationPropTypes,
  }

  static defaultProps = {
    screenProps: screenPropsDefaultProps,
    navigation: navigationDefaultProps,
  }

  constructor(props) {
    super(props)

    this.state = {
      viewGame: null,
      games: [],
      filter: 'My Games',
      sharedGames: [],
    }

    this.currentGame = null
  }


  componentDidMount() {
    this.hydrateGames()
    // this.getGamesFromDynamoDB(this.props.screenProps.account.TeacherID);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.filter !== nextState.filter) return true
    if (this.state.viewGame !== nextState.viewGame) return true
    if (this.state.games.length !== nextState.games.length) return true
    if (this.state.sharedGames.length !== nextState.sharedGames.length) return true
    return false
  }


  onGamesTabFocused = () => {
    if (this.props.navigation.state.params && this.props.navigation.state.params.reloadGames) {
      this.hydrateGames()
      delete this.props.navigation.state.params.reloadGames
    }
  }


  getGamesFromDynamoDB = (TeacherID) => {
    getItemFromTeacherAccountFromDynamoDB(
      TeacherID,
      'games',
      (res) => {
        if (typeof res === 'object' && res.games) {
          this.setState({ games: res.games })
          const gamesJSON = JSON.stringify(res.games)
          LocalStorage.setItem(`@RightOn:${TeacherID}/Games`, gamesJSON)
        }
        debug.log('Successful GETTING teacher games from DynamoDB to hydrate local state in games:', JSON.stringify(res))
      },
      exception => debug.warn('Error GETTING teacher games from DynamoDB to hydrate local state in games:', JSON.stringify(exception))
    )
  }


  getSharedGamesFromDynamoDB = (TeacherID) => {
    getItemFromTeacherAccountFromDynamoDB(
      TeacherID,
      'sharedGames',
      (res) => {
        if (typeof res === 'object' && res.sharedGames) {
          this.setState({ sharedGames: res.sharedGames })
        }
        debug.log('Successful GETTING teacher shared games from DynamoDB to hydrate local state in games:', JSON.stringify(res))
      },
      exception => debug.warn('Error GETTING teacher shared games from DynamoDB to hydrate local state in games:', JSON.stringify(exception))
    )
  }


  getIndexOfGame = (game) => {
    const { games } = this.state
    for (let i = 0; i < games.length; i += 1) {
      if (games[i].GameID === game.GameID) {
        return i
      }
    }
    return null
  }


  hydrateGames = async () => {
    try {
      const { TeacherID } = this.props.screenProps.account
      if (!TeacherID) {
        // TODO! Notify user that they must create an account to create a game
        return
      }
      let games = []
      games = await LocalStorage.getItem(`@RightOn:${TeacherID}/Games`)
      if (typeof games === 'string') {
        games = JSON.parse(games)
        // games.shift();
        // this.handleSaveGamesToDatabase(games);
        this.setState({ games }, () => {
          const { account } = this.props.screenProps
          if (account.gamesRef && (account.gamesRef.local !== account.gamesRef.db)) {
            // Previous attempt to save games to DynamoDB failed so we try again.
            this.handleSaveGamesToDatabase(games)
          }
        })
      } else if (games === undefined || games === null || (Array.isArray(games) && !games)) {
        // User signed in on a different device so let's get their games from the cloud
        // and hydrate state as well as store them in LocalStorage.

        // Note: technically we handle this is App.js when user signs in with a username
        // that is different from that of the one saved on device, but we'll leave this
        // here just in case as a fallback.
        this.getGamesFromDynamoDB(TeacherID)
      }
    } catch (exception) {
      debug.log('Caught exception getting Games from LocalStorage @Games, hydrateGames():', exception)
    }
  }


  handleRenderFavorites = () => {
    this.setState({ filter: 'Favorites' })
  }


  handleRenderMyGames = () => {
    this.setState({ filter: 'My Games' })
  }


  handleRenderShared = () => {
    this.setState({ filter: 'Shared' })
    const { TeacherID } = this.props.screenProps.account
    if (TeacherID) {
      this.getSharedGamesFromDynamoDB(TeacherID)
    }
  }


  handleViewGame = (event, game = {}, idx = null) => {
    if (idx === null || game.GameID) {
      this.currentGame = this.getIndexOfGame(game)
    } else {
      this.currentGame = idx
    }
    this.setState({ viewGame: game })
  }


  handleCloseGame = () => {
    this.setState({ viewGame: null })
    this.currentGame = null
  }


  handleCreateGame = (game, newGame) => {
    const { games } = this.state
    if (this.currentGame === null || newGame) {
      const updatedGames = [game, ...games]
      this.setState({ games: updatedGames, viewGame: null })
      this.handleSaveGamesToDatabase(updatedGames)
    } else {
      const updatedGames = [...games]
      updatedGames.splice(this.currentGame, 1, game)
      this.setState({ games: updatedGames, viewGame: null })
      this.handleSaveGamesToDatabase(updatedGames)
    }
    this.handleCloseGame()
  }


  handleDeleteGame = () => {
    if (this.currentGame !== null) {
      const { games } = this.state
      const updatedGames = [...games]
      updatedGames.splice(this.currentGame, 1)
      this.setState({ games: updatedGames, viewGame: null })
      this.handleSaveGamesToDatabase(updatedGames)
    }
  }


  handleSaveGamesToDatabase = async (updatedGames) => {
    const { account, handleSetAppState } = this.props.screenProps

    saveGamesToDatabase(updatedGames, account, handleSetAppState)
  }


  handlePlayGame = (e, game) => {
    const { quizTime, trickTime } = this.props.screenProps.deviceSettings
    const { handleSetAppState, IOTSubscribeToTopic } = this.props.screenProps
    const { navigation } = this.props

    playGame(
      game,
      quizTime,
      trickTime,
      handleSetAppState,
      this.handleCloseGame,
      navigation,
      IOTSubscribeToTopic,
    )
  }


  renderHeader = filter => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Games</Text>

      <View style={styles.navRow}>
        <Touchable
          activeOpacity={0.8}
          hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
          onPress={this.handleRenderMyGames}
          style={styles.navButton}
        >
          <View style={styles.alignCenter}>
            <Aicon name={'gamepad'} style={[styles.headerIcon, filter !== 'My Games' && styles.colorGrey]} />
            <Text style={[styles.gameStartIcon, filter !== 'My Games' && styles.colorGrey]}>My Games</Text>
          </View>
        </Touchable>

        <Touchable
          activeOpacity={0.8}
          hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
          onPress={this.handleRenderFavorites}
          style={styles.navButton}
        >
          <View style={styles.alignCenter}>
            <Aicon name={'heart'} style={[styles.headerIcon, filter !== 'Favorites' && styles.colorGrey]} />
            <Text style={[styles.gameStartIcon, filter !== 'Favorites' && styles.colorGrey]}>Favorites</Text>
          </View>
        </Touchable>

        <Touchable
          activeOpacity={0.8}
          hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
          onPress={this.handleRenderShared}
          style={styles.navButton}
        >
          <View style={styles.alignCenter}>
            <Aicon name={'share'} style={[styles.headerIcon, filter !== 'Shared' && styles.colorGrey]} />
            <Text style={[styles.gameStartIcon, filter !== 'Shared' && styles.colorGrey]}>Shared</Text>
          </View>
        </Touchable>
      </View>

      <Touchable
        activeOpacity={0.8}
        hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
        onPress={this.handleViewGame}
        style={styles.headerPlus}
      >
        <Aicon name={'plus'} style={styles.headerIcon} />
      </Touchable>
    </View>
  );


  renderGameBlock = (game, idx, filter) => {
    if (filter === 'Favorites' && !game.favorite) return null
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
          <Text style={styles.gameCount}>{`${game.questions.length} Team${game.questions.length === 1 ? '' : 's'}`}</Text>
        </View>
        <View style={styles.gameColumn}>
          <Text numberOfLines={1} style={styles.gameTitle}>{game.title}</Text>
          <Text
            numberOfLines={2}
            style={[styles.gameTitle, styles.gameDescription]}
          >
            {game.description}
          </Text>
        </View>
        <Touchable
          activeOpacity={0.8}
          background={Touchable.Ripple(colors.primary, false)}
          hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
          onPress={() => this.handleViewGame(null, game, filter === 'My Games' ? idx : null)}
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
    )
  }


  renderGames = (filter) => {
    const { games } = this.state
    if (!Array.isArray(games)) return null

    if (filter === 'Shared') {
      const { sharedGames } = this.state
      return (
        <ScrollView contentContainerStyle={styles.scrollview}>
          {sharedGames.map((game, idx) => this.renderGameBlock(game, idx, filter))}
        </ScrollView>
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.scrollview}>
        {games.map((game, idx) => this.renderGameBlock(game, idx, filter))}
      </ScrollView>
    )
  }


  render() {
    const { viewGame, filter } = this.state
    const { TeacherID } = this.props.screenProps.account

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={this.onGamesTabFocused}
        />
        {viewGame &&
          <GamesBuilder
            currentGame={this.currentGame}
            handleClose={this.handleCloseGame}
            handleCreateGame={this.handleCreateGame}
            handlePlayGame={this.handlePlayGame}
            handleDeleteGame={this.handleDeleteGame}
            game={viewGame}
            TeacherID={TeacherID}
            visible
          />}
        {this.renderHeader(filter)}
        {this.renderGames(filter)}
      </View>
    )
  }
}


export default Games
