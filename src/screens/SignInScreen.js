import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import { styles } from "../style/styles";

export default class SignInScreen extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate("Main");
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
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Адрес эллектронной почты"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Пароль"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignUp")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Регистрация</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
