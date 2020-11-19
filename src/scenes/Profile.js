/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
//import CardView from 'react-native-cardview';
import { Card, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import fire from "../firebase";
import { FlatList, ScrollView } from "react-native-gesture-handler";

import { View, Text, StyleSheet, Image, ListItem } from "react-native";
import DefaultBackground from "../assets/components/atoms/DefaultBackground.js";
import DefaultButton from "../assets/components/atoms/DefaultButton.js";
//import { Thumbnail } from "native-base";

//ID is used by List (Error: no key prop fix)
const DATA = [
  {
    username: "Anubhav",
    title: "Personal Information",
    id: "0",
  },
  {
    title: "Game Stats",
    username: "Hours Logged: 10000",
    id: "1",
  },
  {
    title: "Rank",
    username: "1",
    id: "2",
  },
  {
    title: "Points",
    username: "1000",
    id: "3",
  },
];

const Profile = ({ navigation }) => {
  const [uri, setUri] = useState(null);
  const uploadImage = (x) => {
    console.log(uri);
    fire
      .firestore() //using fire.firestore fucntion to get acess to database
      // .collection ("user") is like specifying  table in the database you wanna acess
      .collection("user")
      .doc(fire.auth().currentUser.uid.toString())
      .update({
        imageuri: x,
      })
      .then(()=>{
          setUri(x);
      }) //.set sets he fields that you wanna write to the database.
  };
  const getImage = () => {
    fire
      .firestore()
      .collection("user")
      .doc(fire.auth().currentUser.uid.toString())
      .get()
      .then((doc) => {
        setUri(doc.data().imageuri);
      });
  };
  const profilepicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
  
      uploadImage(result.uri);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <View style={styles.container}>
      <DefaultBackground />
      <View style={{ alignSelf: "center", margin: 25 }}>
        <Image style={styles.image}
                   source={{
            uri: uri
              ? uri
              : "https://fpcnh.org/wp-content/uploads/2019/03/person-head-icon-10.png",
          }}
        />
      </View>
      <Text onPress={profilepicture}>Upload </Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Card style={styles.cardstyle} cardBody>
            <Card.Title> {item.title} </Card.Title>
            <Card.Divider />
            <Text>{item.username}</Text>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  scroll: {
    margin: 20,
    backgroundColor: "#B4B2DF",
  },
  cardstyle: {
    backgroundColor: "#B4B2DF",
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,

  }

});

export default Profile;
