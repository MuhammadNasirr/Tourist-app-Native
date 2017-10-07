import React, { Component } from 'react'
import { Text, View, ListView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import MapView from "react-native-maps"
import { Container, Button, Content, Card, CardItem, List, ListItem, Thumbnail, Body, Input, Footer } from 'native-base';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';

function mapDispatchToProps(dispatch) {
    return {
        nearBySearch: (latitude, longitude) => {
            dispatch(Middleware.nearBySearch(latitude, longitude))
        },
        placesDetails: (placeid, callback) => {
            dispatch(Middleware.placesDetails(placeid, callback))
        },
    }
}
function mapStateToProps(state) {
    return {

        NearbyPlaces: state.Patients.NearbyPlaces
    }
    console.log(NearbyPlaces)
}

class mapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 24.871641,
                longitude: 67.059906,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            },

        }
    }
    static navigationOptions = {
        title: "Tourist Guide",

    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.results + 'asd')
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        altitude: 15.0444,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }
                });
                this.props.nearBySearch(position.coords.latitude, position.coords.longitude)
            },
            (error) => {
                console.log(error)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
        );
    }



    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }


    onMapPress(e) {
        // alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
        this.setState({
            marker: [
                {
                    coordinate: e.nativeEvent.coordinate

                },
            ],
        });
    }
    _onPressButton = (place_id) => {

        console.log(place_id)
        console.log(this.props.placesDetails)
        this.props.placesDetails(place_id);

        this.props.navigation.navigate('PlaceDetails', place_id)
    }

    onRegionChange = (region) => {
        this.setState({ region: region })
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.view1}>
                        <MapView
                            provider="google"
                            style={styles.map}
                            showsUserLocation={true}
                            followsUserLocation={true}
                            showsCompass={false}
                            showsPointOfInternet={false}
                            region={this.state.region}
                            onRegionChange={this.onRegionChange}
                            mapType="standard"
                            onPress={this.onMapPress.bind(this)}
                            zoomEnabled={true}
                            pitchEnabled={true}
                            showsBuildings={true}
                            showsTraffic={true}
                            showsIndoors={true}>
                        </MapView>
                    </View>
                    <View style={styles.view2}>

                        {
                            (this.props.NearbyPlaces) ?
                                this.props.NearbyPlaces.map((place, i) => {
                                    console.log(place.name)
                                    return (
                                        // <ScrollView horizontal={true}>
                                        <ListItem onPress={() => { this._onPressButton(place) }} key={i} style={{ marginLeft: 10, marginRight: 10 }}>
                                            <Thumbnail square size={80} source={{ uri: place.icon }} />
                                            <Body style={{ marginLeft: 10, }}>
                                                <Text>{place.name}</Text>
                                                {/* {console.log(placesDetails+"asdasdasd")} */}
                                            </Body>
                                        </ListItem>
                                        // </ScrollView>
                                        // <View >
                                        // <TouchableOpacity
                                        //     key={i}
                                        //     onPress={this._onPressButton(pList.place_id).bind(this)}
                                        // >
                                        //     <View style={styles.button}>
                                        //         <Text style={styles.buttonText}>{pList.name}</Text>
                                        //     </View>
                                        // </TouchableOpacity>


                                        // </View>
                                    )
                                })
                                : null
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(mapView)

const styles =
    {

        container: {
            // position: 'absolute',
            flexDirection: "column",
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
            ...StyleSheet.absoluteFillObject,

            flex: 1,
            justifyContent: 'flex-end',
            // alignItems: 'center',
        },
        // contentContainer: {
        //     paddingVertical: 2
        // },
        map: {
            flex: 1,
            height:450,
            justifyContent: 'flex-end',
            ...StyleSheet.absoluteFillObject,
            alignItems: 'center',
            // position: 'absolute',
            // height: '50%',
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 300,

        },
        view2: {
            flex: 2,
            marginTop: 450,
            // ...StyleSheet.absoluteFillObject,

            // position: 'absolute',
            // alignItems: 'left',


        },
        view1: {
            height: 200,
            flex: 2,
            ...StyleSheet.absoluteFillObject,

        },
        button: {
            // marginBottom: 30,
            width: 260,
            // alignItems: 'center',
            backgroundColor: '#2196F3'
        },
        // pin: {
        //     backgroundColor: "#fffa",
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     borderColor: 'black',
        //     borderWidth: 1,
        //     padding: 5,
        //     borderRadius: 5
        // },
        // pinImage: {
        //     width: 20,
        //     height: 20
        // },
        // pinText: {
        //     color: 'red'
        // }
        // ,
        // callout: {
        //     flex: 1,
        //     paddingRight: 10,
        //     paddingBottom: 10,
        //     marginBottom: 10,
        //     marginRight: 10
        // },
        // calloutPhoto: {
        //     flex: 1,
        //     width: 200,
        //     height: 80
        // },
        // calloutTitle: {
        //     fontSize: 16
        // }


    }
// export default mapView;



