import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import fire from "../firebase";
import "firebase/firestore"; //importing firestor
import HomeScreen from "./HomeScreen";
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'

export default class loginScreen extends Component {
  state = {
    email: "",
    password: "",
    message: "",
    visibile: true,
  };

  login = () => {
    const { navigation } = this.props;
    console.log("got here");
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
        console.log("success!");

        navigation.navigate("HomeScreen");
        console.log(u.user.uid);
      })
      .catch((err) => {
        this.setState({ message: "Invalid Login Credentials" });
        console.log(err);
      });
  };

  btnpress = () => {
    // fire.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       console.log('user logged')
    //     }
    //  });
    // console.log("got to btnpress");
    //console.log(this.state.email);
    if (this.state.email == "" || this.state.password == "")
      return this.setState({ message: "Some fields are empty" });
    if (this.state.email.search("@") == -1)
      return this.setState({ message: "Invalid email" });
    else {
      {
        this.login();
      }
    }
  };
  onFocus() {
    this.setState({
      borderColor: "#B4B2DF",
    });
  }
  onBlur() {
    this.setState({
      borderColor: "#B4B2DF",
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <DefaultBackground />
        <View styles={{flex:1}}>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#fff"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ email: val })}
            //leftIcon={<Icon name="user" size={24} color="white" />}
          />
          <TextInput
            type="password"
            onFocus={() => this.onFocus()}
            onBlur={() => this.onBlur()}
            placeholder="Enter your password"
            placeholderTextColor="#fff"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ password: val })}
            secureTextEntry={this.state.visibile}
            //leftIcon={<Icon name="lock" size={24} color="white" />}
            //rightIcon ={<Icon name ="eye" size={24} color="white"onPress={() => {
            //  if (!this.state.visibile) {
            //    return this.setState({ visibile: true });
            //  } else {
            //    return this.setState({ visibile: false });
            //  }}}/>}
          />
          <View styles={{ flexDirection: 'row'}}>
            <DefaultButton
              text="Sign In"
              onPress={() => this.btnpress()}
            />
            <DefaultButton
              text="Sign Up"
              onPress={() => this.props.navigation.navigate("signUp")}
            />
          </View>

          <DefaultButton
            text='Forgot Password'
            onPress={() => navigation.push("forgotPassword")}
          />
          <Text style={{
            fontSize: 18,
            color: "#9134C3",
            alignContent: "center"
            }}
          >
          {this.state.message}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent",
    flex: 1
  },
  txtInput: {
    margin: 15,
    backgroundColor: "#ffff",
    height: 40,
    width: 290,
    borderRadius: 5
  }
});
