


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
    else {
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
                

                <Input
                    type="email"
                    placeholder="Enter your email*"
                    placeholderTextColor="#9134C3"
                    style={styles.txtInput}
                    onChangeText={(val) => this.setState({ email: val })}
                    keyboardType="email-address"
                    leftIcon={<Icon name="email" size={24} color="white" />}
                />
        <Button
                        title="Reset Password"
                        onPress={() => this.btnpress()}
                        color="#9134C3"
                        type="clear"
                    />
                    
               
            
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
                        style={styles.txtst}
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
                            type="clear"
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
   
        backgroundColor: "#B4B2DF",
        height: 45,
        width: 290,
        marginVertical: 15,
        borderRadius: 15,
        
    },
    txtst:{
        color: "#9134C3",
        margin: 15,
        fontSize: 16,
        
    }
});
