import './gesture-handler';

import { TamaguiProvider, createTamagui } from '@tamagui/core'
import { config } from '@tamagui/config/v3'

import { StyleSheet, Platform } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './src/screens/LoadingScreen';
import RootStack from './src/routes/RootStack';

import { useFonts } from 'expo-font'

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
interface TamaguiCustomConfig extends Conf {}
};


export default function App() {

  const [isLoading, setIsloading] = useState(true);
  

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then(() => setTimeout(() => {setIsloading(false)}, 2000));
  }

  useEffect(() => {
    if (Platform.OS !== 'web') {
    changeScreenOrientation();
    } else {
      setIsloading(false);
    }
  },[]);

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  if (!loaded) {
    return null
  }  

  return (    
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer >
        { isLoading ? <LoadingScreen/> :
          <RootStack/>
        }
      </NavigationContainer>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

