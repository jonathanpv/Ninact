// Imports
import React, {useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import firebase from '../firebase';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'
import BackButton from '../assets/components/atoms/BackButton.js'

// SettingsScreen component creation
const SettingsScreen = ({ navigation} ) => {
  const [uri, setUri] = useState(null);
  // Get user image from DB
  firebase
    .firestore()
    .collection("user")
    .doc(firebase.auth().currentUser.uid.toString())
    .get()
    .then((doc) => {
      setUri(doc.data().imageuri);
  });

  return(
    <View style={{width: '100%', height: '100%'}}>
    <DefaultBackground/>
    <BackButton onPress={() => {navigation.navigate('HomeScreen')}}/>
      <View style={{alignItems: 'center', justifyContent: 'center',}}>
      <Image style={styles.image}
                   source={{
            uri: uri
              ? uri
              : "https://fpcnh.org/wp-content/uploads/2019/03/person-head-icon-10.png",
          }}
        />
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
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 150 / 2,
      overflow: "hidden",
      borderWidth: 3,
      marginBottom: 10
    }
});

export default SettingsScreen;
