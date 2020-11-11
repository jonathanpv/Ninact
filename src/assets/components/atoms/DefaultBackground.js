import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ImageBackground,
    Dimensions
} from 'react-native';

export default class DefaultBackground extends React.Component
{
  constructor() {
    super();
    this.state = {
      circles: [],
      numCircles: 3,
      triangles: [],
      numTriangles: 3
    }
  }

  CreateCircles() {
    for ( let i = 0; i < this.state.numCircles; i++)
    {
      this.state.circles.push(
        <View key = {i}>
          <Circle/>
        </View>
      )
    }
  }

  CreateTriangles() {
    for ( let i = 0; i < this.state.numTriangles; i++)
    {
      this.state.triangles.push(
        <View key = {i}>
          <Triangle/>
        </View>
      )
    }
  }

  RenderCircles() {
    return this.state.circles.map((data) => {
      return (data.render())
    })
  }

  RenderTriangles(){
    return this.state.triangles.map((data) => {
      return (data.render())
    })
  }

  render()
  {
    if (this.state.circles.length == 0)
      this.CreateCircles();

    if (this.state.triangles.length == 0)
      this.CreateTriangles();

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
        {this.state.circles}
        {this.state.triangles}
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
