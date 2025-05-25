import './gesture-handler';

import { UserProvider } from './src/context/UserContext';

import { TamaguiProvider } from '@tamagui/core';
import config from './tamagui.config';

import { Platform, useColorScheme } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './src/screens/LoadingScreen';
import RootStack from './src/routes/RootStack';

import { useFonts } from 'expo-font';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then(() =>
      setTimeout(() => {
        setIsLoading(false);
      }, 2000),
    );
  }

  useEffect(() => {
    if (Platform.OS !== 'web') {
      changeScreenOrientation();
    } else {
      setIsLoading(false);
    }
  }, []);

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme!}>
      <UserProvider>
        <NavigationContainer>{isLoading ? <LoadingScreen /> : <RootStack />}</NavigationContainer>
      </UserProvider>
    </TamaguiProvider>
  );
}
