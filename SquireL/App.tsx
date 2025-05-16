import './gesture-handler';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { TamaguiProvider } from '@tamagui/core'
import config from './tamagui.config';

import { StyleSheet, Platform, useColorScheme } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './src/screens/LoadingScreen';
import RootStack from './src/routes/RootStack';

import { useFonts } from 'expo-font';
import { TOKEN_API_RADIO_FRANCE, URL_API_RADIO_FRANCE } from './env';

export default function App() {

  const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://localhost:8080', 'https://yourdomain.com'],
  config: {
    screens: {
      Welcome: 'welcome',
      SignIn: 'signin',
      SignUp: 'signup',
      AppDrawer: {
        screens: {
          HomeStack: {
            screens: {
              Home: 'home',
              Memory: 'memory',
            },
          },
          Profile: 'profile',
          PlayroomStack: {
            screens: {
              Playroom: 'playroom',
              Puzzle: 'puzzle',
              DrawingGame: 'drawing-game',
              LookAndFind: 'look-and-find',
              Library: 'library',
            },
          },
          DrawingsBox: 'drawings',
        },
      },
    },
  },
};

  const client = new ApolloClient({
    uri: `${URL_API_RADIO_FRANCE}`,
    cache: new InMemoryCache(),
    headers: {
      'x-token': `${TOKEN_API_RADIO_FRANCE}`
    }
  });
  console.log('in app token and url radiofrance', URL_API_RADIO_FRANCE, TOKEN_API_RADIO_FRANCE)

  const [isLoading, setIsloading] = useState(true);
  const colorScheme = useColorScheme()

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
    <TamaguiProvider config={config} defaultTheme={colorScheme!}>
      <ApolloProvider client={client}>
        <NavigationContainer 
        linking={linking}>
          { isLoading ? <LoadingScreen/> :
            <RootStack/>
          }
        </NavigationContainer>
      </ApolloProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});