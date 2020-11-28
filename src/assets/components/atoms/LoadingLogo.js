import React from 'react';
import { Image, StyleSheet, View, Animated } from 'react-native';

export default function LoadingLogo(props) {
  var image = require('../../applogo.png');

  let opac = new Animated.Value(1);
  Animated.loop(
    Animated.sequence([
      Animated.timing(
        opac,
        {
          toValue: 0.3,
          duration: 2500
        }
      ),
      Animated.timing(
        opac,
        {
          toValue: 1,
          duration: 2500
        }
      )
    ])
  ).start();

  return (
    <View style={styles.container} >
      <Animated.Image
        source={image}
        style={{
          width: props.size,
          height: props.size,
          opacity: opac
        }}
      />
    </View>
  );
}

LoadingLogo.defaultProps = {
  size: 360
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
});
