/* eslint-disable no-empty-pattern */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStackScreen from './scenes/RootStackScreen';
import MainTabScreen from './scenes/MainTabScreen';
import firebase from "../src/firebase";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './scenes/HomeScreen';

const user = firebase.auth().currentUser;
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      { user != null ? (
        <MainTabScreen />
      ):
      <Stack.Navigator initialRouteName="start">
        <Stack.Screen name="start" component={RootStackScreen} options={{ headerTitle: ""}}/>
        <Stack.Screen name="HomeScreen" component={MainTabScreen} options = {{headerTitle: "", headerLeft: null }}/>
      </Stack.Navigator>
    }
    </NavigationContainer>
  );
}
