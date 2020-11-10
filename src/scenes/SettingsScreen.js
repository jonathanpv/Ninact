// Imports
import React from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from '../firebase';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'
import BackButton from '../assets/components/atoms/BackButton.js'

// SettingsScreen component creation
const SettingsScreen = ({ navigation} ) => {
  return(
    <View style={{width: '100%', height: '100%'}}>
    <DefaultBackground/>
    <BackButton onPress={() => {navigation.navigate('HomeScreen')}}/>
      <View style={{alignItems: 'center', justifyContent: 'center',}}>

      <DefaultButton
        text='Sign Out'
        onPress={() =>  {
          signOutUser();
          navigation.navigate('loginScreen')
        }}
      />
      </View>
    </View>
  );
};

// Get the current user and sign out the user
const signOutUser = async() => {
    try {
        await firebase.auth().signOut().then(() => console.log('User signed out!'));
    } catch(e) {
        console.log(e);
    }
};

// Stylesheet for Settings screen
const styles = StyleSheet.create({
    text: {
        fontSize: 50
    },
    container: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300
    }
});

export default SettingsScreen;
