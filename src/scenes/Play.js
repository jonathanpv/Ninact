import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from '../firebase';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import BackButton from '../assets/components/atoms/BackButton.js';
import LoadingLogo from '../assets/components/atoms/LoadingLogo.js';
import BasicPlay from '../assets/components/organisms/BasicPlay.js';

const PointLimit = 6;

class Play extends Component {
  constructor() {
    super();
    var id = firebase.auth().currentUser.uid;
    this.state = {
      gameKey: '',
      gameMode: games.BASIC,
      uid: id,
      isHost: false
    };
  }

  componentWillUnmount() {
    if ( this.state.gameKey != '') {
      firebase.database().ref(`/${this.state.gameMode}/count`)
      .transaction((count) => {
        var newCount = count - 1;
        if (newCount < 0)
        {
          newCount = 0;
        }
        return newCount;
      })
      firebase.database().ref(`/${this.state.gameMode}/${this.state.gameKey}/`).remove();
    }
  }

  GetGameMode() {
    firebase.database().ref(`/users/${this.state.uid}/points`).once('value').then( (snapshot) => {
      if (snapshot.val() < PointLimit)
      {
        this.state.gameMode = games.BASIC; //To be changed later
      } else {
        Math.random();
        //this.state.gameMode = games[Math.floor(Math.random()*games.length)];
        this.state.gameMode = games.BASIC;
      }
    });
  }

  GetGameKey() {
    var countRef = firebase.database().ref(`/${this.state.gameMode}/count`);
    var roomRef = firebase.database().ref( `/${this.state.gameMode}/`);

    countRef.once('value').then( (snapshot) => {
      const count = snapshot.val();
      var key;
      if ( count < 1 ) {
        key = roomRef.push({
          round: 0,
          state: 0,
          hostID: this.state.uid,
          guestID: '',
          hostChoice: 0,
          guestChoice: 0,
          hostScore: 0,
          guestScore: 0
        }).key;
        this.setState({gameKey: key, isHost: true});
        countRef.transaction((count) => { return count + 1; });
      }
      else {
        roomRef.on('value', (gamelist) => {
          gamelist.forEach( (game) => {
            key = game.key;
            var data = game.val();

            if (data.hostID == this.state.uid) {
              game.ref.remove();

              var newCount = 0;
              if (data.guestID == '') {
                countRef.transaction((count) => {
                  newCount = count - 1;
                  return newCount;
                });

                if (newCount <= 0) {
                  roomRef.off('value');

                  this.GetGameKey();
                }
              }

              return;
            }

            if (key == 'count' || data.guestID != '') { return; }

            firebase.database().ref(`/${this.state.gameMode}/${key}/guestID`)
              .transaction( () => { return this.state.uid; });
            countRef.transaction((count) => { return count - 1; });
            roomRef.off('value');
            this.setState({gameKey: key, isHost: false});
          });
        });
      }
    });
  }

  DisplayLoading() {
    return (
      <View style={styles.container} >
        <DefaultBackground />
        <BackButton onPress={() => {this.props.navigation.navigate("HomeScreen")}}/>

        <View style={styles.subcontainer} >
          <LoadingLogo />
          <Text style={styles.text}>Searching for Game . . .</Text>
        </View>
      </View>
    );
  }

  DisplayGame() {
    var game;
    switch (this.state.gameMode) {
      case games.BASIC:
        game = <BasicPlay
          navigation={this.props.navigation}
          gameKey={this.state.gameKey}
          isHost={this.state.isHost}
        />
        break;
      case games.FLOWER:
        //game =
        break;
      default:
        game = <BasicPlay />
    }

    return game;
  }

  render() {
    var screen = this.DisplayLoading();
    if (this.state.gameKey != '') {
      screen = this.DisplayGame();
    } else {
      this.GetGameMode();
      this.GetGameKey();
    }
    return (screen);
  }
}

const games = {
  BASIC: 0,
  FLOWER: 1
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subcontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
        fontSize: 40
    }
});


export default Play;
