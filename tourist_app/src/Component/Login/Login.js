import React, { Component } from 'react';
// import Button from '../../Tags/Button';
import Header from '../../Tags/Header';
// import Input from '../../Tags/Input';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';
import { Container,Button, Content, Card, CardItem, Input, Footer } from 'native-base';
import { View, Text, AsyncStorage, Image, StyleSheet, TextInput } from "react-native";
import * as firebase from "firebase";



function mapDispatchToProps(dispatch) {
    return {
        loginUser: (props, doctor) => {
            dispatch(Middleware.loginUser(props, doctor))  
        },
    }
}
function mapStateToProps(state) {
    return {

        // storeState: state
    }
}



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: '',
            users: []
        }
    }
    static navigationOptions = {
        title: 'Login Page',
        header: null,
    }

    componentWillMount() {
        console.disableYellowBox = true;
        AsyncStorage.getItem('Patient App', (err, result) => {
            if (result !== null) {
                let data = JSON.parse(result)
                var email = data.email
                var pass = data.pass
                firebase.auth().signInWithEmailAndPassword(email, pass)
                    .then((user) => {
                        this.props.navigation.navigate('tabnavigation')
                    })
            }
        })
    }

    LoginUser = () => {
        if (this.state.email == '' || this.state.pass == '') {
            alert('Enter Email and Password !')
        }
        else {

            var email = this.state.email;
            var pass = this.state.pass;

            var doctor = {
                email: email,
                pass: pass,
            }
            this.props.loginUser(this.props, doctor)
        }
    }

    render() {
        return (
            <Image source={require('../../Images/1.jpg')} style={styles.bgImage}>
                <Container style={styles.container}>
                    <Content style={{ width: 240, marginTop: 150 }} >
                        <Card style={{ width: 350, height: 300 }}>
                            <CardItem>
                                <TextInput
                                    style={{ width: 200, height: 40, color: '#000' }}
                                    placeholder="Email Address"
                                    placeholderTextColor="Blue"
                                    onChangeText={(email) => this.setState({ email })}
                                    underlineColorAndroid='blue'
                                    required
                                />
                            </CardItem>
                            <CardItem>
                                <TextInput
                                    style={{ width: 200, height: 40, color: '#000' }}
                                    placeholder="Password"
                                    placeholderTextColor="Blue"
                                    onChangeText={(pass) => this.setState({ pass })}
                                    underlineColorAndroid='blue'
                                    secureTextEntry={true}
                                />
                                </CardItem>
                                <CardItem>
                                <Button bordered  style={{ width:70,height:35, marginLeft:60  }} onPress={this.LoginUser}>
                                    <Text style={{ marginLeft: 15, color:'blue' }} >Login</Text>
                                </Button>
                                </CardItem>
                                <CardItem>
                                <Text style={{ color: 'blue', fontSize: 12, textAlign: 'center', marginTop: 10 }}> Forgot your login details?<Text style={{ fontWeight: 'bold', }}> Get login help.</Text> </Text>
                            </CardItem>
                        </Card>
                    </Content>
                    <Footer style={{backgroundColor:'#fff', height:40, marginBottom:10}}>
                        <Button bordered style={{ padding: 10, width: 240 }} onPress={() => { this.props.navigation.navigate('signup') }}>
                            <Text style={{marginLeft: 40, color: 'blue', }} >Create an account </Text>
                        </Button>
                    </Footer>

                </Container>
            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        resizeMode: 'stretch',

    },
})