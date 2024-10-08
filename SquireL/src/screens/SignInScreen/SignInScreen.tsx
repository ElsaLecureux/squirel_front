import { ImageBackground, StyleSheet, View} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({ navigation }: Props) {

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
        <XStack flex={1}>
          <YStack
            flex={2}
            gap="$3"
            justifyContent="center"
            alignItems="center"
            backgroundColor="rgba(177, 176, 176, 0.27)"
            padding
            marginLeft='5%'
            >
              <Form
              gap="$3"
              >
                <Text
                  fontSize={40}
                  fontFamily="MedievalSharp_400Regular"
                  color="#fff"
                  >Welcome Back</Text>
                <XStack
                >
                  <Label
                  color="#fff"                
                  fontFamily="MedievalSharp_400Regular"
                  > 
                    Username
                  </Label>
                  <Input
                  flex={1}
                  ></Input>
                </XStack>  
                <XStack>
                  <Label
                  color="#fff"
                  fontFamily="MedievalSharp_400Regular"
                  > 
                    Password
                  </Label>
                  <Input
                  flex={1}
                  ></Input>
                </XStack>  
                
                <Button
                  onPress={() => navigation.navigate('AppDrawer')}>
                  <Text 
                    fontFamily="MedievalSharp_400Regular" 
                    fontSize={20}
                  >Sign In</Text>
                </Button>
                <Button 
                  onPress={() => navigation.navigate('SignUp')}
                >
                  <Text 
                    fontFamily="MedievalSharp_400Regular"
                    fontSize={20}
                    >Don't have an account? Sign up</Text>
                </Button>
              </Form>              
              <Button
                width="50%"
                size="$2"
                chromeless
              >
                <Text
                   fontFamily="MedievalSharp_400Regular"
                   fontSize={15}
                   color="#fff"                   
                >
                  Forgot password?
                </Text>
              </Button>
          </YStack>
          <YStack 
            flex={1}>            
          </YStack>
        </XStack> 
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 0.5,
    alignItems: 'center',
  },
});