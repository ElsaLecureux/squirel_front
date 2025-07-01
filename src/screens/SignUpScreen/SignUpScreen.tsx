import { ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, Button, Form, Label, Input, Stack } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useState } from 'react';
import { UserDto } from '../../Dto/UserDto';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { useUser } from '../../context/UserContext';
import type { RootStackParamList } from '../../types/navigationTypes';
import axiosInstance from '@/src/utils/axiosInstance';
import { SignUpSchema } from '@/src/schemas/signUpSchema';
import { treeifyError } from 'zod/v4';
import { ValidationResultSignUp } from '@/src/types/validation';
import { UserToasterErrors, Toaster } from '../../utils/toaster';
import { RotationWarning } from '@/src/components/rotatingWarning/RotatingWarning';
import { useScreenOrientation } from '@/src/utils/useScreenOrientation';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUpScreen({ navigation }: Readonly<Props>) {
  const { setUserId } = useUser();
  const { showError } = UserToasterErrors();

  const [userDto, setUserDto] = useState<UserDto>({
    username: '',
    email: '',
    password: '',
    newPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState(false);
  const { isLandscape, isMobile } = useScreenOrientation();

  const handleInputChange = (field: string, value: string) => {
    const updatedUserDto = {
      ...userDto,
      [field]: value,
    };
    setUserDto(updatedUserDto);

    const errorFieldMap: { [key: string]: keyof typeof errorMessage } = {
      username: 'username',
      email: 'email',
      password: 'password',
      newPassword: 'confirmPassword',
    };

    const errorField = errorFieldMap[field];

    if (errorField) {
      setErrorMessage((prev) => ({
        ...prev,
        [errorField]: '',
      }));
    }

    if (field === 'password') {
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: '',
      }));
    }
  };

  const validateFormInputs = (showErrors = true): ValidationResultSignUp => {
    const result = SignUpSchema.safeParse({
      username: userDto.username,
      email: userDto.email,
      password: userDto.password,
      confirmPassword: userDto.newPassword,
    });
    if (!result.success && showErrors) {
      const tree = treeifyError(result.error);
      setErrorMessage({
        username: tree.properties?.username?.errors?.[0] ?? '',
        email: tree.properties?.email?.errors?.[0] ?? '',
        password: tree.properties?.password?.errors?.[0] ?? '',
        confirmPassword: tree.properties?.confirmPassword?.errors?.[0] ?? '',
      });
      return { success: false, data: null };
    }
    return { success: true, data: result.data ?? null };
  };

  const onFormSubmit = async () => {
    const result = validateFormInputs();
    if (!result.success) return;

    try {
      let access_token: string | null = null;
      const response = await axiosInstance.post(`/auth/signup`, { ...userDto });
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
        showError(message);
      }
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
        marginVertical="10%"
        marginLeft={isMobile ? '0%' : '15%'}
        maxWidth={600}
        alignSelf="center"
        width={'100%'}
        padding={'$3'}
      >
        <Text fontSize={45} fontFamily="MysteryQuest_400Regular" color="#fff">
          Première quête ?
        </Text>
        <Form flex={1} width="100%" gap="$1" onSubmit={() => onFormSubmit()}>
          <Stack gap="$1" maxHeight={120}>
            <Label htmlFor="username">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular" width="100%">
                Identifiant
              </Text>
            </Label>
            <Input
              id="username"
              value={userDto.username}
              onChangeText={(text) => handleInputChange('username', text)}
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
            <Label htmlFor="email">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular">
                Email
              </Text>
            </Label>
            <Input
              id="email"
              value={userDto.email}
              onChangeText={(text) => handleInputChange('email', text)}
              autoCapitalize="none"
              size="auto"
            />
            {errorMessage.email && (
              <Text color="red" fontSize={12} marginTop={4}>
                {errorMessage.email}
              </Text>
            )}
          </Stack>
          <Stack gap="$1" maxHeight={120}>
            <Label htmlFor="password">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular">
                Mot de passe
              </Text>
            </Label>

            <Stack>
              <Input
                id="password"
                value={userDto.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry={!passwordVisible}
                autoCorrect={false}
                autoComplete="off"
                size="auto"
              />
              {errorMessage.password && (
                <Text color="red" fontSize={12} marginTop={4}>
                  {errorMessage.password}
                </Text>
              )}
              <Button
                position="absolute"
                right="$2"
                top="0"
                bottom="0"
                alignSelf="center"
                size="$4"
                padding="$2"
                backgroundColor="transparent"
                onPress={() => setPasswordVisible(!passwordVisible)}
                icon={passwordVisible ? Eye : EyeOff}
              />
            </Stack>
          </Stack>
          <Stack gap="$1" maxHeight={120}>
            <Label htmlFor="passwordConfirmation">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular">
                Confirmation du mot de passe
              </Text>
            </Label>
            <Stack>
              <Input
                id="passwordConfirmation"
                value={userDto.newPassword || ''}
                onChangeText={(text) => handleInputChange('newPassword', text)}
                secureTextEntry={!confirmationPasswordVisible}
                autoCorrect={false}
                autoComplete="off"
                size="auto"
              />
              {errorMessage.confirmPassword && (
                <Text color="red" fontSize={12} marginTop={4}>
                  {errorMessage.confirmPassword}
                </Text>
              )}

              <Button
                position="absolute"
                right="$2"
                top="0"
                bottom="0"
                alignSelf="center"
                size="$4"
                padding="$2"
                backgroundColor="transparent"
                onPress={() => setConfirmationPasswordVisible(!confirmationPasswordVisible)}
                icon={confirmationPasswordVisible ? Eye : EyeOff}
              />
            </Stack>
          </Stack>
          <Stack gap="$3" maxHeight={120} marginTop="12%">
            <Form.Trigger asChild>
              <Button size="auto" backgroundColor="#FF8A01">
                <Text color="#fff" fontFamily="BubblegumSans_400Regular" fontSize={25}>
                  S'enregistrer
                </Text>
              </Button>
            </Form.Trigger>

            <Button
              size="auto"
              variant="outlined"
              borderColor="#FF8A01"
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text color="#fff" fontFamily="BubblegumSans_400Regular" fontSize={25}>
                Retour vers s'identifier
              </Text>
            </Button>
          </Stack>
        </Form>
      </Stack>
      <Toaster key={'signUpToaster'} />
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
    color: '#fff',
  },
});
