import React from 'react';
import { View, StyleSheet } from 'react-native';
import Avatar from '../atoms/Avatar.js';
import CheatEmoji from '../atoms/CheatEmoji.js';
import CollabEmoji from '../atoms/CollabEmoji.js';
import PointInc from '../atoms/PointInc.js';
import Action from '../atoms/Action.js'

export default function GuestGameView(props) {
  var emoji = <CollabEmoji id={-1} />;
  if (props.choice == 1) {
    Math.random();
    emoji = <CollabEmoji id={Math.floor(Math.random() * 8)} />;
  } else if (props.choice == 2) {
    Math.random();
    emoji = <CheatEmoji id={Math.floor(Math.random() * 8)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <PointInc val={props.val} inc={props.inc} />
        <Action id={props.choice} />
      </View>

      <View style={styles.subcontainer}>
        {emoji}
        <Avatar id={props.avatar} />
      </View>
    </View>
  );
}

GuestGameView.defaultProps = {
  choice: 0,
  avatar: 0,
  val: 0,
  inc: 0
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20
  }
});
