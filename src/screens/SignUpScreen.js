import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { addUser } from "../api/FireBaseApi";
import { styles } from "../style/styles";

export default class SignUpScreen extends React.Component {
  state = { email: "", password: "", errorMessage: null };
  handleSignUp = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        addUser(email);
        this.props.navigation.navigate("SignIn");
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Почта"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Пароль"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this.handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignIn")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
