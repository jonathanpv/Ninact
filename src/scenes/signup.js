//@flow
import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Button,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import fire from "../firebase";
import "firebase/firestore"; //importing firebase components

export default class signup extends Component {

    state = {
        email: "",
        password: "",
        password2: "",
        message: "",
        visibile:true,
        firstName:"",
        lastName:""
    };

    login = () => {

        fire
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                this.setState({ message: " Email sucessfully Registered please login" })
                fire.firestore() //using fire.firestore fucntion to get acess to database
                    // .collection ("user") is like specifying  table in the database you wanna acess
                    .collection("user").doc(fire.auth().currentUser.uid.toString())
                    .set({ email: this.state.email ,
                    firstName:this.state.firstName,
                lastName:this.state.lastName}) //.set sets he fields that you wanna write to the database.

                this.props.navigation.navigate('loginScreen')
            })
            .catch((err) => {
                console.log(err)
            })


    };

    btnpress = () => {
        console.log("got to btnpress")
        console.log("here" + this.state.message)
        if (this.state.email == "" || this.state.password == "" || this.state.password2 == "" || this.state.firstName=="" || this.state.lastName=="")
            return this.setState({ message: "Some Fields are Empty" });
        else if (this.state.email.search("@") == -1)
            return (
                this.setState({ message: "Inavlid Email" })
            );
        else if (this.state.password != this.state.password2) {
            this.setState({ message: "Password Does not Match" })
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
                    source={require('../assets/applogo.png' )}
                    style={{ width: 250, height: 250 }}
                />
               
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>Sign Up</Text>

                
                    <TextInput
                       
                        placeholder="First Name*"
                        style={styles.txtInput}
                        onChangeText={(val) => this.setState({ lastName: val })}
                        placeholderTextColor="#9134C3"
                       
                    /> 
                     <TextInput
                       
                       placeholder="Last Name*"
                       placeholderTextColor="#9134C3"
                       style={styles.txtInput}
                       onChangeText={(val) => this.setState({ firstName: val })}
                      
                   /> 
                        <TextInput
                        type="email"
                        placeholderTextColor="#9134C3"
                        placeholder="Enter your email*"
                        style={styles.txtInput}
                        onChangeText={(val) => this.setState({ email: val })}
                        keyboardType="email-address"
                    /> 
                    
                  
                    <View style={{
                        flexDirection: 'row', alignItems: "center", height: 45,
                        width: 290,marginBottom:10
                    }}>
                        <TextInput
                            type="password"
                            placeholderTextColor="#9134C3"
                            placeholder="Enter your password*"
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
               
                    <View style={{
                        flexDirection: 'row', alignItems: "center", height: 45,
                        width: 290,
                    }}>
                        <TextInput
                            type="password"
                       
                            placeholder="Confirm your password*"
                            placeholderTextColor="#9134C3"
                            style={styles.txtInput}
                            onChangeText={(val) => this.setState({ password2: val })}
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
                            title="Sign Up"
                            onPress={() => this.btnpress()}
                            color="#9134C3"
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
                            title="Sign In"
                            onPress={() => this.props.navigation.navigate('loginScreen')}
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
   
    iconstyle:{
        width: 45,
        height: 45,
        justifyContent:"center",
        borderWidth: 1,
        borderColor:"#B4B2DF",
        backgroundColor: "#B4B2DF",
        borderRadius:15,
    }
});