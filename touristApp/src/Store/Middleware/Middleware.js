import * as firebase from 'firebase';
import Actions from '../Actions/AuthActions';
// import { AsyncStorage } from "react-native";
import axios from "axios";


class Middleware {
    static nearBySearch (latitude, longitude) {
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
        console.log(place_id)
        return (dispatch) => {
            axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=AIzaSyAp6kHID6XYltx5WE14dKibMJugHozKlas`)
                .then((response) => {
                    console.log(response.place_id);
                    callback(response.data.result)
                    // props.navigation.navigate('PlaceDetails')
                    dispatch(Actions.placesDetails(response.data.result))
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