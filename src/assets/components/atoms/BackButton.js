import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image
} from 'react-native';

//Requires navigation stack to work
export default class BackButton extends React.Component
{
  render()
  {
    return (
      <View style={styles.view} >
        <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
          <Image source={require("../../art/navigation/Back_Button.png")} style={styles.img}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  view:
  {
    margin: 20,
    width: '100%',
    height: 60,
  },
  img:
  {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  touchable:
  {
    position: 'absolute',
    left: 0
  }
})
