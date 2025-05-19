import './gesture-handler';

import { UserProvider } from './src/context/UserContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { TamaguiProvider } from '@tamagui/core'
import config from './tamagui.config';

import { StyleSheet, Platform, useColorScheme } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

import { LinkingOptions, NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './src/screens/LoadingScreen';
import RootStack from './src/routes/RootStack';

import { BubblegumSans_400Regular } from '@expo-google-fonts/bubblegum-sans';
import { MysteryQuest_400Regular } from '@expo-google-fonts/mystery-quest';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { useFonts } from 'expo-font';
import { TOKEN_API_RADIO_FRANCE, URL_API_RADIO_FRANCE } from '@env';

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

  const [isLoading, setIsloading] = useState(true);
  const colorScheme = useColorScheme()

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then(() => setTimeout(() => {setIsloading(false)}, 2000));
  }

    const [loaded, error] = useFonts({
    MedievalSharp_400Regular,
    MysteryQuest_400Regular,
    BubblegumSans_400Regular,
  });

  useEffect(() => {
    if (Platform.OS !== 'web') {
    changeScreenOrientation();
    } else {
      setIsloading(false);
    }
  },[]);

  if (!loaded) {
    return null
  }  

  return ( 
    <TamaguiProvider config={config} defaultTheme={colorScheme!}>
      <ApolloProvider client={client}>
        <UserProvider>   
          <NavigationContainer 
          linking={linking}>
            { isLoading ? <LoadingScreen/> :
              <RootStack/>
            }
          </NavigationContainer>
         </UserProvider>
      </ApolloProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});