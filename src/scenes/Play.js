import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, Alert } from 'react-native';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js';
import BackButton from '../assets/components/atoms/BackButton.js';
import GuestGameView from '../assets/components/molecules/GuestGameView.js';
import UserGameView from '../assets/components/molecules/UserGameView.js';
import ResultView from '../assets/components/molecules/ResultView.js';
import SummaryView from '../assets/components/molecules/SummaryView.js';
import firebase from '../firebase';
import { firestore } from 'firebase';

class PlayRounds extends Component {
  constructor() {
    super();
    this.state = {
      rounds: 6,
      player_score: 0,
      enemy_score: 0,
      player_choice: 0,
      enemy_choice: 0,
      screen: 0
    };
  }

  IncScores(player, enemy) {
    this.state.player_score = this.state.player_score + player;
    this.state.enemy_score = this.state.enemy_score + enemy;
  }

  //Determines value gained/lost between player choices
  CalculateScore() {
      if (this.state.player_choice == 1 && this.state.enemy_choice == 1) { this.IncScores(2, 2) }
      if (this.state.player_choice == 1 && this.state.enemy_choice == 2) { this.IncScores(0, 3) }
      if (this.state.player_choice == 2 && this.state.enemy_choice == 1) { this.IncScores(3, 0) }
      this.player_choice == 0;
      this.enemy_choice == 0;
      this.state.rounds = this.state.rounds - 1;
      }

  //Enemy AI for single player
  PlayEnemy() {
    this.state.enemy_choice = Math.floor(Math.random() * 2) + 1;
    if (this.state.enemy_choice == 2) {
      alert('Bobby left you hanging');
    } else if (this.state.enemy_choice == 1) {
      alert('Bobby worked together with you');
      this.state.enemy_score = this.state.enemy_score - 1;
    } else if (this.state.enemy_choice == 0) {
      alert('Bobby broke down');
    }
  }

  // Get old score from DB using user uid
  // Sometimes the user is null so the oScore variable becomes Nan/unidentified (see github issues)
  getOldScorefromDB() {
    firestore().collection('leaderboard').doc(firebase.auth().currentUser.uid)
    .get()
    .then(oldScore => {
      let oScore = oldScore.data().score;
      return oScore;
    });
  }

  // Get username using the uid
  // Sometimes the user is null so username becomes unidenfied (See github issues)
  getUserName() {
    firestore().collection('user').doc(firebase.auth().currentUser.uid)
    .get()
    .then(user => {
    return user.data().firstName;
    });
  }

  // Store the leaderboard scores to the Database
  storeScoretoDB() {

    // Get old score from DB using getOldScorefromDB() function
    let oScore  = this.getOldScorefromDB()
    console.log("oldscore: "  + oScore);
    if(oScore === undefined || oScore === NaN) {
      oScore = 0;
    }

    // Get username of the user using getUserName() function
    let username = this.getUserName();
    console.log("Username: " + username)
    if(username === undefined) {
      username = "tesssst";
    }

    // finalScore = old score stored in DB + current score user collected
    let finalScore = this.state.player_score + oScore;
    console.log("Current Score :" + this.state.player_score);
    console.log("Added FinalScore: " + finalScore)

    // Now update the leaderboard collection DB with the new scores
    firestore()
    .collection('leaderboard')
    .doc(firebase.auth().currentUser.uid.toString())
    .set({
      name: username,
      score: finalScore
    });
  }

  Leave() {
    //this.storeScoretoDB();
    this.setState({turn: 0, rounds: 6, player_choice: 0, enemy_choice: 0, player_score: 0, enemy_score: 0});
    this.props.navigation.navigate('HomeScreen');
  }

  //User turn Screen
  DisplayUser() {
    let button;
    var incVal;
    if (this.state.player_choice == 2 ) {
      incVal = 0;
      button = <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <DefaultButton text='Next' onPress={()=>{this.setState({ screen: 1 })} }/>
      </View>
    }
    else if (this.state.player_choice == 1 ) {
      incVal = -1;
      button = <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <DefaultButton text='Next' onPress={()=>{this.setState({screen: 1})} }/>
      </View>
    }
    else {
      let new_score = this.state.player_score - 1;
      button = <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <DefaultButton text='Cheat' onPress={()=>{this.setState({player_choice: 2})}}/>
          <DefaultButton text='Collaborate' onPress={()=>{this.setState({player_choice: 1, player_score: new_score})}}/>
      </View>
    }
      return (
        <View style={styles.container}>
            <DefaultBackground/>
            <BackButton onPress={() => this.Leave()}/>

            <View style={{flex: 4, flexDirection: 'col', justifyContent: 'space-evenly'}}>
                <UserGameView
                    choice={this.state.player_choice}
                    val={this.state.player_score}
                    inc={incVal}
                />
            </View>
            {button}
        </View>
      );
  }

  //Enemy turn Screen
  DisplayEnemy() {
    this.PlayEnemy();

    var incVal = 0;
    if (this.state.enemy_choice == 1) {
        incVal = -1;
    }

    return (
      <View style={styles.container}>
          <DefaultBackground/>
          <BackButton onPress={() => this.Leave()}/>

          <View style={{flex: 4}}>
              <GuestGameView
                  choice={this.state.enemy_choice}
                  val={this.state.enemy_score}
                  inc={incVal}
              />
          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <DefaultButton onPress={() => this.setState({screen : 2}) } text="Next"/>
          </View>
      </View>
    );
  }

  //User results Screen
  DisplayResults() {
    this.CalculateScore();

    let button;
    if (this.state.rounds < 0) {
      button = <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <DefaultButton onPress={() => this.setState({screen: 3}) } text='Next'/>
        </View>
    } else {
      button = <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <DefaultButton onPress={() => this.setState( {player_choice: 0, enemy_choice: 0, screen: 0} )} text='Next'/>
        </View>
    }

    return (
      <View style={styles.container}>
        <DefaultBackground/>
        <BackButton onPress={() => this.Leave()}/>

        <View style={{flex:4}} >
            <ResultView
              user={0}
              guest={0}
              uScore={this.state.player_score}
              gScore={this.state.enemy_score}
            />
        </View>
        {button}
      </View>
    );
  }

  DisplayFinal() {
    return (
      <View style={styles.container}>
        <DefaultBackground/>
        <BackButton onPress={() => this.Leave() } />

        <View style={{flex:4}}>
            <SummaryView
              avatar={0}
              val={10}
            />
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <DefaultButton onPress={() => this.Leave() } text='Finish'/>
        </View>
      </View>
    );
  }

  render() {
    var screen;
    if (this.state.screen == 0)
      screen = this.DisplayUser();
    else if (this.state.screen == 1)
      screen = this.DisplayEnemy();
    else if (this.state.screen == 2)
      screen = this.DisplayResults();
    else if (this.state.screen == 3)
      screen = this.DisplayFinal();
    return (screen);
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        fontSize: 40
    }
});

const collabEmoji = [
  require('../assets/art/emoji/Amazed.png'),
  require('../assets/art/emoji/Baby.png'),
  require('../assets/art/emoji/Begging.png'),
  require('../assets/art/emoji/Cool.png'),
  require('../assets/art/emoji/Excited.png'),
  require('../assets/art/emoji/Expecting.png'),
  require('../assets/art/emoji/Satisfied.png'),
  require('../assets/art/emoji/Silly.png')
]

const cheatEmoji = [
  require('../assets/art/emoji/Baby.png'),
  require('../assets/art/emoji/Bored.png'),
  require('../assets/art/emoji/Cool.png'),
  require('../assets/art/emoji/Disinterested.png'),
  require('../assets/art/emoji/Satisfied.png'),
  require('../assets/art/emoji/Silly.png'),
  require('../assets/art/emoji/Sleepy.png'),
  require('../assets/art/emoji/Tired.png')
]

export default PlayRounds;
