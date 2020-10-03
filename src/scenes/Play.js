import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Play = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Steal or Collaborate</Text>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>{alert("you clicked me")}}>
                    <Image source={require('../assets/stealbtn.png')} style={{ width: 300, height: 63 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{alert("you clicked me")}}>
                    <Image source={require('../assets/collabbtn.png')} style={{ width: 300, height: 63 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 40
    },
    button: {
        backgroundColor: '#8E97FD',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
        shadowColor: '#8E97FD',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
      }
});

export default Play;