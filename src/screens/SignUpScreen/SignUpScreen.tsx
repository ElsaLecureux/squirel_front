import { Platform, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { XStack, YStack, Text, Button, Form, Label, Input } from 'tamagui';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useState } from 'react';
import { UserDto } from '../../Dto/UserDto';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { GLOBALS } from '../../config';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../context/UserContext';
import type { RootStackParamList } from '../../types/navigationTypes';
import { URL_BACKEND_SQUIREL } from '@env';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUpScreen({ navigation }: Readonly<Props>) {
  const { setUserId } = useUser();

  const emailRegex = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const [userDto, setUserDto] = useState<UserDto>({
    username: '',
    email: '',
    password: '',
    newPassword: undefined,
  });
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationPasswordVisible, setConfirmationPasswordVisible] = useState(false);
  const API_URL = `${URL_BACKEND_SQUIREL}auth/signUp`;
  const showErrorMessage = () => {
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
      setErrorMessage('');
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserDto((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const checkInput = (type: string) => {
    if (type === userDto.email || type === 'all') {
      if (!emailRegex.test(userDto.email)) {
        setErrorMessage('Invalid email address. Please enter a valid email.');
        showErrorMessage();
      }
    }
    if (type === userDto.password || type === 'all') {
      if (!passwordRegex.test(userDto.password)) {
        setErrorMessage(
          'Password must contain at least 8 characters, one uppercase letter, one number, and one special character.',
        );
        showErrorMessage();
      }
    }
    if (type === passwordConfirmation || type === 'all') {
      if (userDto.password !== passwordConfirmation && userDto.password !== '') {
        setErrorMessage('Passwords not identical');
        showErrorMessage();
      }
    }
  };

  const onFormSubmit = async () => {
    checkInput('all');
    if (userDto.password === '') {
      setErrorMessage('Password should not be empty');
      showErrorMessage();
    }
    if (userDto.username === '') {
      setErrorMessage('Username should not be empty');
      showErrorMessage();
    }
    if (userDto.email === '') {
      setErrorMessage('Email should not be empty');
      showErrorMessage();
    }
    if (userDto.password !== '' && userDto.username !== '' && userDto.email !== '') {
      await axios({
        method: 'post',
        url: `${API_URL}`,
        data: { ...userDto },
      })
        .then(async function (response) {
          const decoded_token = jwtDecode(response.data.access_token);
          if (decoded_token?.sub) {
            setUserId(decoded_token.sub);
          }
          if (Platform.OS === 'ios' || Platform.OS === 'android') {
            await SecureStore.setItemAsync('access_token', response.data.access_token);
          } else if (Platform.OS === 'web') {
            localStorage.setItem('access_token', response.data.access_token);
          }
          navigation.navigate('HomeStack', { screen: 'Home' });
        })
        .catch(function (error) {
          if (error) {
            if (error.response) {
              const message = error.response.data.message;
              setErrorMessage(message);
              showErrorMessage();
            }
          } else {
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
            <Input
              id="email"
              value={userDto.email}
              onChangeText={(text) => handleInputChange('email', text)}
              autoCapitalize="none"
              maxLength={30}
              onBlur={() => checkInput(userDto.email)}
              flex={1}
              size={Platform.OS === 'web' ? '$5' : '$3'}
              style={{ fontSize: 11 }}
            />
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
              <Input
                id="password"
                value={userDto.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry={!passwordVisible}
                maxLength={30}
                autoCorrect={false}
                autoComplete="off"
                onBlur={() => checkInput(userDto.password)}
                flex={1}
                size={Platform.OS === 'web' ? '$5' : '$3'}
                style={{ fontSize: 11 }}
              />
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
              <Input
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                secureTextEntry={!confirmationPasswordVisible}
                maxLength={30}
                autoCorrect={false}
                autoComplete="off"
                onBlur={() => checkInput(passwordConfirmation)}
                flex={1}
                size={Platform.OS === 'web' ? '$5' : '$3'}
                style={{ fontSize: 11 }}
              />
              <Button
                position="absolute"
                size={Platform.OS === 'web' ? '$5' : '$3'}
                right="0"
                onPress={() => setConfirmationPasswordVisible(!confirmationPasswordVisible)}
                icon={confirmationPasswordVisible ? Eye : EyeOff}
              />
            </XStack>
          </XStack>
          <XStack
            paddingTop={Platform.OS === 'web' ? GLOBALS.padding_3 : null}
            justifyContent="space-around"
          >
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
        <YStack alignItems="flex-end" flex={1}>
          {isMessageVisible && (
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
          )}
        </YStack>
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
    color: '#fff',
  },
});
