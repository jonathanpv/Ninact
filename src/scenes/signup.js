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

export default class signup extends Component {


    state = {
        email: "",
        password: "",
        password2: "",
        message: "",
        x:"",
    };

    login = () => {

        fire        //THIS IS THE FIREBASE config code. The caps are to get your attention. This fire function is imported from firebase.js where the config from our
                    //firebase acount . the . auth function and createUserWithEmailAndPassword are library functions of firebase .
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log(u.message);
                
                this.setState({ message: u.message})
                this.props.navigator.navigate({HomeScreen})

            })
            .catch((err) => {           
                console.log(err)
                this.setState({message:err.message})

                //this.setState({ message: "Something's Not Right"})

             
            })


    };

    btnpress = () => {
        console.log("got to btnpress")
        console.log(this.state.email)
        console.log(this.state.password)
        console.log(this.state.password2)
       
        if (this.state.email == "" || this.state.password == "" || this.state.password2 == "") 
            return this.setState({ message: "Some Fields are Empty" });
       else  if (this.state.email.search("@") == -1)
            return (
                this.setState({ message: "Inavlid Email" })
            );
        else if (this.state.password != this.state.password2) {
            this.setState({ message: "Password Doesnot Match" })
        }

        else {
            { this.login() }
        }
    };

    render() {

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
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>React Native</Text>

                    <TextInput
                        type="email"
                        placeholder="Enter your email"
                        style={styles.txtInput}
                        onChangeText={(val) => this.setState({ email: val })}
                        keyboardType="email-address"
                    />
                    <TextInput
                        type="password"
                        placeholder="Enter your password"
                        style={styles.txtInput}
                        onChangeText={(val) => this.setState({ password: val })}
                        secureTextEntry={true}

                    />
                    <TextInput
                        type="password"
                        placeholder="Confirm your password"
                        style={styles.txtInput}
                        onChangeText={(val) => this.setState({ password2: val })}
                        secureTextEntry={true}

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
                            title="Signup"
                            onPress={() => this.btnpress()}
                            color="black"
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
                                color: 'red',
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
        backgroundColor: "white",
        flex: 1,
    },
    txtInput: {
        borderWidth: 2,
        backgroundColor: "#F6FCFB",
        height: 45,
        width: 290,
        marginVertical: 10,
        borderRadius: 3,
    },
});
