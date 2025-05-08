import './gesture-handler';

import { UserProvider } from './src/context/UserContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { TamaguiProvider } from '@tamagui/core'
import config from './tamagui.config';

import { StyleSheet, Platform, useColorScheme } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './src/screens/LoadingScreen';
import RootStack from './src/routes/RootStack';

import { useFonts } from 'expo-font';
import { TOKEN_API_RADIO_FRANCE } from '@env';

export default function App() {

  const TOKEN_RADIO_FRANCE= process.env.TOKEN_API_RADIO_FRANCE;
  const URL_API_RADIO_FRANCE = `https://openapi.radiofrance.fr/v1/graphql`;

  const client = new ApolloClient({
    uri: `${URL_API_RADIO_FRANCE}`,
    cache: new InMemoryCache(),
    headers: {
      'x-token': `${TOKEN_RADIO_FRANCE}`
    }
  });

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
        <UserProvider>   
          <NavigationContainer >
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