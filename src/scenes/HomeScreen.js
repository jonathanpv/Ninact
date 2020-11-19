// Imports
import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import DefaultBackground from "../assets/components/atoms/DefaultBackground.js";
import fire from "../firebase";
// Homescreen component creation
const HomeScreen = ({ navigation }) => {
  // useEffect(() => {
  //   console.log("USEEFFECT");
  //   fire
  //     .firestore()
  //     .collection("user")
  //     .doc(fire.auth().currentUser.uid.toString())
  //     .set({
  //       try: "DO",
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <DefaultBackground />
      <View>
        <ImageBackground
          source={require("../assets/friendlisticon.png")}
          style={{ width: 200, height: 200 }}
        >
          <TouchableOpacity
            style={styles.friendListButtonStyle}
            onPress={() => navigation.push("FriendList")}
          >
            <Text style={{ color: "black" }}>Go</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View>
        <ImageBackground
          source={require("../assets/leaderboardicon.png")}
          style={{ width: 200, height: 200 }}
        >
          <TouchableOpacity
            style={styles.leaderboardButtonStyle}
            onPress={() => navigation.push("LeaderBoard")}
          >
            <Text style={{ color: "white" }}>Go</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
};

// HomeScreen Component StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
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
    justifyContent: "center",
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
    justifyContent: "center",
  },
});

export default HomeScreen;
