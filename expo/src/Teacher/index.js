/* eslint react/prop-types: 0 */

import React from 'react'
import { Platform, Image, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ExploreStackScreen from './screens/Explore'
import { colors } from '../utils/theme'
import { HeaderTitle } from '@react-navigation/stack'


const Tab = createBottomTabNavigator()

const TeacherApp = ({ props, navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName

          if (route.name === 'Explore') {
            iconName = focused ? require('./../assets/images/explore_selected.png') : require('./../assets/images/explore.png')
          } else if (route.name === 'My Games') {
            iconName = focused ? require('./../assets/images/mygames_selected.png') : require('./../assets/images/mygames.png')
          } else if (route.name === 'Quiz Maker') {
            iconName = focused ? require('./../assets/images/quizmaker_selected.png') : require('./../assets/images/quizmaker.png')
          } else if (route.name === 'Reports') {
            iconName = focused ? require('./../assets/images/reports_selected.png') : require('./../assets/images/reports.png')
          }
          return <Image source={iconName} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#85C6FF',
        style: { backgroundColor: '#043272' }
      }}
    >
      <Tab.Screen name="Explore" component={ExploreStackScreen} navigation={navigation} />
      <Tab.Screen name="My Games" component={ExploreStackScreen} />
      <Tab.Screen name="Quiz Maker" component={ExploreStackScreen} />
      <Tab.Screen name="Reports" component={ExploreStackScreen} />
    </Tab.Navigator>
  )
}

export default TeacherApp

// const TeacherTabNavigator = createBottomTabNavigator({


//   Explore: {
//     screen: (props) => {
//       const { screenProps } = props;

//       return (
//         <Explore {...screenProps} />
//       );
//     },
//     navigationOptions: {
//       tabBarLabel: 'Explore',
//       tabBarIcon: ({ tintColor }) => <TabBarComponent icon={'search'} tintColor={tintColor} label={'Explore'} />,
//     },
//   },

//   Games: {
//     screen: (props) => {
//       const { navigation, screenProps } = props;

//       return (
//         <Games navigation={navigation} {...screenProps} />
//       );
//     },
//     navigationOptions: {
//       tabBarLabel: 'My Games',
//       tabBarIcon: ({ tintColor }) => <TabBarComponent icon={'database'} tintColor={tintColor} label={'My Games'} />,
//     },
//   },


//   QuizMaker: {
//     screen: (props) => {
//       const { screenProps } = props;

//       return (
//         <QuizMaker {...screenProps} />
//       );
//     },
//     navigationOptions: {
//       tabBarLabel: 'Quiz Maker',
//       tabBarIcon: ({ tintColor }) => <TabBarComponent icon={'puzzle-piece'} tintColor={tintColor} label={'Quiz Maker'} />,
//     },
//   },


//   Reports: {
//     screen: (props) => {
//       const { screenProps } = props;

//       return (
//         <Reports {...screenProps} />
//       );
//     },
//     navigationOptions: {
//       tabBarLabel: 'Reports',
//       tabBarIcon: ({ tintColor }) => <TabBarComponent icon={'bar-chart'} tintColor={tintColor} label={'Reports'} />
//     },
//   },


// }, {
//   animationEnabled: true,
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     activeTintColor: colors.white,
//     inactiveTintColor: colors.dark,
//     iconStyle: {
//       padding: 0,
//     },
//     labelStyle: {
//       fontSize: moderateScale(12, 0.2),
//       margin: 0,
//       padding: 0,
//     },
//     tabStyle: {
//       alignItems: 'center',
//       backgroundColor: colors.primary,
//       borderTopWidth: 0.5,
//       borderTopColor: '#ededed',
//       flex: 1,
//     },
//     showIcon: true,
//     showLabel: Platform.OS !== 'ios',
//     style: {
//       justifyContent: 'center',
//       height: verticalScale(55),
//     },
//     swipeEnabled: false,
//   },
// });


// class TeacherApp extends React.Component {
//   static router = TeacherTabNavigator.router;

//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//   }


//   render() {
//     const { navigation, screenProps } = this.props;

//     return (
//       <TeacherTabNavigator
//         navigation={navigation}
//         screenProps={{ ...this.props, ...screenProps }}
//       />
//     );
//   }
// }


// export default TeacherApp;
