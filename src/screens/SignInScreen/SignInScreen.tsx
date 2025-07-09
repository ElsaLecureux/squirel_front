import { ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { MedievalSharp_400Regular } from '@expo-google-fonts/medievalsharp';
import { Text, Button, Form, Label, Input, Stack } from 'tamagui';
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
import { RotationWarning } from '@/src/components/rotatingWarning/RotatingWarning';
import { useScreenOrientation } from '@/src/utils/useScreenOrientation';

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
  const { isLandscape, isMobile } = useScreenOrientation();

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
      source={
        isMobile
          ? require('../../assets/images/welcomeScreenPortrait.jpg')
          : require('../../assets/images/welcomeScreen.jpg')
      }
    >
      {isLandscape && <RotationWarning />}

      <Stack
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(0, 0, 0, 0.18)"
        borderRadius={30}
        marginLeft={isMobile ? '0%' : '15%'}
        maxWidth={600}
        alignSelf="center"
        width={'100%'}
        padding={'$3'}
      >
        <Text fontSize={45} fontFamily="MysteryQuest_400Regular" color="#fff" marginBottom="$2">
          À l'aventure !
        </Text>
        <Form
          flex={1}
          width={'100%'}
          gap="$1"
          onSubmit={() => {
            onFormSubmit();
          }}
        >
          <Stack gap="$1" maxHeight={120}>
            <Label htmlFor="username">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular" width="100%">
                Identifiant
              </Text>
            </Label>

            <Input
              id="username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              size="auto"
            />
            {errorMessage.username && (
              <Text color="red" fontSize={12} marginTop={4}>
                {errorMessage.username}
              </Text>
            )}
          </Stack>
          <Stack gap="$1" maxHeight={120}>
            <Label htmlFor="password">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular">
                Mot de passe
              </Text>
            </Label>

            <Input
              id="password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCorrect={false}
              autoComplete="off"
              size="auto"
            />
            {errorMessage.password && (
              <Text color="red" fontSize={12} marginTop={4}>
                {errorMessage.password}
              </Text>
            )}
          </Stack>
          <Stack gap="$3" marginTop="$5">
            <Form.Trigger asChild>
              <Button size="auto" backgroundColor="#FF8A01">
                <Text color="#fff" fontFamily="BubblegumSans_400Regular" fontSize={25}>
                  Se connecter
                </Text>
              </Button>
            </Form.Trigger>
            <Button
              size="auto"
              variant="outlined"
              borderColor="#FF8A01"
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text
                color="#FFF"
                fontFamily="BubblegumSans_400Regular"
                fontSize={20}
                textAlign="center"
              >
                Pas de compte? Inscrivez-vous
              </Text>
            </Button>
          </Stack>
        </Form>
      </Stack>
      <Toaster key={'signInToaster'} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
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
