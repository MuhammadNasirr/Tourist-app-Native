import React, { Component } from 'react'
import { Text, View, ListView, ScrollView } from 'react-native'
import MapView from "react-native-maps"
import { Container, Button, Content, Card, CardItem, List, ListItem, Input, Footer } from 'native-base';
import { connect } from 'react-redux';
import Middleware from '../../Store/Middleware/Middleware';

function mapDispatchToProps(dispatch) {
    return {
        nearBySearch: (latitude, longitude) => {
            dispatch(Middleware.nearBySearch(latitude, longitude))
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
            region: null,

        }
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
    // componentWillMount() {
    //    let getCurrentPosition = navigator.geolocation.getCurrentPosition(this.watchID);

    // }

    onMapPress(e) {
        alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
        this.setState({
            marker: [
                {
                    coordinate: e.nativeEvent.coordinate

                },
            ],
        });
    }

    onRegionChange = (region) => {

        this.setState({ region: region })
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <View> */}
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
                {/* </View> */}
                 {/* <View> */}
                    {
                        (this.props.NearbyPlaces) ?
                            this.props.NearbyPlaces.map((pList, i) => {
                                console.log(pList.name)
                                return (
                                    <View key={i}>
                                        <ScrollView contentContainerStyle={styles.contentContainer}>
                                            <Text>
                                                {pList.name}
                                            </Text>
                                        </ScrollView>
                                    </View>
                                )
                            })
                            : null
                    }
                {/* </View>  */}
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(mapView)

const styles =
    {

        container: {
            position: 'absolute',
            // flexDirection: "column",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        contentContainer: {
            paddingVertical: 2
        },
        map: {
            flex: 1,
            position: 'absolute',
            // height: 200,
            top: 0,
            left: 0,
            right: 0,
            bottom: 300,
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



