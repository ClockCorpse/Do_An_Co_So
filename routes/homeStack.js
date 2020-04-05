import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createNavigator} from 'react-navigation';
import login from '../screens/login';
import profile from '../screens/profile';
import chgpass from '../screens/changepass';
import scan from '../screens/scan';

// Basically the map for the app, allows the app to navigate between activities

const screens = {
    
    Default:{
        screen: login,
        navigationOptions:{
            headerShown:false,
        }
    },
    Profile:{
        screen: profile,
        navigationOptions:{
            headerShown:false,
        }
    },
    ChangePass:{
        screen: chgpass,
        navigationOptions:{
            headerShown:false,
        }
    },
    Scan:{
        screen: scan,
    },
    
}


const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
