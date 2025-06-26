import { Platform, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import type { RootStackParamList } from '../../types/navigationTypes';
import axiosInstance from '@/src/utils/axiosInstance';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({ navigation }: Readonly<Props>) {
  const { setUserId } = useUser();

  const [loaded, error] = useFonts({
    'MedievalSharp-Regular': MedievalSharp_400Regular,
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

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
    // Validate inputs
    if (!username.trim()) {
      setErrorMessage('Username should not be empty');
      return showErrorMessage();
    }

    if (!password.trim()) {
      setErrorMessage('Password should not be empty');
      return showErrorMessage();
    }

    // Sanitize input (defend against XSS/script injection)
    const cleanUsername = username
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/[<>]/g, '')
      .trim();

    const cleanPassword = password
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/[<>]/g, '')
      .trim();

    try {
      let access_token: string | null = null;
      const response = await axiosInstance.post(`/auth/signin`, {
        username: cleanUsername,
        password: cleanPassword,
      });
      access_token = response.data.access_token;
      if (access_token) {
        await SecureStore.setItemAsync('access_token', access_token);
      }
      const authResponse = await axiosInstance.get('/auth/me');
      const userId = authResponse.data.userId;
      setUserId(userId);

      navigation.navigate('HomeStack', { screen: 'Home' });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || 'A network error occurred';
        setErrorMessage(message);
      } else {
        setErrorMessage('An unexpected error occurred');
        console.error(err);
      }
      showErrorMessage();
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
      >
        <Text fontSize={35} fontFamily="MedievalSharp-Regular" color="#fff">
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
