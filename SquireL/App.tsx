import './gesture-handler';

import { Button, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoadingScreen from './src/screens/LoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import PlayroomScreen from './src/screens/PlayRoomScreen/PlayroomScreen';
import MemoryScreen from './src/screens/MemoryScreen/MemoryScreen';

import HomeButton from './src/components/Buttons/HomeButton';

const Drawer = createDrawerNavigator();

function HomeDrawer({navigation}) {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerTransparent: true }}>
      <Drawer.Screen name="Home" component={ HomeScreen } />
      <Drawer.Screen 
        name="Profile" 
        component={ ProfileScreen } 
        options={{
          headerTitleStyle: {display:'none'},
          headerRight: () => {
            return <Button
                title='Home'
                onPress={() => navigation.navigate('Home')}
              />
            }
        }}
      />
      <Drawer.Screen name="Playroom" component={ PlayroomScreen } />
      <Drawer.Screen name="Memory" component={ MemoryScreen } />
    </Drawer.Navigator>
  );
}

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
          <Stack.Screen name="HomeDrawer" component={HomeDrawer}   />
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

