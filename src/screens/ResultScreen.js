import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { styles } from "../style/styles";

export default class ResultScreen extends React.Component {
  state = { correctCount: 0 };

  componentDidMount() {
    this.setState({
      correctCount: this.props.navigation.getParam("correctCount"),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Правильных ответов {this.state.correctCount}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("gameFlow", {
                email: this.props.navigation.getParam("email"),
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Начать заново</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Dashboard", {
                email: this.props.navigation.getParam("email"),
              })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Список игроков</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
