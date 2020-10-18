import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';

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

  DisplayUser() {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>Steal or Collaborate</Text>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>{this.state.player_choice = 2; this.setState({ turn: 1})} }>
                    <Image source={require('../assets/stealbtn.png')} style={{ width: 300, height: 63 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{this.state.player_choice = 1; this.setState({ turn: 1})} }>
                    <Image source={require('../assets/collabbtn.png')} style={{ width: 300, height: 63 }} />
                </TouchableOpacity>
            </View>
        </View>
      );
  }

  DisplayEnemy() {
    this.PlayEnemy();
    this.CalculateScore();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Steal or Collaborate</Text>
        <Button
          onPress={() => this.setState({turn : 0}) }
          title="Next"
          color="#841584"
          />
      </View>
    );
  }

  Reset() {
    this.setState({turn: 0, rounds: 10});
    this.props.navigation.goBack();
  }

  DisplayResults() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Steal or Collaborate</Text>
        <Text style={styles.text}>Your Score is {this.state.player_score}</Text>
        <Text style={styles.text}>Stranger Score is {this.state.enemy_score}</Text>
        <Button
          onPress={ () => this.Reset() }
          title="Next"
          color="#841584"
          />
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

export default PlayRounds;
