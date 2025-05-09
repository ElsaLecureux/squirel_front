import { Platform, ImageBackground, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, Text, YStack, XStack } from 'tamagui';
import { jwtDecode } from "jwt-decode";
import * as SecureStore from 'expo-secure-store';
import { useUser } from '../../context/UserContext';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList,'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function WelcomeScreen({ navigation }: Props) {

  const { setUserId } = useUser();

  const checkIfSignedIn = async () => {
    let token: string | null = null;
    if(Platform.OS === 'web') {
      token = localStorage.getItem('access_token');
    } else if (Platform.OS === 'ios' || Platform.OS === 'android') {
      token =  await SecureStore.getItemAsync('access_token');
    }
    if (token){
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp != undefined && decodedToken.exp > Date.now()/1000 && decodedToken.sub) {
        setUserId(decodedToken.sub)
        navigation.navigate('AppDrawer');
        return;
      }
      navigation.navigate('SignIn')
    } else {
      navigation.navigate('SignIn')
    }
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
              size={ Platform.OS === 'web' ? "$8" : "$5" }
              variant="outlined"
              borderColor="#FF8A01" 
              width='auto' 
              onPress={() => checkIfSignedIn()}
            >
              <Text 
                fontSize={Platform.OS === 'web' ? 38 : 24 }
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
    width: '100%',
    height: '100%',
  },
  titleWelcomePage: {
    width: '70%',
    height: '16%',
    alignSelf: 'center'
  },
});
