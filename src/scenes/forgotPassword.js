


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
                    source={require('../assets/applogo.png' )}
                    style={{ width: 250, height: 250 }}
                />
                

                <TextInput
                    type="email"
                    placeholder="Enter your email*"
                    placeholderTextColor="#9134C3"
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
                        color="#9134C3"
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
                <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                        <Button
                            title="Back"
                            onPress={() => navigation.navigate('loginScreen')}
                            color="#9134C3"
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
        backgroundColor: "#B4B2DF",
        flex: 1,
    },
    txtInput: {
        borderWidth: 1,
        borderColor:"gold",
        backgroundColor: "#B4B2DF",
        height: 45,
        width: 290,
        marginVertical: 15,
        borderRadius: 15,
        
    },
});
