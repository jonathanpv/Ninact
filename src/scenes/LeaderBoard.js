import React from 'react';
import { View, Text, StyleSheet,  StatusBar, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


// DATA = Sample User data.. 
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        username: 'pele',
        score: 21,
        image: require('../assets/avatar.png')
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        username: 'messi',
        score: 27,
        image: require('../assets/avatar.png')
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        username: 'ronaldo',
        score: 20,
        image: require('../assets/avatar.png')
    },
    {
        id: '58694k0f-3da1-471f-bd96-145571e29d72',
        username: 'neymar',
        score: 20,
        image: require('../assets/avatar.png')
    },
    {
        id: '58694b0f-3da1-471f-bd96-145571e29d72',
        username: 'john cena',
        score: 20,
        image: require('../assets/avatar.png')
    },
  ]

// Comparator to sort the DATA array of list based on the score. (Higher to Lower)
DATA.sort((a, b) => { return b.score - a.score; })

const LeaderBoard = () => {
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <Text style={styles.title}>
                <Image source={item.image} style={{width: 57, height: 57}} />
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
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>LeaderBoard</Text>
            <Text style={styles.textBelowHeading}>Top 5 Players</Text>
            <FlatList
                data={DATA}
                renderItem={renderItem}
            />
      </ScrollView>
    );
};

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
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 20,
    },
    heading: {
        fontSize: 50,
        textAlign: "center",
        justifyContent: "center"
    },
    textBelowHeading: {
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center"
    },
    nameStyle: {
        //Insert name style here
    },
    scoreStyle: {
        marginLeft: 58
    }
});

export default LeaderBoard;