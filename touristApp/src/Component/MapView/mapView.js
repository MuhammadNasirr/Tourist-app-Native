// import React, { Component } from 'react';
// import { Container, Button, Content, Card, CardItem, Input, Footer } from 'native-base';
// import { View, Text, AsyncStorage, Image, StyleSheet, TextInput } from "react-native";
// import  MapView  from 'react-native-maps';


// class mapView extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             region: {
//                 latitude: 65.9667,
//                 longitude: -18.5333,
//                 altitude: 15.0444,
//                 latitudeDelta: 0.015,
//                 longitudeDelta: 0.0121,
//             }
//         }
//     }
//     onRegionChange = (region) => {

//         this.setState({ region: region })
//     }
//     render() {
//         return (
//             <View style={styles.container}>
//                 <MapView
//                     mapType="satellite"
//                     showsUserLocation={true}
//                     followsUserLocation={true}
//                     showsCompass={false}
//                     showsPointOfInternet={false}
//                     style={styles.map}
//                     region={this.state.region}
//                     onRegionChange={this.onRegionChange}

//                 >
//                     {/* <MapView.Marker
//                         coordinate={{ latitude: 65.9667, longitude: -18.5333 }}

//                     > */}
//                     {/* <View style={styles.pin}> */}
//                     {/* <Image style={styles.pinImage} source={require("./image/logo.png")} /> */}
//                     {/* <Text style={styles.pinText}> */}
//                     {/* Click me */}
//                     {/* </Text> */}
//                     {/* </View> */}
//                     {/* <MapView.Callout>
//                             <View style={styles.callout}>
//                                 {<Image style={styles.calloutPhoto} source={require("./image/hotal.jpg")} />}
//                                 <Text style={styles.calloutTitle}>Victory Hotal</Text>
//                                 <Text>This is a nice hotal for stay</Text>
//                             </View>
//                         </MapView.Callout> */}
//                     {/* </MapView.Marker> */}
//                 </MapView>
//                 <View style={styles.container}>
//                     <Text>
//                         latitude:{this.state.region.latitude}{'\n'}
//                         longitude:{this.state.region.longitude}{'\n'}
//                         latitudeDelta:{this.state.region.latitudeDelta}{'\n'}
//                         longitudeDelta:{this.state.region.longitudeDelta}{'\n'}
//                     </Text>
//                 </View>
//                 {/* <Button >
//                       <Text>get current loction</Text>
//                   </Button> */}
//             </View>
//         );
//     }
// }
// export default mapView;

// const styles = StyleSheet.create({
//     container: {
//         position: 'absolute',
//         // flex:1,
//         // ...StyleSheet.absoluteFillObject,
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         position: 'absolute',
//         // flex: 1,
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         // height: 450

//     },
//     pin: {
//         backgroundColor: "#fffa",
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderColor: 'black',
//         borderWidth: 1,
//         padding: 5,
//         borderRadius: 5
//     },
//     pinImage: {
//         width: 20,
//         height: 20
//     },
//     pinText: {
//         color: 'red'
//     }
//     ,
//     callout: {
//         flex: 1,
//         paddingRight: 10,
//         paddingBottom: 10,
//         marginBottom: 10,
//         marginRight: 10
//     },
//     calloutPhoto: {
//         flex: 1,
//         width: 200,
//         height: 80
//     },
//     calloutTitle: {
//         fontSize: 16
//     }
// });




import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MapView from "react-native-maps"
import { Container, Button, Content, Card, CardItem, Input, Footer } from 'native-base';

// var { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 19.0760;
// const LONGITUDE = 72.8777;
// const LATITUDE_DELTA = 0.01;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class mapView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: null,
            // marker: {
            //     latlng: {
            //         latitude: null,
            //         longitude: null,
            //         latitudeDelta: LATITUDE_DELTA,
            //         longitudeDelta: LONGITUDE_DELTA
            //     }
            // }
        }
    }
    // static requestAuthorization()
    // static getCurrentPosition(geo_success, geo_error, geo_options)
    // static watchPosition(success, error, options)
    // static clearWatch(watchID)
    // static stopObserving()
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        altitude: 15.0444,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }
                });
                // alert("value:" + position);
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
                    // provider={PROVIDER_DEFAULT}
                    /* {mapType="standard"} */
                    zoomEnabled={true}
                    pitchEnabled={true}
                    /* showsUserLocation={true} */
                    /* followsUserLocation={true} */
                    /* showsCompass={true} */
                    showsBuildings={true}
                    showsTraffic={true}
                    showsIndoors={true}>

                    <MapView.Marker
                        coordinate={{ latitude: 65.9667, longitude:  -18.5333 }}

                    >
                        <View style={styles.pin}>
                            {/* <Image style={styles.pinImage} source={require("./image/logo.png")} /> */}
                            <Text style={styles.pinText}>
                                Click me
                    </Text>
                        </View>
                        <MapView.Callout>
                            <View style={styles.callout}>
                                {/* <Image style={styles.calloutPhoto} source={require("./image/hotal.jpg")} /> */}
                                <Text style={styles.calloutTitle}>Victory Hotal</Text>
                                <Text>This is a nice hotal for stay</Text>
                            </View>
                        </MapView.Callout>
                    </MapView.Marker>
                </MapView>
                {/* <View style={styles.container}>
                    <Text>
                        latitude:{this.state.region.latitude}{'\n'}
                        longitude:{this.state.region.longitude}{'\n'}
                        latitudeDelta:{this.state.region.latitudeDelta}{'\n'}
                        longitudeDelta:{this.state.region.longitudeDelta}{'\n'}
                    </Text>
                </View> */}
                {/* <Button >
                    <Text>get current loction</Text>
                </Button> */}
            </View>
        )
    }
}


const styles =
    {

        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        map: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 300,
        },
        pin: {
            backgroundColor: "#fffa",
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'black',
            borderWidth: 1,
            padding: 5,
            borderRadius: 5
        },
        pinImage: {
            width: 20,
            height: 20
        },
        pinText: {
            color: 'red'
        }
        ,
        callout: {
            flex: 1,
            paddingRight: 10,
            paddingBottom: 10,
            marginBottom: 10,
            marginRight: 10
        },
        calloutPhoto: {
            flex: 1,
            width: 200,
            height: 80
        },
        calloutTitle: {
            fontSize: 16
        }


    }
export default mapView;



