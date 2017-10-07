import Actions from "../Actions/AuthActions"


const initial_state = {
    NearbyPlaces: [],
    PlacesDetails: [],
    DirectionDetail: [],
    // Signup: "false",
    // isRegister: "false",
}

function AuthReducer(state = initial_state, action) {
    switch (action.type) {
        case Actions.ListSuccessfull:
            console.log(action.payload + 'heasd')
            return Object.assign({}, state, { NearbyPlaces: action.payload })

        case Actions.ListDetails:
            return Object.assign({}, state, { PlacesDetails: action.payload })

        case Actions.GetDirection:
        console.log(action.payload)
            return Object.assign({}, state, { DirectionDetail: action.payload })

        default:
            return state
    }
}

export default AuthReducer
