import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Image
} from 'react-native';

//Adjustable text and onPress functionality
export default class DefaultButton extends React.Component
{
  render()
  {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
        <View>
          <Image source={require("../../art/navigation/Default_Button.png")} style={{width: 144, height: 60}}/>
          <Text style={styles.text}>{this.props.text} </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles= StyleSheet.create({
  touchable:
  {
    margin: 8,
    width: 144,
    height: 60
  },
  text:
  {
    fontSize: 16,
    position: 'absolute',
    top: 14,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
})
