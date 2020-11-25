import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Action(props) {
  var image = require('../../art/wrong.png');
  var opac = 1;
  if (props.id == 1) {
    image = img[1];
  } else if (props.id == 2) {
    image = img[0];
  } else {
    opac = 0;
  }

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

Action.defaultProps = {
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
  require('../../art/wrong.png'),
  require('../../art/correct.png')
]
