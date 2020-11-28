// Imports
import React from 'react';
import { Text, Image,View, StyleSheet, Animated } from 'react-native';
import fire from "../firebase";
import { Component } from 'react';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'

class ProgressBar extends Component {

  // Method to check useState progress will mount
  UNSAFE_componentWillMount() {
    this.animation = new Animated.Value
    (this.props.progress)
  }

  // Method to check useState progress did mount
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.progress != this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration,
        useNativeDriver: false
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
  height: 30,
  backgroundColor: "#ffff",
  barColor: "#80ecd8",
  fillColor: "#ffff",
  duration: 30
}

export default class splashScreen extends Component {

  state = {
    progress: 0,
  };

  // Increase progress state variable here to avoid memory leak
  componentDidMount() {
    setInterval(() => {
      if(this.state.progress < 100) {
        this.setState(state => ({
          progress: state.progress + 1,
        }));
      }
    }, 30);
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
    let set;
    if (this.state.progress >= 100)
    {
      temp = <DefaultButton text='Start' onPress={()=>this.start()} />;
      set = StyleSheet.create({default: {alignItems: 'center', width: '75%', height: 75}})
    }
    else
    {
      temp = <ProgressBar progress={this.state.progress} duration={100}/>;
      set = StyleSheet.create({default: {width: '75%', height: 75}})
    }
    return (
      <View style={styles.container}>
        <DefaultBackground />
        <Image
          source={require('../assets/applogo.png' )}
          style={{width: 350, height: 350}}
        />
        <View style={set.default}>
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
