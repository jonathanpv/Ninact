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
    Icon,
    TouchableOpacity,
    _Image,
    ImageBackground,
} from "react-native";
import fire from "../firebase";
import"firebase/firestore"; //importing firestor

export default class loginScreen extends Component {
    

    state = {
        email: "",
        password: "",
        message:"",
        visibile:true,
    };

    login = () => {

        console.log("got here")
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u)
            console.log("success!")
           
           

         
            this.props.navigation.navigate('HomeScreen')
            console.log(u.user.uid)
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
    if (this.state.email == "" || this.state.password == "") return this.setState({message:"Some fields are empty"});
    if (this.state.email.search("@") == -1)
    return (
        this.setState({message:"Invalid email"})
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
                <View style ={{flexDirection:'row',alignItems:"center",  height: 45,
        width: 290,}}>
                <TextInput
                    type="password"
                    placeholder="Enter your password"
                    style={styles.txtInput}
                   
                    onChangeText={(val) => this.setState({ password: val })}
                    secureTextEntry={this.state.visibile}
                    
                />
                <TouchableOpacity
                
                   
                    onPress={()=>{
                        if(!this.state.visibile)
                        {
                            return this.setState({visibile:true})
                        }
                        else
                        {
                            return this.setState({visibile:false})
                        }
                    }}
                
                >
                    <Image source={require('../assets/visibility.png' )}
                    style={styles.iconstyle}/>

                </TouchableOpacity>
             
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
                            color:"blue",
                            alignContent:"center",
                        }} onPress={()=>navigation.push('forgotPassword')}
                    >Forgot Password</Text>
           
                    <View
                        style={{
                            width: 100,
                            height: 1,
                            backgroundColor: "lightgrey",
                        }}
                    />
                </View>
                
                
            </View><View style={{ justifyContent: "space-between" }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                 <Text
                        style={{
                            margin: 15,
                            fontSize: 16,
                            color:"red",
                            alignContent:"center",
                        }}
                    >{this.state.message}</Text>
           
                    
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
        backgroundColor: "#0BB2EB",
        flex: 1,
    },
    txtInput: {
        borderWidth: 1,
        borderColor:"gold",
        backgroundColor: "#FFE4E1",
        height: 45,
        width: 290,
        marginVertical: 10,
        borderRadius: 3,
        
    },
   
    iconstyle:{
        width: 45,
        height: 45,
        justifyContent:"center",
        borderWidth: 1,
        borderColor:"white",
        backgroundColor: "#FFE4E1",
    }
});
