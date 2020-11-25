import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Avatar(props) {
  var image = require('../../art/character/Base_1024.png');
  var opac = 1;
  if (props.id > img.length - 1 || props.id < 0) {
    console.log('WARNING: Avatar id error');
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

Avatar.defaultProps = {
  id: 0,
  size: 256
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
  require('../../art/character/Base_1024.png')
]
