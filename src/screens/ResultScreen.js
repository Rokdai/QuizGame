import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default class ResultScreen extends React.Component {
    state = { correctCount: 0 };

    componentDidMount() {
        this.setState({correctCount: this.props.navigation.getParam("correctCount")});
    }

    render() {
        
        return (
            <View style={styles.container}>
                <Text>Ты правильно ответил(а) на {this.state.correctCount} вопрос(а)</Text>
                <View style={{marginBottom: 15},{marginTop: 15}}>
                <Button
                    title="Начать новую игру"
                    onPress={() => this.props.navigation.navigate('gameFlow', {email: this.props.navigation.getParam("email")})}
                />
                </View>
                <View style={{marginBottom: 15},{marginTop: 15}}>
                <Button
                    title="Таблица игроков"
                    onPress={() => this.props.navigation.navigate('Dashboard', {email: this.props.navigation.getParam("email")})}
                />
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})