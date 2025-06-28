import { Platform, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { useUser } from '../../context/UserContext';
import type { RootStackParamList } from '../../types/navigationTypes';
import axiosInstance from '@/src/utils/axiosInstance';
import { SignInSchema } from '@/src/schemas/signInSchema';
import { treeifyError } from 'zod/v4';
import { ValidationResultSignIn } from '@/src/types/validation';
import { UserToasterErrors, Toaster } from '../../utils/toaster';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({ navigation }: Readonly<Props>) {
  const { setUserId } = useUser();
  const { showError, showSuccess } = UserToasterErrors();

  const [loaded, error] = useFonts({
    'MedievalSharp-Regular': MedievalSharp_400Regular,
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<{ username?: string; password?: string }>({});

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

  const validateFormInputs = (): ValidationResultSignIn => {
    const result = SignInSchema.safeParse({ username, password });
    if (!result.success) {
      const tree = treeifyError(result.error);
      setErrorMessage({
        username: tree.properties?.username?.errors?.[0],
        password: tree.properties?.password?.errors?.[0],
      });
      return { success: false, data: null };
    }
    setErrorMessage({});
    return { success: true, data: result.data };
  };

  const onFormSubmit = async () => {
    // Validate inputs with zod
    const result = validateFormInputs();
    if (!result.success) return;

    try {
      const response = await axiosInstance.post(`/auth/signin`, { ...result.data });
      const access_token = response.data.access_token;
      if (access_token) {
        await SecureStore.setItemAsync('access_token', access_token);
      }

      const authResponse = await axiosInstance.get('/auth/me');
      const userId = authResponse.data.userId;
      setUserId(userId);
      showSuccess('Successfully signed in!');
      navigation.navigate('HomeStack', { screen: 'Home' });
    } catch (err: any) {
      console.log('Caught error:', err.response?.data.message);
      let message = 'An unexpected error occured';
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message;
      } else {
        console.log(err);
      }
      showError(message);
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
            <YStack>
              <Input
                id="username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                maxLength={30}
                size={Platform.OS === 'web' ? '$5' : '$3'}
                flex={1}
              />
              {errorMessage.username && (
                <Text color="red" fontSize={12} marginTop={4}>
                  {errorMessage.username}
                </Text>
              )}
            </YStack>
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
            <YStack>
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
              />
              {errorMessage.password && (
                <Text color="red" fontSize={12} marginTop={4}>
                  {errorMessage.password}
                </Text>
              )}
            </YStack>
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
      </YStack>
      <Toaster />
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
