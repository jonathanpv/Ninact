


import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Button,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
} from "react-native";
import fire from "../firebase";
import { createStackNavigator } from '@react-navigation/stack';

export default class forgotPassword extends Component {
    

    state = {
        email: "",
        password: "",
        message:"",
    };
    forgot=()=>{ //This past of the code is the whole function of this page. The fire.auth function sends firebase the email for password reset 
        fire.auth().sendPasswordResetEmail(this.state.email)//in this line the email is sent to firebase using this.state.email as a parameter 
        .then((u) => {
         
           this.props.navigation.navigate('loginScreen')
     
        }).catch((err) => {
            console.log(err)
        })
        
    };

btnpress = () => {
    console.log("got to btnpress")
    console.log(this.state.email)
    if (this.state.email == "" ) return this.setState({message:"Please enter an email"});
    if (this.state.email.search("@") == -1)
    return (
        this.setState({message:"Invalid Email"})
        );
    else {
        { this.forgot() }
    }
};

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
                    source={{
                        uri: "https://img.icons8.com/plasticine/100/000000/react.png",
                    }}
                    style={{ width: 150, height: 150 }}
                />
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>Login</Text>

                <TextInput
                    type="email"
                    placeholder="Enter your email"
                    style={styles.txtInput}
                    onChangeText={(val) => this.setState({ email: val })}
                    keyboardType="email-address"
                />
        
                <View
                    style={{
                        backgroundColor: "#5897ee",
                        borderRadius: 5,
                        width: 150,
                        marginVertical: 5,
                    }}
                >
                    <Button
                        title="Reset Password"
                        onPress={() => this.btnpress()}
                        color="#8E97FD"
                    />
                </View>
            
            </View>
            <View style={{ justifyContent: "space-between" }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            width: 100,
                            height: 1,
                            backgroundColor: "lightgrey",
                        }}
                    />
                    <Text
                        style={{
                            margin: 15,
                            fontSize: 16,
                        }}
                    >
                        {this.state.message}
            </Text>
                    <View
                        style={{
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#a1bbfd",
        flex: 1,
    },
    txtInput: {
        borderWidth: 2,
        backgroundColor: "#a1bbfd",
        height: 45,
        width: 290,
        marginVertical: 10,
        borderRadius: 3,
    },
});
