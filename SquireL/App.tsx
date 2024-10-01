import './gesture-handler';

import { OverlayProvider } from "@gluestack-ui/overlay"
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"

import { StyleSheet, Platform } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './src/screens/LoadingScreen';
import RootStack from './src/routes/RootStack'

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

  return (
    <GluestackUIProvider mode="light">
      <OverlayProvider>
        <NavigationContainer >
          { isLoading ? <LoadingScreen/> :
            <RootStack/>
          }
        </NavigationContainer>
      </OverlayProvider>
      </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

