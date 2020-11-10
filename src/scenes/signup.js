//@flow
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Fontisto";
import Icon2 from "react-native-vector-icons/AntDesign";

import fire from "../firebase";
import "firebase/firestore"; //importing firebase components
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'
import BackButton from '../assets/components/atoms/BackButton.js'

export default class signup extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    message: "",
    visibile: true,
    firstName: "",
    lastName: "",
  };

  login = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        this.setState({
          message: " Email sucessfully Registered please login",
        });
        fire
          .firestore() //using fire.firestore fucntion to get acess to database
          // .collection ("user") is like specifying  table in the database you wanna acess
          .collection("user")
          .doc(fire.auth().currentUser.uid.toString())
          .set({
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
          }); //.set sets he fields that you wanna write to the database.

        this.props.navigation.navigate("loginScreen");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  btnpress = () => {
    console.log("got to btnpress");
    console.log("here" + this.state.message);
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.password2 == "" ||
      this.state.firstName == "" ||
      this.state.lastName == ""
    )
      return this.setState({ message: "Some Fields are Empty" });
    else if (this.state.email.search("@") == -1)
      return this.setState({ message: "Inavlid Email" });
    else if (this.state.password != this.state.password2) {
      this.setState({ message: "Password Does not Match" });
    } else {
      {
        this.login();
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <DefaultBackground />
        <BackButton onPress = {() => this.props.navigation.navigate('loginScreen')}/>
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Input
            placeholder="First Name*"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ lastName: val })}
            placeholderTextColor="#808080"
            leftIcon={<Icon2 name="user" size={24} color="white" />}
          />
          <Input
            placeholder="Last Name*"
            placeholderTextColor="#808080"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ firstName: val })}
            leftIcon={<Icon2 name="user" size={24} color="white" />}
          />
          <Input
            type="email"
            placeholderTextColor="#808080"
            placeholder="Enter your email*"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ email: val })}
            keyboardType="email-address"
            leftIcon={<Icon name="email" size={24} color="white" />}
          />

          <Input
            type="password"
            placeholderTextColor="#808080"
            placeholder="Enter your password*"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ password: val })}
            secureTextEntry={this.state.visibile}
            leftIcon={<Icon2 name="lock" size={24} color="white" />}
            rightIcon={
              <Icon2
                name="eye"
                size={24}
                color="white"
                onPress={() => {
                  if (!this.state.visibile) {
                    return this.setState({ visibile: true });
                  } else {
                    return this.setState({ visibile: false });
                  }
                }}
              />
            }
          />

          <Input
            type="password"
            placeholder="Confirm your password*"
            placeholderTextColor="#808080"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ password2: val })}
            secureTextEntry={this.state.visibile}
            leftIcon={<Icon2 name="lock" size={24} color="white" />}
            rightIcon={
              <Icon2
                name="eye"
                size={24}
                color="white"
                onPress={() => {
                  if (!this.state.visibile) {
                    return this.setState({ visibile: true });
                  } else {
                    return this.setState({ visibile: false });
                  }
                }}
              />
            }
          />

          <DefaultButton
            text="Sign Up"
            onPress={() => this.btnpress()}
          />
          <Text
            style={{
              margin: 15,
              fontSize: 16,
              color: "maroon",
              alignContent: "center",
            }}
          >
            {this.state.message}
          </Text>
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
    backgroundColor: "#fff",
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
