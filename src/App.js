import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import FriendList from './scenes/FriendList';
import HomeScreen from './scenes/HomeScreen';
import LeaderBoard from './scenes/LeaderBoard';
import Play from './scenes/Play';
import Meditate from './scenes/Meditate';
import Profile from './scenes/Profile';
import SettingsScreen from './scenes/SettingsScreen';

// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     FriendList: FriendList,
//     LeaderBoard: LeaderBoard
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       title: "Ninact Home Page"
//     }
//   }
// );
// function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <Text> omegalul but lets see if we can do something</Text>
//       <StatusBar style="auto" />
//       <Button
//         onPress = {() => Alert.alert(":O YOU PUSHED ME!?!?!")}
//         title="Press me!!"
//         color="#0f0f0f"
//         accessibilityLable=""
//       />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ninact Home Page" component={HomeScreen} />
      <Stack.Screen name="FriendList" component={FriendList} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions = {{
          style: { height: 70 },
      }}>
        <Tab.Screen 
          name="Home" 
          component={MyTabs} 
          options={{
            title: '',
            tabBarIcon: ({ }) => {
              return (
                <Image
                  style={{ width: 40, height: 60 }}
                  source={require('./assets/navbar/Home.png')} />
              );
            },
          }}
        />
        <Tab.Screen 
          name="Meditate" 
          component={Meditate}
          options={{
            title: '',
            tabBarIcon: ({ }) => {
              return (
                <Image
                  style={{ width: 60, height: 54 }}
                  source={require('./assets/navbar/Meditate.png')} />
              );
            },
          }}/>
        <Tab.Screen 
          name="Play" 
          component={Play}
          options={{
            title: '',
            tabBarIcon: ({ }) => {
              return (
                <Image
                  style={{ width: 27, height: 54 }}
                  source={require('./assets/navbar/Play.png')} />
              );
            },
          }}/>
        <Tab.Screen name="Profile" 
          component={Profile}
          options={{
            title: '',
            tabBarIcon: ({ }) => {
              return (
                <Image
                  style={{ width: 25, height: 54 }}
                  source={require('./assets/navbar/Profile.png')} />
              );
            },
          }}/>
        <Tab.Screen name="Settings" 
          component={SettingsScreen} 
          name="Settings"
          options={{
            title: '',
            tabBarIcon: ({ }) => {
              return (
                <Image
                  style={{ width: 57, height: 60 }}
                  source={require('./assets/navbar/settings.png')} />
              );
            },
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}