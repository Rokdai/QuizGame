import * as firebase from 'firebase';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { firebaseConfig } from './config'

import MainScreen from './src/screens/MainScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';

firebase.initializeApp(firebaseConfig);

const switchNavigator = createSwitchNavigator({
  Loading: { screen: LoadingScreen },

  loginFlow: createStackNavigator({
    SignIn: {screen: SignInScreen, navigationOptions: {title:"Вход"}},
    SignUp: {screen: SignUpScreen, navigationOptions: {title:"Регистрация"}}
  }),

  mainFlow: createStackNavigator({
    Main: {screen: MainScreen, navigationOptions: {title:"Главный экран"}},
    Dashboard: {screen: DashboardScreen, navigationOptions: {title:"Таблица участников"}},
    
  }),
  gameFlow: {screen: GameScreen, navigationOptions: {title:"QUIZ игра", headerShown: false}},
  Result: ResultScreen
}, {
  initialRouteName: 'Loading'
});

export default createAppContainer(switchNavigator);