import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

export default function Button_new({text, onPress })
{
    return (
    <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
            <Text style= {styles.buttonText}>{text}</Text>
        </View>
    </TouchableOpacity>
    )
}
const styles= StyleSheet.create({
button:
{
    borderRadius:13,
    height:36,
    width:120,
    backgroundColor: "#8b2cdf",
   //backgroundColor:"red",
    overflow: "visible",
    textAlign:"center"
},

buttonText:{
    color:"#e6ca13",
    textAlign:"center"


},
})