import React from 'react'
import { StyleSheet, Text, Button, View } from 'react-native'
import * as firebase from 'firebase';
import { getUserScore } from '../api/FireBaseApi';

export default class MainScreen extends React.Component {
    state = { currentUser: null, score: 0 }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })

        if (typeof(currentUser) !== 'undefined') {
            console.log(currentUser)
            var userScore = getUserScore(this.onUserScoreRecieved, currentUser.email);
        }
    }

    onUserScoreRecieved = (userScore) => {
        this.setState({score: userScore})
    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut().then(()=> this.props.navigation.navigate('Loading'));
            
        } catch (e) {
            console.log(e);
        }
    }
//<Text>прив твой score -> {this.state.score}</Text>
    render() {
        

        return (
            <View style={{margin:30}}>
                
                <View style={{marginBottom: 15}}>
                <Button
            
                    title="Начать игру"
                    onPress={() => this.props.navigation.navigate('gameFlow', {email: this.state.currentUser.email})}
                />
                </View>
                <View style={{marginBottom: 15}}>
                <Button
                    title="Таблица игроков"
                    onPress={() => this.props.navigation.navigate('Dashboard', {email: this.state.currentUser.email})}
                />
                </View>
                <Button
                    title="Выйти"
                    onPress={() => this.signOutUser()}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})