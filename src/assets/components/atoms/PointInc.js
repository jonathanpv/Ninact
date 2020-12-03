import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

//Animates points being added
export default class PointInc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currVal: this.props.val,
      inc: this.props.inc
    };
  }

/* // For Updating Text fancy :)
  componentDidMount() {
    setInterval(() => {
      if
      this.setState({
        curVal :
      })
    }, 250)
  }*/

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.val != this.props.val || prevProps.inc != this.props.inc){
      this.update();
    }
  }

  update() {
    this.setState({currVal: this.props.val, inc: this.props.inc});
  }

  render() {
    var incText;
    if (this.state.inc < 0) {
      incText = (
        <Text style={{fontSize: 40, color: '#bf0000', textAlign: 'center'}}>
          {this.state.inc}
        </Text>
      );
    }
    else if (this.state.inc > 0) {
      incText = (
        <Text style={{fontSize: 40, color: '#00bf00', textAlign: 'center'}}>
          +{this.state.inc}
        </Text>
      );
    }
    else {
      incText = <Text></Text>;
    }

    return (
      <View style={styles.container}>
        {incText}
        <Text style={{fontSize: 40, color: '#000000'}}>
          Points: {this.state.currVal}
        </Text>
      </View>
    );
  }
}

PointInc.defaultProps = {
  val: 0,
  inc: 0
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }
});
