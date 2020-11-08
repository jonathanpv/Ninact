import React, {useRef, useState, useEffect} from 'react';
import { Text, Image,View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';
import fire from "../firebase";
import { Component } from 'react';
import { useNavigation } from '@react-navigation/native';

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
    if(this.state.progress >= 100) {
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
}

render() {
  {this.check()}
    return (
      <View style={styles.container}>
     
        <Image

source={require('../assets/applogo.png' )}
style={styles.iconstyle}
/>
      
          
        <View style={styles.progressContainer}>
      
         
          <ProgressBar
            row
            progress={this.state.progress}
            duration={100}
          />
          <Text>{`${this.state.progress}%`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  
  
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 250,
    width:"100%",
    height:"100%",
    backgroundColor:"#B4B2DF"

  },
imagestyle: {
    justifyContent: "center",
    paddingTop: 250,
    width:"100%",
    height:"100%",
    backgroundColor:"#B4B2DF"

  },
  progressContainer: {
    alignItems: "center",
    flexDirection: "row",
    width:"50%",
    height:"50%",
    backgroundColor: "#B4B2DF",
  },
  iconstyle:{
    width: 200,
    height: 200,
    justifyContent:"center",
    borderWidth: 1,
    borderColor:"#B4B2DF",
    backgroundColor: "#B4B2DF",
    borderRadius:15,
}
});

