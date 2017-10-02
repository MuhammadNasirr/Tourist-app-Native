class Actions{
    static Login = "Login"
    static Signup = "Signup"
    
    static LoginAction(login){
        return {
            type:Actions.Login,
            login
        }
    }
    static SignupAction(signup){
        return {
            type:Actions.Signup,
            signup
        }
    }
}

export default Actions;