import * as firebase from 'firebase';
import Actions from '../Actions/AuthActions';
import Polyline from '@mapbox/polyline';
// import { AsyncStorage } from "react-native";
import axios from "axios";

const initialLat = '';
const initialLon = '';
class Middleware {
    static nearBySearch (latitude, longitude) {
        initialLat = latitude;
        initialLon = longitude;
        console.log(latitude, longitude)
        return (dispatch) => {
             axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&key=AIzaSyAp6kHID6XYltx5WE14dKibMJugHozKlas`)
                .then((response) => {
                    console.log(response.data.results);
                    dispatch(Actions.NearbyPlace(response.data.results))
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
    static placesDetails (place_id, callback) {
        let placeid = place_id.place_id;
        console.log(place_id.place_id)
        return (dispatch) => {
            axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=AIzaSyAp6kHID6XYltx5WE14dKibMJugHozKlas`)
                .then((response) => {
                    console.log(response.data.result);
                    callback(response.data.result)
                    // props.navigation.navigate('PlaceDetails')
                    dispatch(Actions.PlacesDetails(response.data.result))
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }

    static getDirections (destinationLoc) {
        startLoc = {initialLat, initialLon};
        console.log(destinationLoc)
        console.log(startLoc)
        // let placeid = place_id.place_id;
        // console.log(place_id.place_id)
        return (dispatch) => {
           let direction = axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
                .then((response) => {
                    console.log(response)
                    let directionJson = direction.json();
                    let points = Polyline.decode(directionJson.routes[0].overview_polyline.points);
                    let coords = points.map((point, index) => {
                        return  {
                            latitude : point[0],
                            longitude : point[1]
                        }
                    })
                    console.log(coords)
                    // dispatch(Actions.GetDirections(response,coords))
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
    // static loginUser(props, docDetails) {
    //     return (dispatch) => {
    //         let auth = firebase.auth();
    //         auth.signInWithEmailAndPassword(docDetails.email, docDetails.pass)
    //             .then(async(user) => {
    //                 alert('Successfully Login!')
    //                 props.navigation.navigate('MapVeiw')
    //                 await AsyncStorage.removeItem('xyz');
    //                 let currentUser = { email: docDetails.email, pass: docDetails.pass, _id: user.uid };
    //                 await AsyncStorage.setItem('xyz', JSON.stringify(currentUser));
    //             })
    //             .catch(function (error) {
    //                 var errorCode = error.code;
    //                 var errorMesssage = error.message;
    //                 alert(errorMesssage + "asd")
    //             })
    //         console.log(docDetails, 'asdasd')

    //         dispatch(Actions.LoginAction())
    //     }
    // }
}
export default Middleware;
