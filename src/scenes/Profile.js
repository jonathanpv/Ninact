import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Page</Text>
            <Text>Not implemented</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')} >
                <Image source={require('../assets/backbtn.png')} style={{ width: 90, height: 40.95 }} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 50
    }
});

export default Profile;