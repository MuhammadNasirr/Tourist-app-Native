class Actions{
    static ListSuccessfull = "LISTSUCCESSFULL"
    static ListDetails = "LISTDETAILS"
    static GetDirection = "GETDIRECTION"
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
    static GetDirections(direction){
        console.log(direction)
        return {
            type:Actions.GetDirection,
            payload: direction
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