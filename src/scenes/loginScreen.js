import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import fire from "../firebase";
import "firebase/firestore"; // importing firestore
import DefaultBackground from "../assets/components/atoms/DefaultBackground.js";
import DefaultButton from "../assets/components/atoms/DefaultButton.js";

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
        console.log("User from loginScreen" + u);
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
      <SafeAreaView style={{ flex: 1 }}>
         <DefaultBackground />
        <ScrollView contentContainerStyle={{ flex:1}}>
          <View style={{flex:4, alignItems:"center",justifyContent:"flex-end"}}>
            <Image
              style={styles.image}
              source={require("../assets/applogo.png")}
            />
          </View>
          <View style={styles.container}>
          <Input
              //type="email"
              placeholder="Enter your email"
              placeholderTextColor="#808080"
              style={styles.txtInput}
              onChangeText={(val) => this.setState({ email: val })}
              keyboardType="email-address"
              leftIcon={<Icon name="user" size={24} color="white" />}
              />
            <Input
              //type="password"
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
              placeholder="Enter your password"
              placeholderTextColor="#808080"
              style={styles.txtInput}
              onChangeText={(val) => this.setState({ password: val })}
              secureTextEntry={this.state.visibile}
              leftIcon={<Icon name="lock" size={24} color="white" />}
              rightIcon ={<Icon name ="eye" size={24} color="white"onPress={() => {
               if (!this.state.visibile) {
                return this.setState({ visibile: true });
               } else {
                 return this.setState({ visibile: false });
              }}}/>}
            />
             <DefaultButton
              text="Sign In"
              onPress={() => this.btnpress()}
              />
             <DefaultButton
              text='Forgot Password'
              onPress={() => {navigation.push("forgotPassword")}}
              />
            <DefaultButton
              text="Sign Up"
              onPress={() => this.props.navigation.navigate("signUp")}
            />
          <Text style={{
             fontSize: 18,
             color: "#808080",
              alignContent: "center"
              }}
            >
          {this.state.message}
           </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      // <View style={styles.container}>
      //   <DefaultBackground />
      //   <View style={{
      //       alignItems: "center",
      //       justifyContent: "center",
      //       flex: 1
      //     }}
      //   >
      //     <View style={{alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
      //       <TextInput
      //         //type="email"
      //         placeholder="Enter your email"
      //         placeholderTextColor="#808080"
      //         style={styles.txtInput}
      //         onChangeText={(val) => this.setState({ email: val })}
      //         keyboardType="email-address"
      //         leftIcon={<Icon name="user" size={24} color="white" />}
      //         />
      //       <TextInput
      //         //type="password"
      //         onFocus={() => this.onFocus()}
      //         onBlur={() => this.onBlur()}
      //         placeholder="Enter your password"
      //         placeholderTextColor="#808080"
      //         style={styles.txtInput}
      //         onChangeText={(val) => this.setState({ password: val })}
      //         secureTextEntry={this.state.visibile}
      //         //leftIcon={<Icon name="lock" size={24} color="white" />}
      //         //rightIcon ={<Icon name ="eye" size={24} color="white"onPress={() => {
      //         //  if (!this.state.visibile) {
      //         //    return this.setState({ visibile: true });
      //         //  } else {
      //         //    return this.setState({ visibile: false });
      //         //  }}}/>}
      //       />
      //     </View>
      //     <View style={{alignItems: 'center', justifyContent: 'flex-start', flex: 1}}>
      //       <DefaultButton
      //         text="Sign In"
      //         onPress={() => this.btnpress()}
      //         />
      //       <DefaultButton
      //         text='Forgot Password'
      //         onPress={() => {navigation.push("forgotPassword")}}
      //         />
      //       <DefaultButton
      //         text="Sign Up"
      //         onPress={() => this.props.navigation.navigate("signUp")}
      //       />
      //       <Text style={{
      //         fontSize: 18,
      //         color: "#808080",
      //         alignContent: "center"
      //         }}
      //       >
      //     {this.state.message}
      //       </Text>
      //     </View>
      //   </View>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    paddingVertical:"5%",
    paddingHorizontal: "10%",
 alignItems:"center",
  
  },
  txtInput: {
    
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor:"transparent"
  } /*
  iconstyle: {
    width: 45,
    height: 45,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B4B2DF",
    backgroundColor: "transparent",
    borderRadius: 15,
  },*/,
});
