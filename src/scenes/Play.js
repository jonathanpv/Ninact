import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import fire, { db } from '../firebase';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import BackButton from '../assets/components/atoms/BackButton.js';
import LoadingLogo from '../assets/components/atoms/LoadingLogo.js';
import BasicPlay from '../assets/components/organisms/BasicPlay.js';

const PointLimit = 6;

export default class Play extends Component {
  constructor() {
    super();
    this.state = {
      gameKey: '',
      gameMode: games.BASIC,
      isHost: false,
      waitingGameResolve: true
    };
  }

  //Runs only once to check for data fetching
  componentDidMount() {
    this.JoinGame();
    this.setState({waitingGameResolve: false});
  }

  componentWillUnmount() {
    var gameRef = db.ref(`/${this.state.gameMode}/${this.state.gameKey}/`);

    gameRef.once('value').then( (game) => {
      if (game.exists()) {
        game.ref.remove();
      }
    });
  }

  JoinGame() {
    var lobbyRef = db.ref(`/${this.state.gameMode}/`);
    var uid = fire.auth().currentUser.uid;

    lobbyRef.once('value')
    .then( (gameList) => {
      //Clean up old games
      gameList.forEach( (game) => {
        if (game.val().guest.uid == uid)
          game.ref.remove();

        if (game.val().host.uid == uid)
          game.ref.remove();
      });
    })
    .then( () => {
      //Choose gamemode
      var points;
      db.ref(`/users/${uid}/points`)
        .once('value')
        .then( (snapshot) => {
          if ( !snapshot.exists()) {
            console.log('WARNING: User data is missing!');
            this.props.navigation.navigate('HomeScreen');
          }
          if ( snapshot.val() < 0 )
            console.log('WARNING: User points should not be negative');

          points = snapshot.val();
        });

      //Math.random();
      //var randomGame = games[Math.floor(Math.random()*games.length)];
      this.state.gameMode = games.BASIC;
    })
    .then( () => {
      //Get game key
      var key = '';
      lobbyRef.once('value').then( (gameList) => {
        gameList.forEach( (game) => {
          if (key != '')
            return;

          if (game.val().guest.uid == '')
            key = game.key;
        });

        if (key == '') {
          var newGame = basicGameData;
          newGame.host.uid = uid;
          key = lobbyRef.push(newGame).key;
          this.state.gameKey = key;
          this.state.isHost = true;
        }
        else {
          lobbyRef.child(key).child('guest').update({uid: uid}).then( ()=> {
            this.state.gameKey = key;
          });
        }
      });
    })
    .catch( (error) => {
      this.JoinGame();
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
    if (this.state.waitingGameResolve == false) {
      screen = this.DisplayGame();
    }
    return (screen);
  }
}

const basicGameData = {
  round: 0,
  host: {
    uid: '',
    choice: 0,
    score: 0
  },
  guest: {
    uid: '',
    choice: 0,
    score: 0
  }
};

const games = {
  BASIC: 0
  //Flower: 1
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
