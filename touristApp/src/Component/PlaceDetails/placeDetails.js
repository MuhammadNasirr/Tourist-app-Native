import React, { Component } from 'react'
import { Text, View, ListView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from "react-native-maps"
import { Container, Button, Content, Card, CardItem, List, ListItem, Input, Footer } from 'native-base';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';


function mapDispatchToProps(dispatch) {
    return {
        placesDetails: (placeid) => {
            dispatch(Middleware.placesDetails(placeid))
        },
    }
}
function mapStateToProps(state) {
    return {

        PlacesDetails: state.Patients.PlacesDetails
    }
    console.log(PlacesDetails)
}


class PlacesDetails extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <View>
                <Text>
                    asdasdasd
            </Text>
            </View>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlacesDetails)
