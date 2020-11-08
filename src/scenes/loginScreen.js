import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  _Image,
  ImageBackground,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import fire from "../firebase";
import "firebase/firestore"; //importing firestor
import HomeScreen from "./HomeScreen";

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
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={require("../assets/applogo.png")}
            style={{ width: 250, height: 250 }}
          />

          <Input
            type="email"
            placeholder="Enter your email"
            placeholderTextColor="#9134C3"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ email: val })}
            keyboardType="email-address"
            leftIcon={<Icon name="user" size={24} color="white" />}
          />
      
            <Input
              type="password"
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
              placeholder="Enter your password"
              placeholderTextColor="#9134C3"
              style={styles.txtInput}
              onChangeText={(val) => this.setState({ password: val })}
              secureTextEntry={this.state.visibile}
              leftIcon={<Icon name="lock" size={24} color="white" />}
              rightIcon ={<Icon name ="eye" size={24} color="white"onPress={() => {
                if (!this.state.visibile) {
                  return this.setState({ visibile: true });
                } else {
                  return this.setState({ visibile: false });
                }
              }}/>}
            />
            
        
          <Button
            title="Sign in"
            onPress={() => this.btnpress()}
        
            type="raised"
           
          />
        </View>
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                color: "blue",
                alignContent: "center",
              }}
              onPress={() => navigation.push("forgotPassword")}
            >
              Forgot Password?{" "}
            </Text>
      
        <View style={{ justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                margin: 15,
                fontSize: 16,
                color: "#9134C3",
                alignContent: "center",
              }}
            >
              {this.state.message}
            </Text>
          </View>
          <Button
            title="Sign Up"
            onPress={() => this.props.navigation.navigate("signUp")}
            color="#9134C3"
            type="raised"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B4B2DF",
    flex: 1,
  },
  txtInput: {
    borderWidth: 0,
    borderColor: "gold",
    backgroundColor: "#B4B2DF",
    height: 45,
    width: 290,
    marginVertical: 15,
    borderRadius: 15,
  },

  iconstyle: {
    width: 45,
    height: 45,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B4B2DF",
    backgroundColor: "#B4B2DF",
    borderRadius: 15,
  },
});
