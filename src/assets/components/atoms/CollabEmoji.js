import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function CollabEmoji(props) {
  let image = require('../../art/emoji/Amazed.png');
  let opac = 1;
  if (props.id > img.length - 1 || props.id < 0) {
    console.log('WARNING: CollabEmoji id error');
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

CollabEmoji.defaultProps = {
  id: -1,
  size: 128
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "col",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});

const img = [
  require('../../art/emoji/Amazed.png'),
  require('../../art/emoji/Baby.png'),
  require('../../art/emoji/Begging.png'),
  require('../../art/emoji/Cool.png'),
  require('../../art/emoji/Excited.png'),
  require('../../art/emoji/Expecting.png'),
  require('../../art/emoji/Satisfied.png'),
  require('../../art/emoji/Silly.png')
]
