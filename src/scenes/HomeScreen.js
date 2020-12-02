// Imports
import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
} from "react-native";
import DefaultBackground from "../assets/components/atoms/DefaultBackground.js";
import DefaultButton from '../assets/components/atoms/DefaultButton.js'

import LeaderBoard from './LeaderBoard';
import FriendList from './FriendList';
import fire from "../firebase";
import { ScrollView } from "react-native-gesture-handler";
import Constants from 'expo-constants';
import { firestore } from "firebase";

const userName = '';
// Homescreen component creation
const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState(0);

  firestore()
  .collection('user')
  .doc(fire.auth().currentUser.uid.toString())
  .get()
  .then(u => {
    console.log(u.data().firstName);
    setUserName(u.data().firstName);
  })

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.heading}>Hi { userName }, Welcome Back !</Text>
          <View style={styles.buttonStyle}>
            <DefaultButton
              text='Friend List'
              onPress={() =>  {
                navigation.navigate('FriendList')
              }}
            />
          </View>
        <LeaderBoard />
      </View>
    </ScrollView>
  );
};

// HomeScreen Component StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 25,
    backgroundColor: '#acacac',
    paddingTop: 10
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

export default HomeScreen;
