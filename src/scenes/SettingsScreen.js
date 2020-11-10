/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../firebase';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'
import BackButton from '../assets/components/atoms/BackButton.js'

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

const signOutUser = async() => {
    try {
        await firebase.auth().signOut().then(() => console.log('User signed out!'));
    } catch(e) {
        console.log(e);
    }
};

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
