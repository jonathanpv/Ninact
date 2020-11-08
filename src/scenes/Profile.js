/* eslint-disable react/prop-types */
import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';

const Profile = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Page</Text>
           <View>

           </View>
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B4B2DF",
        flex: 1,
    },
    text: {
        fontSize: 50
    }
});

export default Profile;