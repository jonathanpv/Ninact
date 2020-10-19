/* eslint-disable no-empty-pattern */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-duplicate-props */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Image } from 'react-native';

import signup from './scenes/signup';
import loginScreen from './scenes/loginScreen';
import FriendList from './scenes/FriendList';
import HomeScreen from './scenes/HomeScreen';
import LeaderBoard from './scenes/LeaderBoard';
import PlayRounds from './scenes/Play';
import Profile from './scenes/Profile';
import SettingsScreen from './scenes/SettingsScreen';
import forgotPassword from './scenes/forgotPassword';
import splashScreen from './scenes/splashScreen'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getTabBarVisibility(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

  if (routeName === 'loginScreen' || routeName === 'PlayRounds') {
    return false;
  }

  return true;
}

function loginStack() {
  return (
    <Stack.Navigator initialRouteName="loginScreen" options={{headerShown:false}}>
      <Stack.Screen name="loginScreen" component={loginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Sign Up" component={signup} options={{headerShown:false}}/>
      <Stack.Screen name="forgotPassword" component={forgotPassword}options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

function homeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (

    <Stack.Navigator initialRouteName = "loginScreen" options={{headerShown:false}}>
      {/* <Stack.Screen name="splashScreen" component={splashScreen}/> */}
      <Stack.Screen name="loginScreen" component={loginStack}/>
      <Stack.Screen name="HomeScreen" component={homeStack} options = {{ headerTitle: "HomePage", headerLeft: null }}/>
      <Stack.Screen name="FriendList" component={FriendList} options = {{ headerTitle: "FriendList" }}/>
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} options = {{ headerTitle: "LeaderBoard" }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: { height: 70 }
        }}
      >
        <Tab.Screen
          name="loginScreen"
          component={MyTabs}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route),
            title: '',
            tabBarIcon: ({ }) => {
              return (
                <Image
                  style={{ width: 40, height: 60 }}
                  source={require('./assets/navbar/Home.png')} />
              );
            },
          })}
        />
        <Tab.Screen
          name="PlayRounds"
          component={PlayRounds}
          options={{ 
            tabBarVisible: false,
            title: '',
            tabBarIcon: ({ }) => {
              return (
                <Image
                  style={{ width: 27, height: 54 }}
                  source={require('./assets/navbar/Play.png')} />
              );
            },
          }} />
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
          }} />
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
            tabBarVisible : false,
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
