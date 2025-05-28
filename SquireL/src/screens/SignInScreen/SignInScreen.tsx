import { Platform, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';
import GLOBALS from '../../config';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../context/UserContext';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({ navigation }: Props) {
  const { setUserId } = useUser();

  const [loaded, error] = useFonts({
    'MedievalSharp-Regular': MedievalSharp_400Regular,
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [host, setHost] = useState('');
  const API_URL = `https://squirel-backend.onrender.com/auth/signIn`;

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

  const showErrorMessage = () => {
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
      setErrorMessage('');
    }, 3000);
  };

  const onFormSubmit = async () => {
    console.log('submitCall');
    if (password === '') {
      setErrorMessage('Password should not be empty');
      showErrorMessage();
    }
    if (username === '') {
      setErrorMessage('Username should not be empty');
      showErrorMessage();
    }
    if (password !== '' && username !== '') {
      console.log('password and username filled');
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        setHost('10.117.60.67');
      } else if (Platform.OS === 'web') {
        setHost('localhost');
      }
      //prevent from script attach or javascript attack
      setPassword(
        password
          .replace(/<script.*?>.*?<\/script>/g, '')
          .replace(/javascript:/g, '')
          .replace(/[<>]/g, ''),
      );
      setUsername(
        username
          .replace(/<script.*?>.*?<\/script>/g, '')
          .replace(/javascript:/g, '')
          .replace(/[<>]/g, ''),
      );
      //trim accidentals spaces
      setPassword(password.trim());
      setUsername(username.trim());
      console.log('axios called');
      await axios({
        method: 'post',
        url: `${API_URL}`,
        data: { username, password },
      })
        .then(async function (response) {
          const decoded_token = jwtDecode(response.data.access_token);
          if (decoded_token?.sub) {
            setUserId(decoded_token.sub);
          }
          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            await SecureStore.setItemAsync('access_token', response.data.access_token);
            setHost('');
          } else if (Platform.OS === 'web') {
            localStorage.setItem('access_token', response.data.access_token);
            setHost('');
          }
          navigation.navigate('AppDrawer');
        })
        .catch(function (error) {
          if (error) {
            if (error.response) {
              const message = error.response.data.message;
              setErrorMessage(message);
              showErrorMessage();
            }
          } else {
            console.log('An unexpected error occurred:', error);
            setErrorMessage('An unexpected error occurred');
            showErrorMessage();
          }
        });
    }
  };

  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/welcomeScreen.jpg')}
    >
      <YStack
        flex={Platform.OS === 'web' ? 0.3 : 1.2}
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(177, 176, 176, 0.27)"
        borderRadius={30}
        paddingTop="2%"
        paddingBottom="2%"
        marginLeft={Platform.OS === 'web' ? '15%' : '5%'}
        marginTop="3%"
        marginBottom="3%"
        gap={GLOBALS.gap_5}
      >
        <Text fontSize={GLOBALS.fontSize_3} fontFamily="MedievalSharp-Regular" color="#fff">
          Welcome Back !
        </Text>
        <Form
          width="100%"
          paddingRight="8%"
          paddingLeft="8%"
          gap="$3"
          onSubmit={() => {
            console.log('onSubmit call');
            onFormSubmit();
          }}
        >
          <XStack gap="$3" justifyContent="center" alignItems="center">
            <YStack width="40%" justifyContent="center" alignItems="center">
              <Label htmlFor="username">
                <Text
                  fontSize={Platform.OS === 'web' ? 25 : 16}
                  color="#fff"
                  fontFamily="MedievalSharp-Regular"
                >
                  Username
                </Text>
              </Label>
            </YStack>
            <Input
              id="username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              maxLength={30}
              size={Platform.OS === 'web' ? '$5' : '$3'}
              flex={1}
            ></Input>
          </XStack>
          <XStack gap="$3" justifyContent="center" alignItems="center">
            <YStack width="40%" justifyContent="center" alignItems="center">
              <Label htmlFor="password">
                <Text
                  fontSize={Platform.OS === 'web' ? 25 : 16}
                  color="#fff"
                  fontFamily="MedievalSharp-Regular"
                >
                  Password
                </Text>
              </Label>
            </YStack>
            <Input
              id="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              maxLength={30}
              autoCorrect={false}
              autoComplete="off"
              size={Platform.OS === 'web' ? '$5' : '$3'}
              flex={1}
            ></Input>
          </XStack>
          <Form.Trigger asChild>
            <Button size={Platform.OS === 'web' ? '$5' : '$3'} backgroundColor="#FF8A01">
              <Text
                color="#fff"
                fontFamily="MedievalSharp-Regular"
                fontSize={Platform.OS === 'web' ? 25 : 16}
              >
                Sign In
              </Text>
            </Button>
          </Form.Trigger>
          <Button
            size={Platform.OS === 'web' ? '$5' : '$3'}
            variant="outlined"
            borderColor="#FF8A01"
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text
              color="#FFF"
              fontFamily="MedievalSharp-Regular"
              fontSize={Platform.OS === 'web' ? 25 : 16}
            >
              Don't have an account? Sign up
            </Text>
          </Button>
        </Form>
        <Button size={Platform.OS === 'web' ? '$5' : '$3'} chromeless>
          <Text
            fontFamily="MedievalSharp-Regular"
            fontSize={Platform.OS === 'web' ? 25 : 16}
            color="#fff"
          >
            Forgot password?
          </Text>
        </Button>
      </YStack>
      <YStack alignItems="flex-end" flex={1}>
        {isMessageVisible ? (
          <XStack
            borderRadius={10}
            justifyContent="center"
            alignItems="center"
            borderColor="orange"
            borderWidth={2}
            paddingTop={10}
            paddingBottom={10}
            paddingLeft={5}
            paddingRight={5}
            margin="5%"
          >
            <Text fontSize={12} color="#fff">
              {errorMessage}
            </Text>
          </XStack>
        ) : null}
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
});
