class Actions{
    static ListSuccessfull = "LISTSUCCESSFULL"
    static ListDetails = "LISTDETAILS"
 //   static Longitude = "Longitude"
    
    static NearbyPlace(places){
        console.log(places)
        return {
            type:Actions.ListSuccessfull,
            payload: places
        }
    }
    static PlacesDetails(Details){
        console.log(Details)
        return {
            type:Actions.ListDetails,
            payload: Details
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