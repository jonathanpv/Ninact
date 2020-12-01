import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import fire, { db } from '../../../firebase';
import DefaultBackground from '../atoms/DefaultBackground.js';
import DefaultButton from '../atoms/DefaultButton.js';
import BackButton from '../atoms/BackButton.js';
import GuestGameView from '../molecules/GuestGameView.js';
import UserGameView from '../molecules/UserGameView.js';
import ResultView from '../molecules/ResultView.js';
import SummaryView from '../molecules/SummaryView.js';
import LoadingLogo from '../atoms/LoadingLogo.js';
import Avatar from '../atoms/Avatar.js';

const RoundLimit = 6;

export default class BasicPlay extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      waitingForGuest: this.props.isHost,
      guestChoice: 0,
      guestScore: 0,
      hostChoice: 0,
      hostScore: 0,
      round: 0
    };
  }

  componentDidMount() {
    this._isMounted = true;

    var gameRef = db.ref(`/basic/${this.props.gameKey}/`);
    var uid = fire.auth().currentUser.uid;
    var newData = {
      guestChoice: this.state.guestChoice,
      guestScore: this.state.guestScore,
      hostChoice: this.state.hostChoice,
      hostScore: this.state.hostScore,
      round: this.state.round
    }

    var guestRef = gameRef.child('guest/uid').on('value', (guestID) => {
      if (guestID.exists() && guestID.val() != '') {
        this.setState({waitingForGuest: false});
        gameRef.child('guest/uid').off('value', guestRef);
      }
    });

    gameRef.on('value', (game) => {
      if (game.exists() && game.hasChild('guest') && game.hasChild('host') &&
          game.hasChild('round')) {
        var data = game.val();

        //Updating functions for render
        if (this.state.round != data.round)
          newData.round = data.round;

        if (this.state.guestChoice != data.guest.choice)
          newData.guestChoice = data.guest.choice;

        if (this.state.guestScore != data.guest.score)
          newData.guestScore = data.guest.score;

        if (this.state.hostChoice != data.host.choice)
          newData.hostChoice = data.host.choice;

        if (this.state.hostScore != data.host.score)
          newData.hostScore = data.host.score;

        this.setState(newData);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
    var gameRef = db.ref(`/basic/${this.props.gameKey}/`);
    gameRef.off('value');
  }

  componentDidUpdate() {
    if (this.props.isHost) {
      var gameRef = db.ref(`/basic/${this.props.gameKey}/`);

      if (this.state.guestChoice != choices.NONE && this.state.hostChoice != choices.NONE) {
        var host = this.state.hostChoice;
        var guest = this.state.guestChoice;

        gameRef.child('host').update({choice: 0});
        gameRef.child('guest').update({choice: 0});
        gameRef.update({round: this.state.round + 1});

        if (guest == choices.COLLAB && host == choices.COLLAB) {
          gameRef.child('host').update({score: this.state.hostScore + 2});
          gameRef.child('guest').update({score: this.state.guestScore + 2});
        } else if ( guest == choices.COLLAB && host == choices.CHEAT) {
          gameRef.child('host').update({score: this.state.hostScore + 3});
          gameRef.child('guest').update({score: this.state.guestScore -1});
        } else if ( guest == choices.CHEAT && host == choices.COLLAB) {
          gameRef.child('host').update({score: this.state.hostScore -1});
          gameRef.child('guest').update({score: this.state.guestScore + 3});
        }
      }
    }
  }

  FinishGame() {
    var uid = fire.auth().currentUser.uid;
    var userPoints;
    if (this.props.isHost) {
      userPoints = this.state.hostScore;
    } else {
      userPoints = this.state.guestScore;
    }

    db.ref(`/users/${uid}/points`).transaction( (points) => {
      return points + userPoints;
    });

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        <Text style={styles.text}>You have gained {userPoints}</Text>
        <Avatar />
        <DefaultButton text={'Finish'} onPress={()=> {this.props.navigation.navigate("HomeScreen")}}/>
      </View>
    );
  }

  DisplayWaiting() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >
        <LoadingLogo />
        <Text style={styles.text}>Searching for somebody . . .</Text>
      </View>
    );
  }

  DisplayGame() {
    var view;
    var button;
    if (this.props.isHost) {
      view = (
        <View style={styles.game} >
          <UserGameView
            choice={this.state.hostChoice}
            val={this.state.hostScore}
          />
          <GuestGameView
            choice={this.state.guestChoice}
            val={this.state.guestScore}
          />
        </View>
      );

      if (this.state.hostChoice == choices.NONE) {
        button = <CheatCollabButtons
          onCheat={()=>{
            db.ref(`/basic/${this.props.gameKey}/host`)
              .update({choice: choices.CHEAT});
          }}
          onCollab={()=>{
            db.ref(`/basic/${this.props.gameKey}/host`)
              .update({choice: choices.COLLAB});
          }}
        />
      }
    }
    else {
      view = (
        <View style={styles.game} >
          <UserGameView
            choice={this.state.guestChoice}
            val={this.state.guestScore}
          />
          <GuestGameView
            choice={this.state.hostChoice}
            val={this.state.hostScore}
          />
        </View>
      );
      if (this.state.guestChoice == choices.NONE) {
        button = <CheatCollabButtons
          onCheat={()=>{
            db.ref(`/basic/${this.props.gameKey}/guest`)
              .update({choice: choices.CHEAT});
          }}
          onCollab={()=>{
            db.ref(`/basic/${this.props.gameKey}/guest`)
              .update({choice: choices.COLLAB});
          }}
        />
      }
    }

    return (
      <View style={styles.container}>
        {view}
        {button}
      </View>
    );
  }

  render() {
    var screen = this.DisplayWaiting();
    if (this.state.waitingForGuest) {
      screen = this.DisplayWaiting();
    }
    else {
      screen = this.DisplayGame();
    }

    if (this.state.round >= RoundLimit) {
      screen = this.FinishGame();
    }

    return (
      <View style={styles.container} >
        <DefaultBackground />
        <BackButton onPress={ ()=> {this.props.navigation.navigate("HomeScreen")}} />

        {screen}
      </View>
    );
  }
}

function NextButton(props) {
  return (
    <View style={styles.buttonContainer}>
      <DefaultButton text='Next' onPress={props.onPress} />
    </View>
  );
}

function CheatCollabButtons(props) {
  return (
    <View style={styles.buttonContainer}>
      <DefaultButton text='Cheat' onPress={props.onCheat} />
      <DefaultButton text='Collaborate' onPress={props.onCollab} />
    </View>
  );
}

const choices = {
  NONE: 0,
  CHEAT: 1,
  COLLAB: 2
}

const states = {
  WAITING: 0,
  USER: 1,
  GUEST: 2,
  RESULT: 3,
  SUMMARY: 4
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'col',
    },
    game: {
      flex: 4,
      flexDirection: 'row'
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 40,
        alignText: 'center'
    }
});
