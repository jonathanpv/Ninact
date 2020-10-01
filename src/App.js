import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import FriendList from './scenes/FriendList';
import HomeScreen from './scenes/HomeScreen';
import LeaderBoard from './scenes/LeaderBoard';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    FriendList: FriendList,
    LeaderBoard: LeaderBoard
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Ninact Home Page"
    }
  }
);
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

export default createAppContainer(navigator);