/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const SettingsScreen = ({ navigation} ) => {
    return (
        <View>
            <View>
                <Text style={styles.text}>Settings Page text</Text>
                <Text>Not implemented</Text>
            </View>
            <View>
                <Button
                    title="Return to Home"
                    onPress={() => navigation.navigate('HomeScreen')}
                    color="#8E97FD"
                />
            </View>
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