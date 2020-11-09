import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';

export default class DefaultBackground extends React.Component
{
  render()
  {
    return (
      <Image
        source={require('../../art/Default_Background.png')}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          position: 'absolute',
        }}

        imageStyle={{
          resizeMode: 'cover',
          alignSelf: 'flex-end'
        }}
      />
    )
  }
}

//Wanted random shapes to appear but oh well
const styles= StyleSheet.create({
  circle: {
      width: 100,
      height: 100,
      borderRadius: 100/2,
      backgroundColor: '#8fcfe3'
  }
})
