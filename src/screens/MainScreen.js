import React from "react";
import { StyleSheet, Text, Button, View, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { getUserScore } from "../api/FireBaseApi";
import { styles } from "../style/styles";

export default class MainScreen extends React.Component {
  state = { currentUser: null, score: 0 };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    if (typeof currentUser !== "undefined") {
      console.log("!!!");

      console.log(currentUser);
      var userScore = getUserScore(this.onUserScoreRecieved, currentUser.email);
    }
  }

  onUserScoreRecieved = (userScore) => {
    this.setState({ score: userScore });
  };

  signOutUser = async () => {
    try {
      await firebase
        .auth()
        .signOut()
        .then(() => this.props.navigation.navigate("Loading"));
    } catch (e) {
      console.log(e);
    }
  };
  //<Text>прив твой score -> {this.state.score}</Text>
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("gameFlow", {
                email: this.state.currentUser.email,
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Играть</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Dashboard", {
                email: this.state.currentUser.email,
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Список игроков</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.signOutUser()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Выйти</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
