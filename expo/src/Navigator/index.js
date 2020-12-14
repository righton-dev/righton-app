import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OnboardAppRouter from '../screens/OnboardAppRouter'
// import OnboardTeacherRouter from '../screens/OnboardTeacherRouter';
import StudentFirst from '../Student/screens/StudentFirst'
import StudentChooseTeam from '../Student/screens/StudentChooseTeam'
import StudentGameIntro from '../Student/screens/StudentGameIntro'
import PregameCountDown from '../Student/screens/PregameCountDown'
import GamePreview from '../Student/screens/Game/GamePreview'
import TeamInfo from '../Student/screens/Game/GamePlay/TeamInfo'
import GamePlay from '../Student/screens/Game/GamePlay'
import GameAnswerReview from '../Student/screens/Game/GameAnswer/Review'
import GameAnswerPopular from '../Student/screens/Game/GameAnswer/Popular'
// import OnboardAccount from '../screens/OnboardAccount';
// import StudentApp from '../Student';
import TeacherApp from '../Teacher';
// import TeacherGameRoom from '../Teacher/screens/GameRoom';
// import TeacherProfile from '../Teacher/screens/TeacherProfile';
import GameDetailsScreen from '../Teacher/screens/Explore/GameDetails'

const Stack = createStackNavigator();

const AppContainer = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardAppRouter" screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="OnboardAppRouter" component={OnboardAppRouter} />
        <Stack.Screen name="StudentFirst" component={StudentFirst} />
        <Stack.Screen name="StudentChooseTeam" component={StudentChooseTeam} />
        <Stack.Screen name="TeacherApp" component={TeacherApp} />
        <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
        <Stack.Screen name="StudentGameIntro" component={StudentGameIntro} />
        <Stack.Screen name="PregameCountDown" component={PregameCountDown} />
        <Stack.Screen name="GamePreview" component={GamePreview} />
        <Stack.Screen name="GamePlay" component={GamePlay} />
        <Stack.Screen name="TeamInfo" component={TeamInfo} />
        <Stack.Screen name="GameAnswerReview" component={GameAnswerReview} />
        <Stack.Screen name="GameAnswerPopular" component={GameAnswerPopular} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;

// /**
//  * A duo account type front facing screen directly after the Splash screen
//  * that displays if the user has not accessed the application before.
//  * 
//  * Helps navigate teacher/student into their respective application interfaces
//  * and sets the deviceSettings for future streamlined access.
//  */
// OnboardAppRouter: {
//   screen: props => (
//     <OnboardAppRouter
//       navigation={props.navigation}
//       screenProps={{
//         handleSetAppState: props.screenProps.handleSetAppState,
//       }}
//     />
//   ),
//     navigationOptions: {
//     header: null,
//     },
// },


// /**
//  * A screen for specifically onboarding teachers with slides to educate
//  * them about RightOn and also to provide options for login/signup/maybe later.
//  */
// OnboardTeacherRouter: {
//   screen: (props) => {
//     const { navigation, screenProps } = props;

//     return (
//       <OnboardTeacherRouter
//         navigation={navigation}
//         screenProps={{
//           handleSetAppState: screenProps.handleSetAppState,
//         }}
//       />
//     );
//   },
//     navigationOptions: {
//     header: null,
//     },
// },


// /**
//  * A duo account type onboarding TabNavigator for login/signup.
//  * Serves creating both teacher and student accounts.
//  */
// OnboardAccount: {
//   screen: OnboardAccount,
//     navigationOptions: {
//     header: null,
//     },
// },


// /**
//  * A fast-tracked student game joining shell to immediately route
//  * students into a game if one is being hosted by the teacher.
//  */
// StudentFirst: {
//   screen: (props) => {
//     const { navigation, screenProps } = props;

//     return (
//       <StudentFirst
//         navigation={navigation}
//         screenProps={{
//           handleSetAppState: screenProps.handleSetAppState,
//           IOTUnsubscribeFromTopic: screenProps.IOTUnsubscribeFromTopic,
//           IOTSubscribeToTopic: screenProps.IOTSubscribeToTopic,
//         }}
//       />
//     );
//   },
//     navigationOptions: {
//     header: null,
//     },
// },

// /**
//  * The main student application screen which encapsulates the GameRoom screens
//  * for the student RightOn experience. 
//  */
// StudentApp: {
//   screen: StudentApp,
//     navigationOptions: {
//     header: null,
//     },
// },


// /**
//  * The TabNavigation experience of the Teacher for view/creating/launching games
//  * and access to QuizMaker and Reports.
//  */
// TeacherApp: {
//   screen: TeacherApp,
//     navigationOptions: {
//     header: null,
//     },
// },


// /**
//  * Separate GameRoom screen which switches between rendering the various game
//  * screens for the teacher RightOn experience.
//  */
// TeacherGameRoom: {
//   screen: (props) => {
//     const { navigation, screenProps } = props;
//     return (
//       <TeacherGameRoom
//         screenProps={{
//           account: screenProps.account,
//           GameRoomID: screenProps.GameRoomID,
//           gameState: screenProps.gameState,
//           handleSetAppState: screenProps.handleSetAppState,
//           IOTPublishMessage: screenProps.IOTPublishMessage,
//           IOTUnsubscribeFromTopic: screenProps.IOTUnsubscribeFromTopic,
//           navigation,
//           players: screenProps.players,
//         }}
//       />
//     );
//   },
//     navigationOptions: {
//     header: null,
//     },
// },


// /**
//  * A separated screen for accessing teacher profile/account settings.
//  */
// TeacherProfile: {
//   screen: (props) => {
//     const { navigation, screenProps } = props;
//     return (
//       <TeacherProfile
//         navigation={navigation}
//         screenProps={{
//           account: screenProps.account,
//           doSignOut: screenProps.doSignOut,
//           handleSetAppState: screenProps.handleSetAppState,
//         }}
//       />
//     );
//   },
//     navigationOptions: {
//     header: null,
//     },
// },


// }