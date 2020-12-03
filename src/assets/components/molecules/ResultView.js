import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Avatar from '../atoms/Avatar.js';

export default function ResultView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.text}> {props.uScore}</Text>
        <Avatar id={props.user}/>
      </View>

      <View style={styles.subcontainer}>
        <Text style={styles.text}> {props.gScore}</Text>
        <Avatar id={props.guest}/>
      </View>
    </View>
  );
}

ResultView.defaultProps = {
  user: 0,
  guest: 0,
  uScore: 0,
  gScore: 0
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  subcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20
  },
  text: {
    fontSize: 40,
    color: '#000000',
  }
});
