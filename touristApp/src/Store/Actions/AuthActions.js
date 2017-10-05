class Actions{
    static ListSuccessfull = "LISTSUCCESSFULL"
 //   static Longitude = "Longitude"
    
    static NearbyPlace(places){
        console.log(places)
        return {
            type:Actions.ListSuccessfull,
            payload: places
        }
    }
    // static SignupAction(signup){
    //     return {
    //         type:Actions.Signup,
    //         signup
    //     }
    // }
}

export default Actions;