// Imports
import { firestore } from 'firebase';
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,  StatusBar, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DefaultBackground from '../assets/components/atoms/DefaultBackground';
import firebase from '../firebase';


let DATA = [];
firestore()
  .collection('leaderboard')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);
    querySnapshot.forEach(documentSnapshot => {
        
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //   firebase.firestore()
    //     .collection("user")
    //     .doc(firebase.auth().currentUser.uid.toString())
    //     .get()
    //     .then(doc1 => {
    //         console.log(doc1.data());
    //         dbImage = doc1.data().imageuri;
    //   });

    // Pull the leaderboard info from DB and create/store into obj to push it into DATA array
    // obj = {id: ..., username: ...., score: ....}
    const obj = {id: documentSnapshot.id, username: documentSnapshot.data().name, score: documentSnapshot.data().score, image: require('../assets/avatar.png')};
    console.log(obj);
    // Push the object into the DATA array
    DATA.push(obj);
    // Sort the DATA array using a comparator
    sortData();
    // Sorted DATA array limited to only 5 records (slice)
    DATA = DATA.slice(0, 5);
    });
});

// Comparator to sort the DATA array of list based on the score. (Higher to Lower)
const sortData = () => {
    DATA.sort((a, b) => { return b.score - a.score; })
}

// Leaderboard component creation
const LeaderBoard = () => {
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <Text style={styles.title}>
                <Image source={item.image} style={{width: 30, height: 30}} />
                <Text style={styles.nameStyle}>Name: {item.username} <br/></Text> 
                <Text style={styles.scoreStyle}>Score: {item.score} </Text>
            </Text>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 3,
                }}
        />
        </View>
    );

    return (
        <View style={styles.container} >
            <Text style={styles.heading}>LeaderBoard</Text>
            <Text style={styles.textBelowHeading}>Top 5 Players</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
            />
      </View>
    );
};

// Stylesheet needed for Leaderboard design
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    container2: {
        flex: 1,
        margin: 20,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 0,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
    },
    heading: {
        fontSize: 30,
        textAlign: "center",
        justifyContent: "center",
    },
    textBelowHeading: {
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
    },
    nameStyle: {
        //Insert name style here
    },
    scoreStyle: {
        marginLeft: 30
    }
});

export default LeaderBoard;