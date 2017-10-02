import Actions from "../Actions/AuthActions"


const initial_state = {
    Login: "false",
    Signup: "false",
    isRegister: "false",
}

function AuthReducer(state = initial_state, action) {
    switch (action.type) {
        case Actions.Login:
            return Object.assign({}, state, { Login: "true", isRegister: "true" })

        case Actions.Signup:
            return Object.assign({}, state, { Signup: "true", isRegister: "true" })

        default:
            return state
    }
}

export default AuthReducer
