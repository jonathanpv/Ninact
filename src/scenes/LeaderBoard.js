// Imports
import { firestore } from 'firebase';
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,  StatusBar, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import DefaultBackground from '../assets/components/atoms/DefaultBackground';
import fire from '../firebase';


let DATA = [];
fire
    .database()
    .ref(`/users`)
    .once('value')
    .then((snapshot) => {
        console.log(snapshot.val());
        let json = snapshot.val()
        let obj = {};
        Object.keys(json).forEach(function(key){
            obj = (json[key]);
            DATA.push(obj)
        })
        sortData();

        DATA = DATA.slice(0, 5)

        console.log(DATA)

    })

// Comparator to sort the DATA array of list based on the score. (Higher to Lower)
const sortData = () => {
    DATA.sort((a, b) => { return b.score - a.score; })
}

// Leaderboard component creation
const LeaderBoard = () => {
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <Text style={styles.title}>
                <Image source={require('../assets/avatar.png')} style={{width: 30, height: 30}} />
                <Text style={styles.nameStyle}>Name: {item.username} <br/></Text> 
                <Text style={styles.scoreStyle}>Score: {item.points} </Text>
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