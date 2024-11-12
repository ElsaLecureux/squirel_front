import { ImageBackground, StyleSheet} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({ navigation }: Props) {

  const [loaded, error] = useFonts({
    'MedievalSharp-Regular': MedievalSharp_400Regular,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const API_URL = 'http://localhost:3000/auth'

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    } else if (error) {
      console.log('Error loading fonts:', error);
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(()=> {
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  }, [errorMessage])
  
  if (!loaded && !error) {
    return null;
  }
  
  const onFormSubmit = async () => {
      await axios({
        method: 'post',
        url: `${API_URL}/signIn`,
        data: { username, password }
      })
      .then(function (response) {
        console.log(response.data.message);
      if (response.data.message === 'user connected'){
        navigation.navigate('AppDrawer')
      }
      })
      .catch(function (error) {
        if (error) {
          if (error.response) {
            const errorMessage = error.response.data.message;
            console.log('Server response error:', errorMessage);
            setErrorMessage(errorMessage);
          }
        } else {
          console.log('An unexpected error occurred:', error);
        }
      });   
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
              onSubmit={() => onFormSubmit()}
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
                <Form.Trigger asChild>
                  <Button
                  size="$3"
                  backgroundColor="#FF8A01">
                    <Text 
                      color="#fff"
                      fontFamily="MedievalSharp-Regular" 
                      fontSize={16}>
                        Sign In</Text>
                  </Button>
                </Form.Trigger> 
                {showErrorMessage ?  
                <Text
                flex={1}
                alignContent='center'
                color="#FF8A01">
                  {errorMessage}
                </Text>  : null }          
                <Button 
                size="$3"
                variant="outlined"
                borderColor="#FF8A01"                
                onPress={() => navigation.navigate('SignUp')}>
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
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 0.5,
    alignItems: 'center',
  },
});