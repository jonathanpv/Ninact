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
} from "react-native";
import fire from "../firebase";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Fontisto";
import { createStackNavigator } from '@react-navigation/stack';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'
import BackButton from '../assets/components/atoms/BackButton.js'

export default class forgotPassword extends Component {
  state = {
    email: "",
    password: "",
    message:"",
  };


  btnpress = () => {
    console.log("got to btnpress")
    console.log(this.state.email)
    if (this.state.email == "" ) return this.setState({message:"Please enter an email"});
    if (this.state.email.search("@") == -1)
      return (
        this.setState({message:"Invalid Email"})
      );
    else
    {
      {
            fire.auth().sendPasswordResetEmail(this.state.email)//in this line the email is sent to firebase using this.state.email as a parameter
        .then((u) => {

           this.props.navigation.navigate('loginScreen')

        }).catch((err) => {
            console.log(err)
        })
      }
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{flex:1}}>
        <DefaultBackground/>
        <BackButton onPress = {() => {navigation.navigate('loginScreen')}}/>
        <View style={{
                flex: 1,
                alignItems: "center",
                paddingHorizontal: "10%",
                justifyContent: "space-between",
              }}
        >
          <Image
            source={require('../assets/applogo.png' )}
            style={{ width: 250, height: 250 }}
          />
          <Input
            type="email"
            placeholder="Enter your email"
            placeholderTextColor="#808080"
            style={styles.txtInput}
            onChangeText={(val) => this.setState({ email: val })}
            keyboardType="email-address"
            leftIcon={<Icon name="email" size={24} color="white" />}
          />
          <DefaultButton
            text="Reset Password"
            onPress={() => this.btnpress()}
          />
        </View>
        <View style={{ justifyContent: "space-between" }}>
          <View style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
          >
              <Text style={{color: '#808080', fontSize: 16}}>
                {this.state.message}
              </Text>
              <View style={{
                      width: 100,
                      height: 1,
                      backgroundColor: "lightgrey",
                    }}
              />
            </View>
          </View>
      </SafeAreaView>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    txtInput: {

        backgroundColor: "#fff",
        height: 45,
        width: 290,
        marginVertical: 15,
        borderRadius: 15,

    },
    txtst:{
        color: "#808080",
        margin: 15,
        fontSize: 16,

    }
});
