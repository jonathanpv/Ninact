import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Stack.Navigator initialRouteName="forgotPassword">
      <Stack.Screen name="forgotPassword" component={forgotPassword}/>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Sign Up" component={signup}/>
      <Stack.Screen name="loginScreen" component={loginScreen} />
      <Stack.Screen name="FriendList" component={FriendList} />
      <Stack.Screen name="LeaderBoard" component={LeaderBoard} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          style: { height: 70 },
        }}
        initialRouteName="HomeScreen"
      >
        <Tab.Screen
          name="HomeScreen"
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
          name="PlayRounds"
          component={PlayRounds}
          options={{
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
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
