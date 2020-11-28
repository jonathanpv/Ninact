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

  DisplayWaiting() {
    if (this.state.isHost) {
      var guestRef = firebase.database().ref(`/0/${this.state.gameKey}/guestID`);
      var gameRef = firebase.database().ref(`/0/${this.state.gameKey}`);
      var countRef = firebase.database().ref(`/0/count`);

      guestRef.on('value', (snapshot) => {
        if (snapshot.val() != '') {
          countRef.transaction((count) => {
            var newCount = count - 1;
            if (newCount < 0)
            {
              newCount = 0;
            }
            return newCount;
          })
          gameRef.once('value').then( (snapshot) => {
            if (snapshot.exists()) {
              update({state: states.USER});
            }
          });
          this.setState({isReady: true});
          guestRef.off('value');
        }
      });
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
    if (this.state.isHost) {
      var hostChoiceRef = firebase.database().ref(`/0/${this.state.gameKey}/hostChoice`);
      choiceRef = hostChoiceRef;
      hostChoiceRef.on('value', (snapshot) => { choice = snapshot.val(); });

      var hostScoreRef = firebase.database().ref(`/0/${this.state.gameKey}/hostScore`);
      hostScoreRef.once('value').then( (snapshot) => { points = snapshot.val(); });
    }
    else {
      var guestChoiceRef = firebase.database().ref(`/0/${this.state.gameKey}/guestChoice`);
      choiceRef = guestChoiceRef;
      guestChoiceRef.on('value', (snapshot) => { choice = snapshot.val(); });

      var guestScoreRef = firebase.database().ref(`/0/${this.state.gameKey}/guestScore`);
      guestScoreRef.once('value').then( (snapshot) => { points = snapshot.val(); });
    }

    var button;
    var incVal = 0;
    var stateRef = firebase.database().ref(`/0/${this.state.gameKey}/state`);
    if (choice == choices.CHEAT) {
      incVal = 0;
      if (this.state.isHost) {
        button = <NextButton onPress={ () => {
          stateRef.update(states.GUEST);
          this.setState({isReady: true});
        }}/>;
      } else {
        button = <NextButton onPress={ () => {
          stateRef.update(states.RESULT);
          this.setState({isReady: true});
        }}/>;
      }
      choiceRef.off('value');
    }
    else if (choice == choices.COLLAB) {
      incVal = -1;
      if (this.state.isHost) {
        button = <NextButton onPress={ () => {
          stateRef.update(states.GUEST);
          this.setState({isReady: true});
        }}/>;
      } else {
        button = <NextButton onPress={ () => {
          stateRef.update(states.RESULT);
          this.setState({isReady: true});
        }}/>;
      }
      choiceRef.off('value');
    }
    else {
      button = (
        <CheatCollabButtons
          onCheat={ () => {
            choiceRef.update(choices.CHEAT);
            this.setState({state: states.USER});
          }}
          onCollab={ () => {
            choiceRef.update(choices.COLLAB);
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
    var avatar;
    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/avatar`)
    .once('value').then( (snapshot) => { avatar = snapshot.val(); });

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
    var stateRef = firebase.database().ref(`/0/${this.state.gameKey}/state`);
    stateRef.on('value', (snapshot) => {
      if (this.state.state != snapshot.val() && this.state.isReady) {
        this.setState({state: snapshot.val(), isReady: false});
      }
    });

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

/*
class Play extends Component {
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
*/
