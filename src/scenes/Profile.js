/* eslint-disable react/prop-types */
import React from 'react';
//import CardView from 'react-native-cardview';
import { Card,Button } from 'react-native-elements';


import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { View, Text, StyleSheet, Image, ListItem} from 'react-native';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'

//ID is used by List (Error: no key prop fix)
const DATA = [
    {
        username: 'Anubhav',
        title:"Personal Information",
        id: '0'
    },
    {
        title:"Game Stats",
        username:"Hours Logged: 10000",
        id: '1'
    },
    {
        title: 'Rank',
        username:'1',
        id: '2'
    },
    {
        title: 'Points',
        username:'1000',
        id: '3'
    }
    ]


const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <DefaultBackground/>
            <View style={{alignSelf: 'center', margin: 25}}>
              <Image
                source={require('../assets/art/character/Base_1024.png' )}
                style={{width: 128, height: 128}}
              />
            </View>
            <FlatList
              data={DATA}
              renderItem={
                ({item}) => <Card style={styles.cardstyle} cardBody>
                    <Card.Title> {item.title} </Card.Title>
                    <Card.Divider />
                    <Text>{item.username}</Text>
                </Card>
              }
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
        backgroundColor: "transparent",
        height:"100%",
        width :"100%"
    },
    scroll :{
        margin: 20,
        backgroundColor: "#B4B2DF"

    },
    cardstyle:{
        backgroundColor:"#B4B2DF",
        height:"100%",
        width:"100%"

    },
    text: {
        fontSize: 50
    }
});

export default Profile;
