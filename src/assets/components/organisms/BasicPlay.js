import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from '../../../firebase';
import DefaultBackground from '../atoms/DefaultBackground.js';
import DefaultButton from '../atoms/DefaultButton.js';
import BackButton from '../atoms/BackButton.js';
import GuestGameView from '../molecules/GuestGameView.js';
import UserGameView from '../molecules/UserGameView.js';
import ResultView from '../molecules/ResultView.js';
import SummaryView from '../molecules/SummaryView.js';
import LoadingLogo from '../atoms/LoadingLogo.js';

const RoundLimit = 6;

export default class BasicPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameKey: props.gameKey,
      isHost: props.isHost,
      state: 0,
      isReady: false
    };
  }

  componentDidMount() {
    var stateRef = firebase.database().ref(`/0/${this.state.gameKey}/state`);
    stateRef.on('value', (snapshot) => {
      if (this.state.state != snapshot.val() && this.state.isReady) {
        this.setState({state: snapshot.val(), isReady: false});
      }
    });
  }

  DisplayWaiting() {
    if (this.state.isHost) {
      var guestRef = firebase.database().ref(`/0/${this.state.gameKey}/guestID`);
      var gameRef = firebase.database().ref(`/0/${this.state.gameKey}`);

      guestRef.on('value', (snapshot) => {
        if (snapshot.val() != '') {
          gameRef.once('value').then( (snapshot) => {
            if (snapshot.exists()) {
              gameRef.update({state: states.USER});
            }
          });
          this.setState({isReady: true});
          guestRef.off('value');
        }
      });
    }
    else
    {
      this.setState({state: states.USER, isReady: true});
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingLogo />
          <Text style={styles.text}>Finding Opponent. . .</Text>
        </View>
      </View>
    );
  }

  DisplayUser() {
    var avatar;
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/avatar`)
    .once('value').then( (snapshot) => { avatar = snapshot.val(); });

    var points = 0;
    var choice = choices.NONE;
    var choiceRef;
    var scoreRef;
    if (this.state.isHost) {
      choiceRef = `/0/${this.state.gameKey}/hostChoice`;
      scoreRef = `/0/${this.state.gameKey}/hostScore`
    }
    else {
      choiceRef = `/0/${this.state.gameKey}/guestChoice`;
      scoreRef = `/0/${this.state.gameKey}/guestScore`;
    }
    firebase.database().ref(choiceRef).on('value', (snapshot) => { choice = snapshot.val(); });
    firebase.database().ref(scoreRef).on('value', (snapshot) => { points = snapshot.val(); });

    var button;
    var incVal = 0;
    var gameRef = firebase.database().ref(`/0/${this.state.gameKey}/`);
    if (this.state.isHost) {
      button = <NextButton onPress={ () => {
        gameRef.update({state: states.GUEST});
        this.setState({isReady: true});
      }}/>;
    } else {
      button = <NextButton onPress={ () => {
        gameRef.update({state: states.RESULT});
        this.setState({isReady: true});
      }}/>;
    }

    if (choice == choices.CHEAT) {
      incVal = 0;
      firebase.database().ref(choiceRef).off('value');
      firebase.database().ref(scoreRef).off('value');
    }
    else if (choice == choices.COLLAB) {
      incVal = -1;
      firebase.database().ref(choiceRef).off('value');
      firebase.database().ref(scoreRef).off('value');
    }
    else {
      button = (
        <CheatCollabButtons
          onCheat={ () => {
            firebase.database().ref(choiceRef).set(choices.CHEAT);
            this.setState({state: states.USER});
          }}
          onCollab={ () => {
            firebase.database().ref(choiceRef).set(choices.COLLAB);
            this.setState({state: states.USER});
          }}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.game}>
          <UserGameView
            avatar={avatar}
            choice={choice}
            val={points}
            inc={incVal}
          />
        </View>
        {button}
      </View>
    );
  }

  DisplayGuest() {
    var guest = '';
    var points = 0;
    var choice = choices.NONE;
    var choiceRef;
    if (this.state.isHost) {
      var guestChoiceRef = firebase.database().ref(`/0/${this.state.gameKey}/guestChoice`);
      choiceRef = guestChoiceRef;
      guestChoiceRef.on('value', (snapshot) => { choice = snapshot.val(); });

      var guestScoreRef = firebase.database().ref(`/0/${this.state.gameKey}/guestScore`);
      guestScoreRef.once('value').then( (snapshot) => { points = snapshot.val(); });

      var guestRef = firebase.database().ref(`/0/${this.state.gameKey}/guestID`);
      guestRef.once('value').then( (snapshot) => { guest = snapshot.val(); });
    }
    else {
      var hostChoiceRef = firebase.database().ref(`/0/${this.state.gameKey}/hostChoice`);
      choiceRef = hostChoiceRef;
      hostChoiceRef.on('value', (snapshot) => { choice = snapshot.val(); });

      var hostScoreRef = firebase.database().ref(`/0/${this.state.gameKey}/hostScore`);
      hostScoreRef.once('value').then( (snapshot) => { points = snapshot.val(); });

      var hostRef = firebase.database().ref(`/0/${this.state.gameKey}/hostID`);
      hostRef.once('value').then( (snapshot) => { guest = snapshot.val(); });
    }

    var avatar;
    firebase.database().ref(`/users/${guest}/avatar`)
    .once('value').then( (snapshot) => { avatar = snapshot.val(); });

    var button;
    var incVal = 0;
    var gameRef = firebase.database().ref(`/0/${this.state.gameKey}/`);
    if (choice == choices.CHEAT) {
      incVal = 0;
      choiceRef.off('value');
    }
    else if (choice == choices.COLLAB) {
      incVal = -1;
      choiceRef.off('value');
    }

    return (
      <View style={styles.container}>
        <View style={styles.game}>
          <GuestGameView
            avatar={avatar}
            choice={choice}
            val={points}
            inc={incVal}
          />
        </View>
        <NextButton onPress={ () => { this.setState({isReady: true}); }} />
      </View>
    );
  }

  DisplayResult() {
    var gameRef = firebase.database().ref(`/0/${this.state.gameKey}/`);
    var round;
    var button;
    var userAvatar;
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/avatar`)
    .once('value').then( (snapshot) => { userAvatar = snapshot.val(); });
    var guestAvatar;
    var guestID;
    if (this.state.isHost) {
      var hostChoice;
      var guestChoice;
      var hostScore;
      var guestScore;
      gameRef.once('value').then( (snapshot) => {
        hostChoice = snapshot.val().hostChoice;
        guestChoice = snapshot.val().guestChoice;
        hostScore = snapshot.val().hostScore;
        guestScore = snapshot.val().guestScore;
        round = snapshot.val().round;
        guestID = snapshot.val().guestID;
      });

      firebase.database().ref(`/users/${guestID}/avatar`)
      .once('value').then( (snapshot) => { guestAvatar = snapshot.val(); });

      if ( hostChoice == choices.COLLAB && guestChoice == choices.COLLAB ) {
        var hostNewScore = hostScore + 2;
        var guestNewScore = guestScore + 2;
        gameRef.update({hostScore: hostNewScore, guestScore: guestNewScore});
      } else if ( hostChoice == choices.COLLAB && guestChoice == choices.CHEAT ) {
        var guestNewScore = guestScore + 3;
        gameRef.update({guestScore: guestNewScore});
      } else if ( hostChoice == choices.CHEAT && guestChoice == choices.COLLAB ) {
        var hostNewScore = hostScore + 3;
        gameRef.update({hostScore: hostNewScore});
      }

      gameRef.update({round: round + 1});
      if ( (round + 1) >= 6) {
        button = <NextButton onPress={ () => {
          gameRef.update({state: states.SUMMARY});
          this.setState({isReady: true});
        }}/>
      } else {
        button = <NextButton onPress={ () => {
          gameRef.update({state: states.USER});
          this.setState({isReady: true});
        }}/>
      }
    }
    else {
      button = <NextButton onPress={ () => {
        this.setState({isReady: true});
      }}/>
    }

    var userScore;
    var guestScore;
    gameRef.on('value', (snapshot) => {
      userScore = snapshot.val().hostScore;
      guestScore = snapshot.val().guestScore;
    });

    return (
      <View style={styles.container} >
        <View style={styles.game} >
          <ResultView
            user={userAvatar}
            guest={guestAvatar}
            uScore={userScore}
            gScore={guestScore}
          />
        </View>
        {button}
      </View>
    );
  }

  DisplaySummary() {
    var avatar;
    var button;
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/avatar`)
    .once('value').then( (snapshot) => { avatar = snapshot.val(); });

    var score;
    if (this.state.isHost) {
      firebase.database().ref(`/0/${this.state.gameKey}/hostScore`)
      .once('value').then( (snapshot) => { score = snapshot.val(); });
    } else {
      firebase.database().ref(`/0/${this.state.gameKey}/guestScore`)
      .once('value').then( (snapshot) => { score = snapshot.val(); });
    }

    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/points`)
    .update( (points) => { return points + score });

    return (
      <View style={styles.container} >
        <View style={styles.game} >
          <SummaryView
            avatar={avatar}
            val={score}
          />
        </View>
        <NextButton onPress={ () => { this.props.navigation.navigate("HomeScreen"); }} />
      </View>
    );
  }

  render() {

    var screen;
    switch(this.state.state) {
      case states.WAITING:
        screen = this.DisplayWaiting();
      break;

      case states.USER:
        if (this.state.isHost) {
          screen = this.DisplayUser();
        } else {
          screen = this.DisplayGuest();
        }
      break;

      case states.GUEST:
        if (this.state.isHost) {
          screen = this.DisplayGuest();
        } else {
          screen = this.DisplayUser();
        }
      break;

      case states.RESULT:
        screen = this.DisplayResult();
      break;

      case states.SUMMARY:
        screen = this.DisplaySummary();
      break;

      default:
        screen = <Text>ERROR</Text>;
    }

    return (
      <View style={styles.container} >
        <DefaultBackground />
        <BackButton onPress={() => {this.props.navigation.navigate("HomeScreen");}}/>
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
  NONE: '0',
  CHEAT: '1',
  COLLAB: '2'
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
      flexDirection: 'col'
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
