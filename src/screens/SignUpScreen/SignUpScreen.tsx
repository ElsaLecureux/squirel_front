import { Platform, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
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
          Join the adventure
        </Text>
        <Form width="100%" paddingRight="8%" gap="$3" onSubmit={() => onFormSubmit()}>
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
                value={userDto.username}
                onChangeText={(text) => handleInputChange('username', text)}
                autoCapitalize="none"
                maxLength={30}
                flex={1}
                size={Platform.OS === 'web' ? '$5' : '$3'}
                style={{ fontSize: 11 }}
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
              <Label htmlFor="email" lineHeight={16}>
                <Text
                  fontSize={Platform.OS === 'web' ? 25 : 16}
                  color="#fff"
                  fontFamily="MedievalSharp-Regular"
                >
                  Email
                </Text>
              </Label>
            </YStack>
            <YStack>
              <Input
                id="email"
                value={userDto.email}
                onChangeText={(text) => handleInputChange('email', text)}
                autoCapitalize="none"
                maxLength={30}
                flex={1}
                size={Platform.OS === 'web' ? '$5' : '$3'}
                style={{ fontSize: 11 }}
              />
              {errorMessage.email && (
                <Text color="red" fontSize={12} marginTop={4}>
                  {errorMessage.email}
                </Text>
              )}
            </YStack>
          </XStack>
          <XStack gap="$3" justifyContent="center" alignItems="center">
            <YStack width="40%" justifyContent="center" alignItems="center">
              <Label htmlFor="password" lineHeight={16}>
                <Text
                  fontSize={Platform.OS === 'web' ? 25 : 16}
                  color="#fff"
                  fontFamily="MedievalSharp-Regular"
                >
                  Password
                </Text>
              </Label>
            </YStack>
            <XStack flex={1}>
              <YStack>
                <Input
                  id="password"
                  value={userDto.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry={!passwordVisible}
                  maxLength={30}
                  autoCorrect={false}
                  autoComplete="off"
                  flex={1}
                  size={Platform.OS === 'web' ? '$5' : '$3'}
                  style={{ fontSize: 11 }}
                />
                {errorMessage.password && (
                  <Text color="red" fontSize={12} marginTop={4}>
                    {errorMessage.password}
                  </Text>
                )}
              </YStack>
              <Button
                size={Platform.OS === 'web' ? '$5' : '$3'}
                position="absolute"
                right="0"
                onPress={() => setPasswordVisible(!passwordVisible)}
                icon={passwordVisible ? Eye : EyeOff}
              />
            </XStack>
          </XStack>
          <XStack gap="$3" justifyContent="center" alignItems="center">
            <YStack width="40%" justifyContent="center" alignItems="center">
              <Label htmlFor="passwordConfirmation" lineHeight={16}>
                <Text
                  fontSize={Platform.OS === 'web' ? 25 : 16}
                  color="#fff"
                  fontFamily="MedievalSharp-Regular"
                >
                  Confirm password
                </Text>
              </Label>
            </YStack>
            <XStack flex={1}>
              <YStack>
                <Input
                  id="passwordConfirmation"
                  value={userDto.newPassword || ''}
                  onChangeText={(text) => handleInputChange('newPassword', text)}
                  secureTextEntry={!confirmationPasswordVisible}
                  maxLength={30}
                  autoCorrect={false}
                  autoComplete="off"
                  flex={1}
                  size={Platform.OS === 'web' ? '$5' : '$3'}
                  style={{ fontSize: 11 }}
                />
                {errorMessage.confirmPassword && (
                  <Text color="red" fontSize={12} marginTop={4}>
                    {errorMessage.confirmPassword}
                  </Text>
                )}
              </YStack>

              <Button
                position="absolute"
                size={Platform.OS === 'web' ? '$5' : '$3'}
                right="0"
                onPress={() => setConfirmationPasswordVisible(!confirmationPasswordVisible)}
                icon={confirmationPasswordVisible ? Eye : EyeOff}
              />
            </XStack>
          </XStack>
          <XStack paddingTop={Platform.OS === 'web' ? '10' : null} justifyContent="space-around">
            <Form.Trigger asChild>
              <Button size={Platform.OS === 'web' ? '$5' : '$3'} backgroundColor="#FF8A01">
                <Text
                  color="#fff"
                  fontFamily="MedievalSharp-Regular"
                  fontSize={Platform.OS === 'web' ? 25 : 16}
                >
                  Register
                </Text>
              </Button>
            </Form.Trigger>

            <Button
              size={Platform.OS === 'web' ? '$5' : '$3'}
              variant="outlined"
              borderColor="#FF8A01"
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text
                color="#fff"
                fontFamily="MedievalSharp-Regular"
                fontSize={Platform.OS === 'web' ? 25 : 16}
              >
                Back to Sign In
              </Text>
            </Button>
          </XStack>
        </Form>
      </YStack>
      <Toaster key="signup-toaster" />
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
