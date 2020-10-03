import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingsScreen = () => {
    return (
        <View>
            <Text style={styles.text}>Settings Page</Text>
            <Text>Not implemented</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 50
    }
});

export default SettingsScreen;