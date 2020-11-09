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
        <View style={styles.view}>
          <Image source={require("../../art/navigation/Default_Button.png")} style={styles.img}/>
          <Text style={styles.text}>{this.props.text} </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles= StyleSheet.create({
  view:
  {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  img:
  {
    width: 144,
    height: 60
  },
  touchable:
  {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:
  {
    flex: 1,
    fontSize: 20,
    position: 'absolute',
    top: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})
