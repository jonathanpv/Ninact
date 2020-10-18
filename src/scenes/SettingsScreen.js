/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from "../firebase";

const SettingsScreen = ({ navigation} ) => {
    return (
        <View>
            <View>
                <Text>Username: put user.name</Text>
                <Text>Password: put user.password</Text>
            </View>
            <View style={styles.button}>
                <View style={{ paddingBottom: 50, width: 200}}>
                    <Button
                        title="Return to Home"
                        onPress={() => navigation.navigate('HomeScreen')}
                        color="#8E97FD"
                    />
                </View>
                <View>
                    <Button
                        title="Sign Out"
                        color="#8E97FD"
                    />
                </View>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 300
    }
});

export default SettingsScreen;