import React, { Component } from 'react'
import * as firebase from "firebase";
import { View, Text } from "react-native"
import Naviagte from "./nav"
import { Container, Header, Root } from 'native-base'
import store from './Store';
import { Provider } from 'react-redux';

var config = {
    apiKey: "AIzaSyDvaa0UPh2q-0LbbSNv6DrxTlOkeS2heSo",
    authDomain: "tourist-app-d4382.firebaseapp.com",
    databaseURL: "https://tourist-app-d4382.firebaseio.com",
    projectId: "tourist-app-d4382",
    storageBucket: "tourist-app-d4382.appspot.com",
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