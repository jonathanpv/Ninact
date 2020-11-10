// Imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStackScreen from './scenes/RootStackScreen';
import MainTabScreen from './scenes/MainTabScreen';
import firebase from "../src/firebase";
import { createStackNavigator } from '@react-navigation/stack';

// Get the current logged in user. If user logged in: User = User OBJECT else User = null
const user = firebase.auth().currentUser;

// Create navigation stack
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      { user != null ? (  // If user is not null, go directly to homescreen
        <MainTabScreen />
      ):

      // Initial route Route Navigation - First navigates to RootStackScreen
      <Stack.Navigator initialRouteName="start" screenOptions={{headerShown: false}} >
        <Stack.Screen name="start" component={RootStackScreen} options={{ headerTitle: ""}}/>
        <Stack.Screen name="HomeScreen" component={MainTabScreen} options = {{headerTitle: "", headerLeft: null}}/>
      </Stack.Navigator>
    }
    </NavigationContainer>
  );
}
