import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, Alert } from 'react-native';
import DefaultBackground from '../assets/components/atoms/DefaultBackground.js';
import DefaultButton from '../assets/components/atoms/DefaultButton.js'
import BackButton from '../assets/components/atoms/BackButton.js'

class PlayRounds extends Component {
  constructor() {
    super();
    this.state = {
      rounds: 10,
      player_score: 0,
      enemy_score: 0,
      player_choice: 0,
      enemy_choice: 0,
      turn: 0
    };
  }

  IncScores(player, enemy) {
    this.state.player_score = this.state.player_score + player;
    this.state.enemy_score = this.state.enemy_score + enemy;
  }

  CalculateScore() {
      if (this.state.player_choice == 1 && this.state.enemy_choice == 1) { this.IncScores(1, 1) }
      if (this.state.player_choice == 1 && this.state.enemy_choice == 2) { this.IncScores(-1, 2) }
      if (this.state.player_choice == 2 && this.state.enemy_choice == 1) { this.IncScores(2, -1) }
      this.player_choice == 0;
      this.enemy_choice == 0;
      this.state.rounds = this.state.rounds - 1;
      }

  PlayEnemy() {
    this.state.enemy_choice = Math.floor(Math.random() * 2) + 1;
    if (this.state.enemy_choice == 2) { alert('Stranger Chose To STEAL!') }
    if (this.state.enemy_choice == 1) { alert('Stranger says "Yay sharing is caring!"') }
    if (this.state.enemy_choice == 0) { alert('Um. . . something went horribly wrong') }
  }

  Leave() {
    this.setState({turn: 0, rounds: 10});
    this.props.navigation.navigate('HomeScreen');
  }

  DisplayUser() {
      return (
        <View style={styles.container}>
            <DefaultBackground/>
            <BackButton onPress={() => this.Leave()}/>

            <View style={styles.container}>
                <View style={{flex: 4}}>

                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <DefaultButton text='Cheat' onPress={()=>{this.state.player_choice = 2; this.setState({ turn: 1})} }/>
                <DefaultButton text='Collaborate' onPress={()=>{this.state.player_choice = 1; this.setState({ turn: 1})} }/>
                </View>
            </View>
        </View>
      );
  }

  DisplayEnemy() {
    this.PlayEnemy();
    this.CalculateScore();
    return (
      <View style={styles.container}>
          <DefaultBackground/>
          <BackButton onPress={() => this.Leave()}/>

          <View style={styles.container}>
              <View style={{flex: 4}}>

              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <DefaultButton onPress={() => this.setState({turn : 0}) } text="Next"/>
              </View>
          </View>
      </View>
    );
  }

  DisplayResults() {
    let text;
    if (this.state.player_score > 0 ) {
      text = <Text style={styles.text}>You Earned {this.state.player_score} Coin</Text>
    }
    else if (this.state.player_score < 0 ) {
      text = <Text style={styles.text}>You Lost {this.state.player_score * -1} Coin</Text>
    }
    else {
      text = <Text style={styles.text}>You are Uneffected</Text>
    }
    return (
      <View style={styles.container}>
        <DefaultBackground/>
        <BackButton onPress={() => this.Leave()}/>

        <View style={styles.container}>
            <View style={{flex: 4, backgroundColor: '#fff', margin: 30}}>
                {text}

            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <DefaultButton onPress={() => this.Leave() } text="Next"/>
            </View>
        </View>
      </View>
    );
  }

  render() {
    var screen;
    this.state.rounds <= 0 ? screen = this.DisplayResults() : this.state.turn == 0 ? screen = this.DisplayUser() : screen = this.DisplayEnemy()

    return (screen);
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default PlayRounds;
