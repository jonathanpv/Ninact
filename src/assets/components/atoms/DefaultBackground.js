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
      numCircles: 5
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

  RenderCircles() {
    return this.state.circles.map((data) => {
      return (data.render())
    })
  }

  render()
  {
    if (this.state.circles.length == 0)
      this.CreateCircles();

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
    this.state.x = Math.floor(Math.random() * Dimensions.get('window').width) - 100;
    this.state.y = Math.floor(Math.random() * Dimensions.get('window').height) - 100;
    this.state.opacity = (Math.random() * 0.3) + 0.1;
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

const colors=[
  '#80ecd8',
  '#8fcfe3',
  '#ffffff',
]

//Wanted random shapes to appear but oh well
const styles= StyleSheet.create({
  circle: {
      width: 100,
      height: 100,
      borderRadius: 100/2,
      backgroundColor: '#8fcfe3'
  }
})
