/* eslint-disable react/prop-types */
import React from 'react';
//import CardView from 'react-native-cardview';
import { Card,Button } from 'react-native-elements';


import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { View, Text, StyleSheet,} from 'react-native';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'

const DATA = [
    {

        username: 'Anubhav',
        title:"Personal Information"



    },
    {  title:"Game Stats",
        username:"Hours Logged"

    },
    ]


const Profile = ({ navigation }) => {
    const renderItem = ({ item }) => (
   <View style={styles.container} >

                <Card title= {item.title} style={styles.cardstyle}>

                <Text>Name: {item.username}</Text>
                </Card>


   </View>
    );

    return (
        <View style={styles.container}>
          <DefaultBackground/>
            <ScrollView style={styles.scroll}>
           <FlatList
                data={DATA}
                renderItem={renderItem}
            />

           </ScrollView>
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
