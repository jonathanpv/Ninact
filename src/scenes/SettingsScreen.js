/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';


const SettingsScreen = ({ navigation} ) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Settings Page text</Text>
                <Text>Not implemented</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')} >
             <Image source={require('../assets/backbtn.png')} style={{ width: 90, height: 40.95 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 50
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SettingsScreen;