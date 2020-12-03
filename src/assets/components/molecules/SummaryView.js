import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Avatar from '../atoms/Avatar.js';

export default function SummaryView(props) {
  var msg = (props.val < 0) ?
    <Text style={styles.text}>You Lost</Text>:
    <Text style={styles.text}>You Won!</Text>;

  return (
    <View style={styles.container}>
      {msg}
      <Text style={styles.text}>{props.val} Points!</Text>
      <Avatar id={props.avatar}/>
    </View>
  );
}

SummaryView.defaultProps = {
  avatar: 0,
  val: 0
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  subcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10
  },
  text: {
    fontSize: 40,
    color: '#000000',
  }
});
