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
        <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.goBack()}>
          <Image source={require("../src/assets/art/navigation/Back_Button.png")} style={styles.img}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  view:
  {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  img:
  {
    width: 60,
    height: 60,
    resizeMode: 'contain',
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
    top: 16,
    fontWeight: 'bold',
    fontFamily: 'Cochin Bold',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
})
