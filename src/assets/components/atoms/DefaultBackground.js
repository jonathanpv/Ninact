import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ImageBackground,
    Dimensions
} from 'react-native';

export default class DefaultBackground extends React.Component {
  render() {
    var circles = [];
    for ( let i = 0; i < 3; i++) {
      circles.push(
        <View key = {i}>
          <Circle/>
        </View>
      )
    }
    var triangles = [];
    for ( let i = 0; i < 3; i++) {
      triangles.push(
        <View key = {i}>
          <Triangle/>
        </View>
      )
    }

    return (
      <ImageBackground
        source={require('../../art/Default_Background.png')}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0
        }}

        imageStyle={{
          resizeMode: 'cover',
          alignSelf: 'flex-end'
        }}
      >
      {circles}
      {triangles}
      </ImageBackground>
    );
  }
}

class Circle extends React.Component
{
  constructor() {
    super();
    this.state = {
      size: 0,
      color: '#000',
      opacity: 0,
      x: 0,
      y: 0
    }
  }

  InitiateVal()
  {
    this.state.size = Math.floor(Math.random() * 400) + 150;
    Math.random();
    this.state.x = Math.floor(Math.random() * Dimensions.get('window').width);
    Math.random();
    this.state.y = Math.floor(Math.random() * Dimensions.get('window').height);
    Math.random();
    this.state.opacity = (Math.random() * 0.25) + 0.05;
    Math.random();
    this.state.color = colors[Math.floor(Math.random() * 3)];
  }

  DisplayCircle() {
    if ( this.state.size == 0 )
    {
      this.InitiateVal();
    }
    return(
    <View style={{
      width: this.state.size,
      height: this.state.size,
      position: 'absolute',
      top: this.state.y,
      left: this.state.x,
      borderRadius: this.state.size/2,
      backgroundColor: this.state.color,
      opacity: this.state.opacity
    }}>
    </View>
    );
  }

  render() {
    return (this.DisplayCircle());
  }
}

class Triangle extends React.Component
{
  constructor() {
    super();
    this.state = {
      size: 0,
      color: '#000',
      opacity: 0,
      x: 0,
      y: 0
    }
  }

  InitiateVal()
  {
    Math.random();
    this.state.size = Math.floor(Math.random() * 300) + 180;
    Math.random();
    this.state.x = Math.floor(Math.random() * Dimensions.get('window').width);
    Math.random();
    this.state.y = Math.floor(Math.random() * Dimensions.get('window').height);
    Math.random();
    this.state.opacity = (Math.random() * 0.25) + 0.05;
    Math.random();
    this.state.color = colors[Math.floor(Math.random() * 3)];
  }

  DisplayTriangle() {
    if ( this.state.size == 0 )
    {
      this.InitiateVal();
    }
    return(
    <View style={{
      width: 0,
      height: 0,
      position: 'absolute',
      top: this.state.y,
      left: this.state.x,
      borderStyle: 'solid',
      borderLeftWidth: this.state.size/2,
      borderRightWidth: this.state.size/2,
      borderBottomWidth: this.state.size,
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: this.state.color,
      opacity: this.state.opacity
    }}>
    </View>
    );
  }

  render() {
    return (this.DisplayTriangle());
  }
}
const colors=[
  '#80ecd8',
  '#8fcfe3',
  '#e0e0e0'
]
