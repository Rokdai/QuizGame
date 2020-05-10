import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView, Alert  } from "react-native";

import { Button, ButtonContainer } from "../components/Button";
import { MyAlert } from "../components/Alert";
import { getQuestions, addScore } from '../api/FireBaseApi';

export default class GameScreen extends React.Component {
    static navigationOptions = {
        headerMode: 'none'
    };

    state = {
        email: "",
        correctCount: 0,
        totalCount: 0,
        activeQuestionIndex: 0,
        answered: false,
        answerCorrect: false,
        questions: [],
        timePassed:false
    };

    componentDidMount() {
        getQuestions(this.onQuestionRecieved);
    }

    onUpdateScore = () => {
        return this.props.navigation.navigate('Dashboard');
    }

    onQuestionRecieved = (questionList) => {
        this.setState({ questions: questionList, totalCount: questionList.length })
    }

    answer = (answer, correct_answer) => {
        this.setState(
            state => {
                const nextState = { answered: true };

                if (answer === correct_answer) {
                    nextState.correctCount = state.correctCount + 1;
                    nextState.answerCorrect = true;
                } else {
                    nextState.answerCorrect = false;
                }

                return nextState;
            },
            () => {
                setTimeout(() => this.nextQuestion(), 750);
            }
        );
    };

    nextQuestion = () => {
        this.setState(state => {
            const nextIndex = state.activeQuestionIndex + 1;

            if (nextIndex >= state.totalCount) {
                addScore(this.props.navigation.getParam("email"), this.state.correctCount),
                () => {
                    setTimeout(() => {},850);
                };
                return this.props.navigation.navigate('Result', {correctCount: this.state.correctCount, email: this.props.navigation.getParam("email")});
            }

            return {
                activeQuestionIndex: nextIndex,
                answered: false
            };
        });
    };


    render() {
        const questions = this.state.questions;
        const question = questions[this.state.activeQuestionIndex];

        if (questions.length === 0) {
            return (<></>);
        }

        return (

            <View
                style={[
                    styles.container,
                    { backgroundColor: "#36B1F0" }
                ]}
            >
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.safearea}>
                    <View>
                        <Text style={styles.text}>{question.question_text}</Text>

                        <ButtonContainer>
                            <Button
                                key={1}
                                text={question.answer_1}
                                onPress={() => this.answer(question.answer_1, question.correct_answer)}
                            />
                            <Button
                                key={2}
                                text={question.answer_2}
                                onPress={() => this.answer(question.answer_2, question.correct_answer)}
                            />
                            <Button
                                key={3}
                                text={question.answer_3}
                                onPress={() => this.answer(question.answer_3, question.correct_answer)}
                            />
                            <Button
                                key={4}
                                text={question.answer_4}
                                onPress={() => this.answer(question.answer_4, question.correct_answer)}
                            />
                        </ButtonContainer>
                    </View>

                    <Text style={styles.text}>
                        {`${this.state.correctCount}/${this.state.totalCount}`}
                    </Text>
                </SafeAreaView>
                <MyAlert
                    correct={this.state.answerCorrect}
                    visible={this.state.answered}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#36B1F0",
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: "#fff",
        fontSize: 25,
        textAlign: "center",
        letterSpacing: -0.02,
        fontWeight: "600"
    },
    safearea: {
        flex: 1,
        marginTop: 100,
        justifyContent: "space-between"
    }
});