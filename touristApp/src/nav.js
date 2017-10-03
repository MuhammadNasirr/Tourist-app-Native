import { StackNavigator, TabNavigator } from "react-navigation";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
// import HomePage from "./Components/HomePage/homePage";
import mapView from "./Component/MapView/mapView";
// import PatientList from "./Component/PatientList/PatientList";
// import TabNavigation from "./Component/TabNavigation/TabNavigation";
// import Profile from './Components/Profile/profile';
// import TabsNav from './Components/TabsNav/tabsNav';

const Naviagte = StackNavigator({
    // login: { screen: Login },
    // profile: {screen: Profile},
    // patientList: { screen: PatientList },   
    // tabnavigation: { screen: TabNavigation },
    // tabsnav: { screen: TabsNav },
    MapVeiw: { screen: mapView },
    // homePage: { screen: HomePage },
    signup: { screen: Signup },
})

export default Naviagte;
