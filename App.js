import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text> omegalul but lets see if we can do something</Text>
      <StatusBar style="auto" />
      <Button
        onPress = {() => Alert.alert(":O YOU PUSHED ME!?!?!")}
        title="Press me!!"
        color="#0f0f0f"
        accessibilityLable=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
