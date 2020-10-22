/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Page</Text>
            <Text>Not implemented</Text>
            <View style={{ paddingBottom: 50, width: 100}}>
                    <Button
                        title="Back"
                        onPress={() => navigation.navigate('HomeScreen')}
                        color="#8E97FD"
                    />
            </View>
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