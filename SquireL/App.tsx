import { StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from './src/screens/LoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoading, setIsloading] = useState(true);
  

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then(() => setTimeout(() => {setIsloading(false)}, 2000));
  }

  useEffect(() => {
    changeScreenOrientation();
  },[]);

  return (    
    <NavigationContainer >  
      { isLoading ? <LoadingScreen/> :
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeScreen">
       <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}   />
       <Stack.Screen name="SignInScreen" component={SignInScreen}   />
       <Stack.Screen name="SignUpScreen" component={SignUpScreen}   />
      </Stack.Navigator>  
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

