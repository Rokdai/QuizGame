import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import * as firebase from 'firebase';
import 'firebase/firestore';
import { getUsers } from '../api/FireBaseApi';

export default class DashboardScreen extends React.Component {
    state = { currentUser: null, userList: [] };
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })

        getUsers(this.onUserRecieved);
    }

    onUserRecieved = (userList) => {
        this.setState({ userList: userList })
    }

    render() {
        const { userList } = this.state.userList;
        return (

            <FlatList
                data={this.state.userList}

                renderItem={({ item }) => (
                    <ListItem
                        containerStyle={[this.props.navigation.getParam("email") === item.email ? styles.myRow : null]}
                        title={item.email}
                        subtitle={'Общий счет - ' + item.score.toString()}
                    />
                )}
            />

        );
    }
}
const styles = StyleSheet.create({
    myRow: {
        backgroundColor: "#36B1F0"
    }
})