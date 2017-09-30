import React, { Component } from 'react'
import * as firebase from "firebase";
import { View, Text } from "react-native"
import Naviagte from "./nav"
import { Container, Header, Root } from 'native-base'
import store from './Store';
import { Provider } from 'react-redux';

var config = {
    apiKey: "AIzaSyB8AFUSD88a6unJUTzcSb633oT-5dSTBwg",
    authDomain: "tourist-app-d4382.firebaseapp.com",
    databaseURL: "https://tourist-app-d4382.firebaseio.com",
    projectId: "tourist-app-d4382",
    storageBucket: "",
    messagingSenderId: "12141947090"
};
firebase.initializeApp(config);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root>
                    <Naviagte />
                </Root>
            </Provider>
        )
    }
}
export default App