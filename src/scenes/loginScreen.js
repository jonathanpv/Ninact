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

export default class loginScreen extends Component {
    

    state = {
        email: "",
        password: "",
        message:"Forgot Password",
    };

    login = () => {

        console.log("got here")
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u)
            console.log("success!")
            this.props.navigation.navigate('HomeScreen')
        }).catch((err) => {
            console.log(err)
        })

    };

btnpress = () => {
    // fire.auth().onAuthStateChanged((user) => {
    //     if (user) {
    //       console.log('user logged')
    //     }
    //  });
    console.log("got to btnpress")
    console.log(this.state.email)
    if (this.state.email == "" || this.state.password == "") return console.log("Both Null");
    if (this.state.email.search("@") == -1)
    return (
        this.createThreeButtonAlert()
        );
    else {
        { this.login() }
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
                <TextInput
                    type="password"
                    placeholder="Enter your password"
                    style={styles.txtInput}
                    onChangeText={(val) => this.setState({ password: val })}
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
                        title="Sign in"
                        onPress={() => this.btnpress()}
                        color="#8E97FD"
                    />
                </View>
                <View
                        style={{
                            backgroundColor: "#5897ee",
                            borderRadius: 5,
                            width: 150,
                            marginVertical: 5,
                        }}
                    >
                        <Button
                            title="Sign Up"
                            onPress={() => this.props.navigation.navigate('Sign Up')}
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
                        }} onPress={()=>navigation.push('forgotPassword')}
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
