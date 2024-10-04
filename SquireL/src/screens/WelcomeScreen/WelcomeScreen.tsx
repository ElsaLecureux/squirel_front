import {ImageBackground, StyleSheet} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';

import { useEffect } from 'react';

import { Button, Stack, Text, XStack, YStack } from 'tamagui';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function WelcomeScreen({ navigation}: Props) {

  const [loaded, error] = useFonts({
    MedievalSharp_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    } else if (error) {
      console.log('Error loading fonts:', error);
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/welcomeScreen.jpg')}>
        <Stack
         flex={1}
         justifyContent="center"
         alignItems="flex-start"
         paddingLeft='10%'>
          <Stack
          alignSelf="flex-start">
            <Stack
            alignItems="center"
            marginBottom={20}>
              <Text fontSize={30} fontFamily='MedievalSharp_400Regular' color='#fff'>
                Welcome to SquireL
              </Text>
            </Stack>
            <Stack
            alignItems="center"
            >
              <Button size="$5" variant="outlined" theme='orange' width='auto'
              onPress={() => navigation.navigate('SignIn')}>
                <Text fontSize={22} fontFamily='MedievalSharp_400Regular' color='#FF8A01'>
                  Play
                </Text>
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
  pageContainer: {
  flex: 1,
  backgroundColor: '#000000',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
},
});
