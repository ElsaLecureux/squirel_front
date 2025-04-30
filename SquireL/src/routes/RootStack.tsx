import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';

import AppDrawer from './AppDrawer';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack () {

    return (

    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Welcome"} >
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="SignIn" component={SignInScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="AppDrawer" component={AppDrawer}/>
    </Stack.Navigator>  
    )

}