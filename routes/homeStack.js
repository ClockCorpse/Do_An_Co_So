import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createNavigator} from 'react-navigation';
import login from '../screens/login';
import profile from '../screens/profile';

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
    
}


const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack);
