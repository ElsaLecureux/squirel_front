import {ImageBackground, StyleSheet} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';

import { useEffect } from 'react';
import { Image } from 'react-native';

import { Button, Stack, Text, YStack, XStack } from 'tamagui';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function WelcomeScreen({ navigation }: Props) {

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
    <ImageBackground 
      style={styles.pageContainer} 
      source={require('../../assets/images/welcomeScreen.jpg')}
    >
      <XStack 
        flex={1}
      >
        <YStack
          flex={2}
          justifyContent="center"
          alignItems="flex-start"
          paddingLeft='2%'
        >
          <Image
            style={styles.titleWelcomePage}
            source={require('../../assets/images/titleWelcomePage3.png')}
          />
          <YStack
            alignItems="center" 
            width='100%'
            paddingTop='5%'
          >
            <Button
              size="$5"
              variant="outlined"
              theme="orange"
              width='auto' 
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text 
                fontSize={22} 
                fontFamily="MedievalSharp_400Regular" 
                color="#FF8A01"
              >
                Play
              </Text>
            </Button>
          </YStack>
        </YStack>
        <YStack flex={1}></YStack>
      </XStack>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  titleWelcomePage: {
    width: '82%',
    height: '20%',
    alignSelf: 'center'
  },
});
