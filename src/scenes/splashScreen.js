import React, {useRef, useState, useEffect} from 'react';
import { Text, Image,View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';
import fire from "../firebase";
import { Component } from 'react';
import { useNavigation } from '@react-navigation/native';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'

class ProgressBar extends Component {

  componentWillMount() {
    this.animation = new Animated.Value
    (this.props.progress)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.progress != this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start();
    }
  }

  render() {
    const {
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor,
      row,
    } = this.props;

    const widthInterpolated = this.animation.interpolate
    ({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    })

    return (
      <View>
        <View style={[{flexDirection: "row", height },
        row ? {flex: 1} : undefined ]}>
          <View style={{ flex: 1, borderColor, borderWidth, borderRadius}}>
            <View
              style={[StyleSheet.absoluteFill, {
              backgroundColor: fillColor }]}
            />
            <Animated.View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: widthInterpolated,
                backgroundColor: barColor
              }}
            />
          </View>
        </View>
      <Text>{`${this.props.progress}%`}</Text>
      </View>
    )
  }
}

ProgressBar.defaultProps = {
  height: 20,

  borderWidth: 1,
  borderRadius: 15,
  borderColor:"#B4B2DF",
  backgroundColor: "#B4B2DF",
  barColor: "#dddfb2",
  fillColor: "#B4B2DF",
  duration: 30
}

export default class splashScreen extends Component {

  state = {
    progress: 0,
  };

  componentDidMount() {
    setInterval(() => {
      if(this.state.progress < 100) {
        this.setState(state => ({
          progress: state.progress + 1,
        }));
      }
    }, 30);
  }

  check() {
    if(this.state.progress >= 100)
    {
      return
        <DefaultButton text='Touch to Start' onPress={this.start()} />
    }
    else
    {
      return
      <ProgressBar
        row
        progress={this.state.progress}
        duration={100}
      />
    }
  }

  start() {
    fire.auth().onAuthStateChanged((user) => {

      if (user) {
        this.props.navigation.navigate('HomeScreen')
      }
      else
      {
        this.props.navigation.navigate('loginScreen')
      }
    });
  }

  render() {
    let temp;
    if (this.state.progress >= 100)
    {
      temp = <DefaultButton text='Touch to Start' onPress={()=>this.start()} />;
    }
    else
    {
      temp = <ProgressBar progress={this.state.progress} duration={100}/>;
    }
    return (
      <View style={styles.container}>
        <DefaultBackground />
        <Image
          source={require('../assets/applogo.png' )}
          style={{width: 350, height: 350}}
        />
        <View style={{width: '75%', height: 75}}>
          {temp}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor:"transparent"
  }
})
