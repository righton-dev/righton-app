import React, { Fragment, useState, useEffect } from 'react'
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { scale, ScaledSheet } from 'react-native-size-matters'
import { colors, deviceWidth, fonts, fontFamilies } from '../../../utils/theme'
import debug from '../../../utils/debug'
import NavBarView from './NavBarView'
import ContentItem from './ContentItem'
import { createStackNavigator } from '@react-navigation/stack'
import { listGames } from '../../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import { FlatList } from 'react-native-gesture-handler'
// import API from '../../../backend'

const ExploreStack = createStackNavigator()

const ExploreStackScreen = () => {
  return (
    <ExploreStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <ExploreStack.Screen name="ExploreScreen" component={ExploreScreen} />
    </ExploreStack.Navigator>
  )
}

const ExploreScreen = ({ props, navigation }) => {

  const Mode = {
    loading: 'loading',
    succeeded: 'succeeded',
    failed: 'failed',
  }
  const onGameSelected = () => {
    navigation.navigate("GameDetails")
  }

  const [mode, setMode] = useState(Mode.loading)
  const [games, setGames] = useState([])

  useEffect(() => {
    async function fetchGames() {
      API.graphql(graphqlOperation(listGames)).then(gamesList => {
        setGames(gamesList.data.listGames.items)
        setMode(Mode.succeeded)
      }).catch(error => {
        setMode(Mode.failed)
        console.log(error)
      })
    }

    fetchGames()
  }, [])

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#003668' }} />
      <SafeAreaView style={styles.mainContainer}>
        <NavBarView title="Explore" avatar={require("../../../assets/images/profile.png")} />
        {mode == Mode.loading ? <ActivityIndicator /> : (
          <FlatList
            style={styles.content}
            data={games}
            keyExtractor={({ GameID }, index) => GameID}
            renderItem={({ item }) => (
              <ContentItem category={item.grade || "General"} title={item.title || "No Title"} body={item.description || "No Description"} style={styles.contentItem} onPress={onGameSelected} />
            )}
          />
        )}
      </SafeAreaView>
    </Fragment>
  )
}

export default ExploreStackScreen

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  content: {
    marginTop: 18,
    paddingBottom: 40,
  },
  contentItem: {
    marginStart: 25,
    marginEnd: 25,
    marginBottom: 12
  }
})