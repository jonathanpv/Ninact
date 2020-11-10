/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import FriendList from './FriendList';
import HomeScreen from './HomeScreen';
import LeaderBoard from './LeaderBoard';
import PlayRounds from './Play';
import Profile from './Profile';
import SettingsScreen from './SettingsScreen';


const Tab = createBottomTabNavigator();

function getTabBarVisibility(route) {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'loginScreen' || routeName === 'PlayRounds') {
      return false;
    }

    return true;
}

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName = "HomeScreen"
        tabBarOptions={{
          style: { height: 70 }
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route),
            title: '',
            tabBarIcon: ({ }) => {
              return (
                <Image
                  style={{ width: 40, height: 60 }}
                  source={require('../assets/navbar/Home.png')} />
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
                  source={require('../assets/navbar/Play.png')} />
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
                  source={require('../assets/navbar/Profile.png')} />
              );
            },
          }} />
        <Tab.Screen
            name="Settings"
            component={SettingsScreen}
             options={{
                title: '',
                tabBarIcon: ({ }) => {
                return (
                    <Image
                    style={{ width: 57, height: 60 }}
                    source={require('../assets/navbar/settings.png')} />
                );
                },
            }} />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
      <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'transparent'
        },
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen} options = {{ headerTitle: "Home Page" }} />
        <HomeStack.Screen name="FriendList" component={FriendList} options = {{ headerTitle: "FriendList" }} />
        <HomeStack.Screen name="LeaderBoard" component={LeaderBoard} options = {{ headerTitle: "LeaderBoard" }} />
      </HomeStack.Navigator>
);
