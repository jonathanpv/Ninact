import React from "react";
import { Text, StyleSheet,  View, TouchableOpacity, ImageBackground} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <View>
            <ImageBackground 
                source={require('../assets/friendlisticon.png' )}
                style={{ width: 200, height: 200}}>
                <TouchableOpacity
                    style={styles.friendListButtonStyle}
                    onPress={() => navigation.navigate('FriendList')}
                >
                    <Text style={{color: "black"}}>Go</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
        <View>
            <ImageBackground 
                source={require('../assets/leaderboardicon.png' )}
                style={{ width: 200, height: 200 }}>
                <TouchableOpacity
                    style={styles.leaderboardButtonStyle}
                    onPress={() => navigation.navigate('LeaderBoard')}
                >
                    <Text style={{color: "white"}}>Go</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex", 
    flexDirection: "row" 
  },
  friendListButtonStyle: {
    position: "absolute",
    flex: 1,
    borderWidth: 1,
    height: 30,
    width: "30%",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 170,
    marginLeft: 130,
    justifyContent: "center"
  },
  leaderboardButtonStyle: {
    position: "absolute",
    flex: 1,
    borderWidth: 1,
    height: 30,
    width: "30%",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "black",
    marginTop: 170,
    marginLeft: 130,
    justifyContent: "center"
  }
  
});

export default HomeScreen;

