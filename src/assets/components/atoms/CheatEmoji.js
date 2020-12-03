import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function CheatEmoji(props) {
  var image = require('../../art/emoji/Baby.png');
  let opac = 1;
  if (props.id > img.length - 1 || props.id < 0) {
    console.log('WARNING: CheatEmoji id error');
    opac = 0;
  } else { image = img[props.id]; }

  return (
    <View style={styles.container} >
      <Image
        source={image}
        style ={{
          width: props.size,
          height: props.size,
          backgroundColor: 'transparent',
          opacity: opac
        }}
        imageStyle={{
          resizeMode: 'cover'
        }}
      />
    </View>
  );
}

CheatEmoji.defaultProps = {
  id: -1,
  size: 128
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});

const img = [
  require('../../art/emoji/Baby.png'),
  require('../../art/emoji/Bored.png'),
  require('../../art/emoji/Cool.png'),
  require('../../art/emoji/Disinterested.png'),
  require('../../art/emoji/Satisfied.png'),
  require('../../art/emoji/Silly.png'),
  require('../../art/emoji/Sleepy.png'),
  require('../../art/emoji/Tired.png')
]
