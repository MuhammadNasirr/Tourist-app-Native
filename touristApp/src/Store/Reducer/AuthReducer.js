import Actions from "../Actions/AuthActions"


const initial_state = {
    NearbyPlaces: [],
    // Signup: "false",
    // isRegister: "false",
}

function AuthReducer(state = initial_state, action) {
    switch (action.type) {
        case Actions.ListSuccessfull:
            console.log(action.payload + 'heasd')
            return Object.assign({}, state, { NearbyPlaces: action.payload })

        // case Actions.Signup:
        //     return Object.assign({}, state, { Signup: "true", isRegister: "true" })

        default:
            return state
    }
}

export default AuthReducer
