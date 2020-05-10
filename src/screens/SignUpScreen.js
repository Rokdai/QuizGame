import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import * as firebase from 'firebase';
import { addUser } from '../api/FireBaseApi';

export default class SignUpScreen extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
        const { email, password } = this.state
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                addUser(email);
                this.props.navigation.navigate('SignIn');
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Почта"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Пароль"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <View style={styles.button}>
                    <Button title="Зарегистрироваться" onPress={this.handleSignUp} />
                </View>
                <View style={{ marginTop: 90 }}>
                    <Button style={styles.button}
                        title="Уже зарегистрированы? Залогиньтесь!"
                        onPress={() => this.props.navigation.navigate('SignIn')}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    button: {
        marginTop: 10,
        borderColor: 'red'
    }
})