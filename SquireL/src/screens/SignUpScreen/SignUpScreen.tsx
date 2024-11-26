import { ImageBackground, StyleSheet} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
import { useState } from 'react';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};
  //const emailRegex= '^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$';
  //const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  /*onSubmit testEmail and password  if (!emailRegex.test(username)) {
      setError('Invalid email format');
      return;
    }
    if (!validateEmail(username)) {
      setError('Invalid email format');
      return;
    }*/

export default function SignUpScreen({ navigation }: Props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const onFormSubmit = async () => {
    console.log('submit');
    //todo verifier formats: email, passwords, username
    //todo verfier passwords identiques
    // if(password === '') {
    //   setErrorMessage('Password should not be empty');
    //   showErrorMessage();
    // }
    // if(username === '') {
    //   setErrorMessage('Username should not be empty');
    //   showErrorMessage();
    // }
    // if(password !== '' && username !== ''){
    //   if (Platform.OS === 'ios' || Platform.OS === 'android') {
    //     setHost('10.117.60.67');
    //   } else if (Platform.OS === 'web') {
    //     setHost('localhost');
    //   }
    //   //prevent from script attach or javascript attack
    //   setPassword(password.replace(/<script.*?>.*?<\/script>/g, '')
    //           .replace(/javascript:/g, '')
    //           .replace(/[<>]/g, ''));
    //   setUsername(username.replace(/<script.*?>.*?<\/script>/g, '')
    //           .replace(/javascript:/g, '')
    //           .replace(/[<>]/g, ''));
    //   //trim accidentals spaces
    //   setPassword((password.trim()));
    //   setUsername((username.trim()));
    //     await axios({
    //       method: 'post',
    //       url: `${API_URL}`,
    //       data: { username, password }
    //     })
    //     .then( async function (response) {
    //       if (Platform.OS === 'ios' || Platform.OS === 'android') {
    //         await SecureStore.setItemAsync('access_token', response.data.access_token);
    //         const access_token = await SecureStore.getItemAsync('access_token');
    //         setHost('');
    //       } else if (Platform.OS === 'web') {
    //         localStorage.setItem('access_token', response.data.access_token);
    //         setHost('');
    //       }
    //         navigation.navigate('AppDrawer')
    //       })
    //       .catch(function (error) {
    //         if (error) {
    //           if (error.response) {
    //             const message = error.response.data.message;
    //             setErrorMessage(message);
    //             showErrorMessage();
    //           }
    //         } else {
    //           console.log('An unexpected error occurred:', error);
    //           setErrorMessage('An unexpected error occurred');
    //           showErrorMessage();
    //         }
    //       }); 
    // }    
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
                  >Join the adventure</Text>
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
                    autoCapitalize="none"
                    maxLength={30}
                    size="$3"
                    flex={1}
                    ></Input>
                  </XStack> 
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
                      Email
                      </Text>
                    </Label>
                    <Input
                    value= {email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    maxLength={30}
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
                  secureTextEntry
                  maxLength={30}
                  autoCorrect={false}
                  autoComplete="off"
                  size="$3"
                  flex={1}></Input>
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
                      Confirm password
                    </Text>                    
                  </Label>
                  <Input
                  value={passwordConfirmation}
                  onChangeText={setPasswordConfirmation}
                  secureTextEntry
                  maxLength={30}
                  autoCorrect={false}
                  autoComplete="off"
                  size="$3"
                  flex={1}></Input>
                </XStack> 
                <XStack
                justifyContent='space-around'>
                  <Form.Trigger asChild>
                    <Button
                    size="$3"
                    backgroundColor="#FF8A01">
                      <Text 
                        color="#fff"
                        fontFamily="MedievalSharp-Regular" 
                        fontSize={16}>
                          Register</Text>
                    </Button>
                  </Form.Trigger>  
                  <Button 
                  size="$3"
                  variant="outlined"
                  borderColor="#FF8A01"                
                  onPress={() => navigation.navigate('SignIn')}>
                    <Text 
                      color="#FFF"
                      fontFamily="MedievalSharp-Regular"
                      fontSize={16}
                      >Back to Sign In</Text>
                  </Button>
                </XStack>                
              </Form>              
          </YStack>
          <YStack
            alignItems='flex-end'
            flex={1}>
              { isMessageVisible ?
              <XStack
                borderRadius={10}
                justifyContent="center"
                alignItems="center"
                borderColor='orange'
                borderWidth={2}
                paddingTop={10}   
                paddingBottom={10} 
                paddingLeft={5}   
                paddingRight={5}
                margin="5%">
                <Text
                  fontSize={12}
                  color="#fff">
                    {errorMessage}
                </Text>
              </XStack> :
              null }           
          </YStack>
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
  text: {
    color: '#fff' 
  }
});