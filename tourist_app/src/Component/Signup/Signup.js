import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Icon, Footer } from 'native-base';
import { View, Text, AsyncStorage, Image, StyleSheet, TextInput } from "react-native"
import Button from '../../Tags/Button';
import Header from '../../Tags/Header';
// import Inputrr from '../../Tags/Input';
import Spinner from '../../Tags/Spinner';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';


function mapDispatchToProps(dispatch) {
    return {
        signupUser: (users) =>  dispatch(Middleware.signupUser(users))
        
    }
}
function mapStateToProps(state) {
    return {

        signup: state.Signup.signup,
    }
}


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname: '',
            surname: '',
            email: '',
            password: '',
            usersAllData: [],
            user: [],
        }
    }
    static navigationOptions = {
        title: "Create an account",

    }
    componentWillReceiveProps(props) {
        if (props.signup) {
            this.setState({ usersAllData: props.signup })
        }
        console.log("props", props.signup)
    }
    componentWillMount() {
        console.disableYellowBox = true
    }

    SignupUser = (e) => {
        var userDetails = {
            fullname: this.state.fullname,
            surname: this.state.surname,
            email: this.state.email,
            pass: this.state.password,
        }
        this.props.signupUser(userDetails)
    }

    render() {
        return (
            <Image source={require('../../Images/1.jpg')} style={styles.bgImage}>
                <Container style={styles.container}>
                    <Content style={{ width: 240, marginTop: 100 }} >
                        <TextInput
                            style={{ height: 40, color: '#fff' }}
                            placeholder="Full Name"
                            placeholderTextColor="white"
                            onChangeText={(fullname) => this.setState({ fullname })}
                            underlineColorAndroid='#fff'

                        />
                        <TextInput
                            style={{ height: 40, color: '#fff' }}
                            placeholder="Surname"
                            placeholderTextColor="white"
                            onChangeText={(surname) => this.setState({ surname })}
                            underlineColorAndroid='#fff'

                        />
                        <TextInput
                            style={{ height: 40, color: '#fff' }}
                            placeholder="Email Address.."
                            placeholderTextColor="white"
                            onChangeText={(email) => this.setState({ email })}
                            underlineColorAndroid='#fff'

                        />
                        <TextInput
                            style={{ height: 40, color: '#fff' }}
                            placeholder="Password"
                            placeholderTextColor="white"
                            onChangeText={(password) => this.setState({ password })}
                            underlineColorAndroid='#fff'
                            secureTextEntry={true}
                        />
                        <Button block rounded style={{ marginTop: 20, backgroundColor: 'rgba(255,255,255, 0.3 )', padding: 10, width: 240 }} onPress={this.SignupUser}>
                            <Text style={{ color: '#fff', }} >Sign up</Text>
                        </Button>
                        {
                            (this.props.signup) ?
                                this.props.signup.map((user, i) => {
                                    console.log(user.fname)
                                    return (<View key={i}>
                                        <Text style={{ color: '#fff' }}>{user.fullname}</Text>
                                        {/* {keys.users.map((p, i) => {
                                    return (
                                        <View key={i + 1}>
                                            <Text >{p.fname}</Text>
                                            <Text >{p.email}</Text>
                                        </View>
                                    )
                                })} */}
                                    </View>
                                    )
                                })
                                : null
                        }
                        <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 10 }}> Forgot your login details?<Text style={{ fontWeight: 'bold', }}> Get login help.</Text> </Text>
                    </Content>
                    <Footer style={{ height: 100 }}>
                        <Button block rounded style={{ backgroundColor: 'rgba(45,92,227, 0.7 )', padding: 10, width: 240 }} onPress={() => { this.props.navigation.navigate('login') }}>
                            <Text style={{ color: '#fff', }} >Already have account </Text>
                        </Button>
                    </Footer>

                </Container>
            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

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

    }
})