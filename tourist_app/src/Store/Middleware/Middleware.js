import * as firebase from 'firebase';
import Actions from '../Actions/AuthActions';
import { AsyncStorage } from "react-native";


class Middleware {
    static signupUser(docDetails) {
        console.log(docDetails)
        return (dispatch) => {
            let auth = firebase.auth();
            auth.createUserWithEmailAndPassword(docDetails.email, docDetails.pass)
                .then((user) => {
                    uid = user.uid;
                    docDetails._id = uid;
                    firebase.database().ref(`Users/${uid}`).set(docDetails);
                    dispatch(Actions.SignupAction())
                    // props.navigation.navigate('login')
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
        }
    }
    static loginUser(props, docDetails) {
        return (dispatch) => {
            let auth = firebase.auth();
            auth.signInWithEmailAndPassword(docDetails.email, docDetails.pass)
                .then(async(user) => {
                    alert('Successfully Login!')
                    props.navigation.navigate('tabnavigation')
                    await AsyncStorage.removeItem('xyz');
                    let currentUser = { email: docDetails.email, pass: docDetails.pass, _id: user.uid };
                    await AsyncStorage.setItem('xyz', JSON.stringify(currentUser));
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMesssage = error.message;
                    alert(errorMesssage)
                })
            console.log(docDetails, 'asdasd')

            dispatch(Actions.LoginAction())
        }
    }
    static createPatient(patient) {
        return (dispatch) => {
            
            let docId = patient.docID
            firebase.database().ref(`Patients/${docId}`).push(patient);
            console.log(patient);
        }
    }
}
export default Middleware;