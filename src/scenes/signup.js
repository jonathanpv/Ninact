//@flow
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Fontisto";
import Icon2 from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import fire from "../firebase";
import "firebase/firestore"; //importing firebase components
import DefaultBackground from "../assets/components/atoms/DefaultBackground.js";
import DefaultButton from "../assets/components/atoms/DefaultButton.js";
import BackButton from "../assets/components/atoms/BackButton.js";
import { ScrollView } from "react-native-gesture-handler";
//import { Thumbnail } from "native-base";

export default class signup extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    message: "",
    visibile: true,
    firstName: "",
    lastName: "",
    username: "",
    imageuri: null,
  };

  login = () => {
    var uid;
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        fire
          .firestore()
          .collection("user")
          .doc(fire.auth().currentUser.uid.toString())
          .set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            imageuri: this.state.imageuri,
            email: this.state.email,
          });
        uid = fire.auth().currentUser.uid;
      })
      .then(() => {
        fire.database().ref(`/users/${uid}/`).set({
            username: this.state.username,
            points: 0
          });
        console.log("USER CREATED");
      });

  };
  profilepicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    console.log("got here pp");
    if (!result.canclled) {
      this.setState({
        imageuri: result.uri,
      });
    }
  };
  sendBack = () => {
    this.props.navigation.navigate("loginScreen");
  };

  btnpress = () => {
    console.log("got to btnpress");
    console.log("here" + this.state.message);
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.password2 == "" ||
      this.state.firstName == "" ||
      this.state.lastName == "" ||
      this.state.username == ""
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <DefaultBackground />
          <View style={{ height: 40 }}></View>
          <View style={{ flex: 2, flexDirection: "column" }}>
            <View style={{ flex: 3 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("loginScreen")}
              >
                <Image
                  source={require("../assets/art/navigation/Back_Button.png")}
                  style={styles.img}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{ flexDirection: "column", flex: 3, alignItems: "center" }}
            >
                 <Image style={styles.image}
                   source={{
            uri: this.state.imageuri
              ? this.state.imageuri
              : "https://fpcnh.org/wp-content/uploads/2019/03/person-head-icon-10.png",
          }}
        />
              <Text style={{ color: "blue" }} onPress={this.profilepicture}>
                Upload
              </Text>
            </View>
          </View>
          <View style={styles.container}>
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
              placeholder="Username*"
              placeholderTextColor="#808080"
              style={styles.txtInput}
              onChangeText={(val) => this.setState({ username: val })}
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

            <DefaultButton text="Sign Up" onPress={() => this.btnpress()} />
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 8,
    paddingHorizontal: "10%",
    justifyContent:"center"
  },
  txtInput: {
    borderRadius: 15,
  },
  view: {
    margin: 20,
    width: "30%",
    height: 60,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,

  }
});
