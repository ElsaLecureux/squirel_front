import { ImageBackground, StyleSheet} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
import { useEffect, useState } from 'react';
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
    'MedievalSharp-Regular': MedievalSharp_400Regular,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          <YStack
            flex={1.2}
            justifyContent="center"
            alignItems="center"
            backgroundColor="rgba(177, 176, 176, 0.27)"
            borderRadius={30}
            paddingTop='2%'
            paddingBottom='2%'
            marginLeft='5%'
            marginTop="3%"
            marginBottom= "3%"
            gap="$4"
            >
              <Form
              gap="$3"
              >
                <Text
                  fontSize={35}
                  fontFamily="MedievalSharp-Regular"
                  color="#fff"
                  >Welcome Back!</Text>
                  <XStack
                  gap="$3"
                  justifyContent='center'
                  alignItems='center'
                  >
                    <Label                                   
                    lineHeight={16}>
                      <Text
                      fontSize={16}
                      color="#fff" 
                      fontFamily="MedievalSharp-Regular">
                      Username
                      </Text>
                    </Label>
                    <Input
                    value= {username}
                    onChangeText={setUsername}
                    size="$3"
                    flex={1}
                    ></Input>
                  </XStack>                  
                <XStack 
                gap="$3"
                justifyContent='center'
                alignItems='center'>
                  <Label                  
                  lineHeight={16} > 
                    <Text 
                    fontSize={16}
                    color="#fff"
                    fontFamily="MedievalSharp-Regular">
                      Password
                    </Text>                    
                  </Label>
                  <Input
                  value={password}
                  onChangeText={setPassword}
                  size="$3"
                  flex={1}></Input>
                </XStack>                 
                <Button
                size="$3"
                backgroundColor="#FF8A01"
                  onPress={() => navigation.navigate('AppDrawer')}>
                  <Text 
                    color="#fff"
                    fontFamily="MedievalSharp-Regular" 
                    fontSize={16}
                  >Sign In</Text>
                </Button>
                <Button 
                size="$3"
                variant="outlined"
                borderColor="#FF8A01"                
                  onPress={() => navigation.navigate('SignUp')}
                >
                  <Text 
                    color="#FFF"
                    fontFamily="MedievalSharp-Regular"
                    fontSize={16}
                    >Don't have an account? Sign up</Text>
                </Button>
              </Form>              
              <Button
                size="$3"
                chromeless
              >
                <Text
                   fontFamily="MedievalSharp-Regular"
                   fontSize={14}
                   color="#fff"                   
                >
                  Forgot password?
                </Text>
              </Button>
          </YStack>
          <YStack 
            flex={1}>            
          </YStack>
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  }, 
});