import { Platform, ImageBackground, StyleSheet } from 'react-native';
import { Text, YStack, XStack, Image, Input, Label, Button, Form, Stack, View } from 'tamagui';
import { useUser } from '../../context/UserContext';

import { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfosDto from '@/src/Dto/UserInfosDto';
import UserPlayGameFullDto from '@/src/Dto/UserPlayGameFullDto';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import UserDto from '@/src/Dto/UserDto';

export default function ProfileScreen() {
  const [host, setHost] = useState('');
  const API_URL = `http://${host}:3000`;
  const [isReady, setIsReady] = useState(false);
  const { userId } = useUser();
  const [userInfo, setUserInfo] = useState<UserInfosDto>();
  const [userPlayGame, setUserPlayGame] = useState<UserPlayGameFullDto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userDto, setUserDto] = useState<UserDto>({
    username: '',
    email: '',
    password: '',
    newPassword: undefined,
  });
  const style_modal_bottom = false;
  const [errorMessage, setErrorMessage] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  useEffect(() => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      setHost('10.117.60.67');
    } else if (Platform.OS === 'web') {
      setHost('localhost');
    }

    if (host && userId) {
      getInfosUser();
      getUserWonGames();
      setIsReady(true);
    }
  }, [host, userId]);

  const getInfosUser = async () => {
    const dataUser = await axios({
      method: 'get',
      url: `${API_URL}/users/${userId}`,
    });
    if (dataUser) {
      setUserInfo({ ...dataUser.data });
      setUserDto({ ...dataUser.data });
    }
  };
  const getUserWonGames = async () => {
    const dataGameUser = await axios({
      method: 'get',
      url: `${API_URL}/userPlayGame/${userId}`,
    });
    if (dataGameUser) {
      setUserPlayGame([...dataGameUser.data]);
    }
  };

  const changeInfosButton = () => {
    setModalVisible(true);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setUserDto((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  };
  const handleNewPassword = () => {
    setUserDto((prevState) => ({
      ...prevState,
      newPassword: undefined,
    }));
    setErrorMessage('The new passwords must be identicals');
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
    setConfirmPassword('');
  };

  const checkIfPasswordNotEmpty = () => {
    if (userDto.password === '') {
      setErrorMessage('Password is required!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return false;
    } else {
      return true;
    }
  };

  const onFormSubmit = async () => {
    if (confirmPassword !== userDto.newPassword) {
      handleNewPassword();
    }
    if (checkIfPasswordNotEmpty() && confirmPassword === userDto.newPassword) {
      try {
        const response = await axios({
          method: 'put',
          url: `${API_URL}/users/${userId}`,
          data: { ...userDto },
        });
        if (response.status === 200) {
          setErrorMessage('New informations saved');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      } catch (error: any) {
        if (error.response.status === 400) {
          setErrorMessage(
            'Password must contains 8 characters, 1 uppercase, 1 lowercase and a special character!',
          );
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        } else if (error.response.status === 401) {
          setErrorMessage('Wrong password!');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        } else {
          setErrorMessage("An unexpected thing happened, the new informations couldn't be saved");
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      }
    }
  };

  if (!isReady)
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/profileScreen.jpg')}
    >
      <YStack gap={15}>
        <XStack justifyContent="center" alignContent="center" marginBottom={40}>
          <Text fontFamily="MysteryQuest_400Regular" style={styles.title} fontSize={30}>
            Welcome {userInfo?.username}!
          </Text>
        </XStack>
        <XStack gap={25}>
          <Stack style={styles.containerAvatar}>
            <Image style={styles.avatar} source={require('../../assets/images/avatar1.png')} />
          </Stack>
          <YStack justifyContent="center" gap={15}>
            <Text fontFamily="BubblegumSans_400Regular" color={'#fff'} fontSize={20}>
              Username: {userInfo?.username}
            </Text>
            <Text fontFamily="BubblegumSans_400Regular" color={'#fff'} fontSize={20}>
              Email: {userInfo?.email}
            </Text>
          </YStack>
        </XStack>
        <XStack gap={15} alignItems="center">
          <Text fontFamily="BubblegumSans_400Regular" fontSize={20} color={'#fff'}>
            Trophies:
          </Text>
          {userPlayGame.map((game) => (
            <XStack gap={15} key={game.gameid}>
              {game.avatar && game.numberoftimewon > 0 ? (
                <XStack style={styles.containerTrophy}>
                  <Image
                    key={game.avatar}
                    style={styles.trophy}
                    source={{ uri: `${game.avatar.replace(/[\r\n]+/g, '')}` }}
                  />
                </XStack>
              ) : null}
              {game.avatarGold && game.numberoftimewon >= 5 ? (
                <XStack style={styles.containerTrophyGolden}>
                  <Image
                    key={game.avatarGold}
                    style={styles.trophy}
                    source={{ uri: `${game.avatarGold.replace(/[\r\n]+/g, '')}` }}
                  />
                </XStack>
              ) : null}
            </XStack>
          ))}
        </XStack>
        <YStack alignItems="center">
          <Button
            size="$5"
            variant="outlined"
            borderColor="#FF8A01"
            onPress={() => changeInfosButton()}
          >
            <Text fontFamily="MysteryQuest_400Regular" color={'#fff'} fontSize={18}>
              Change infos
            </Text>
          </Button>
        </YStack>
        <CustomModal
          style_modal={style_modal_bottom}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        >
          <Form
            width="100%"
            paddingRight="8%"
            paddingLeft="8%"
            style={styles.modalView}
            gap="$3"
            onSubmit={() => onFormSubmit()}
          >
            <YStack gap="$3">
              <XStack gap="$3" justifyContent="center" alignItems="center">
                <YStack width="40%" justifyContent="center" alignItems="center">
                  <Label htmlFor="username" lineHeight={16}>
                    <Text
                      fontSize={Platform.OS === 'web' ? 25 : 16}
                      color="#fff"
                      fontFamily="BubblegumSans_400Regular"
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
                  size={Platform.OS === 'web' ? '$5' : '$3'}
                  flex={1}
                />
              </XStack>
              <XStack gap="$3" justifyContent="center" alignItems="center">
                <YStack width="40%" justifyContent="center" alignItems="center">
                  <Label htmlFor="email" lineHeight={16}>
                    <Text
                      fontSize={Platform.OS === 'web' ? 25 : 16}
                      color="#fff"
                      fontFamily="BubblegumSans_400Regular"
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
                  maxLength={150}
                  flex={1}
                  size={Platform.OS === 'web' ? '$5' : '$3'}
                ></Input>
              </XStack>
              <XStack gap="$3" justifyContent="center" alignItems="center">
                <YStack width="40%" justifyContent="center" alignItems="center">
                  <Label htmlFor="password">
                    <Text
                      fontSize={Platform.OS === 'web' ? 25 : 16}
                      color="#fff"
                      fontFamily="BubblegumSans_400Regular"
                    >
                      Password
                    </Text>
                  </Label>
                </YStack>
                <Input
                  id="password"
                  value={userDto.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry
                  maxLength={30}
                  autoCorrect={false}
                  autoComplete="off"
                  size={Platform.OS === 'web' ? '$5' : '$3'}
                  flex={1}
                ></Input>
              </XStack>
              <XStack gap="$3" justifyContent="center" alignItems="center">
                <YStack width="40%" justifyContent="center" alignItems="center">
                  <Label htmlFor="newPassword">
                    <Text
                      fontSize={Platform.OS === 'web' ? 25 : 16}
                      color="#fff"
                      fontFamily="BubblegumSans_400Regular"
                    >
                      New password
                    </Text>
                  </Label>
                </YStack>
                <Input
                  id="newPassword"
                  value={userDto.newPassword}
                  onChangeText={(text) => handleInputChange('newPassword', text)}
                  secureTextEntry
                  maxLength={30}
                  autoCorrect={false}
                  autoComplete="off"
                  size={Platform.OS === 'web' ? '$5' : '$3'}
                  flex={1}
                ></Input>
              </XStack>
              <XStack gap="$3" justifyContent="center" alignItems="center">
                <YStack width="40%" justifyContent="center" alignItems="center">
                  <Label htmlFor="newPasswordConfirmation">
                    <Text
                      fontSize={Platform.OS === 'web' ? 25 : 16}
                      color="#fff"
                      fontFamily="BubblegumSans_400Regular"
                    >
                      Confirm new password
                    </Text>
                  </Label>
                </YStack>
                <Input
                  id="newPasswordConfirmation"
                  value={confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                  secureTextEntry
                  maxLength={30}
                  autoCorrect={false}
                  autoComplete="off"
                  size={Platform.OS === 'web' ? '$5' : '$3'}
                  flex={1}
                />
              </XStack>
              {errorMessage ? <Text>{errorMessage}</Text> : null}
              <XStack gap={30} alignItems="center" justifyContent="center">
                <Form.Trigger asChild>
                  <Button size={Platform.OS === 'web' ? '$5' : '$3'} backgroundColor="#FFF">
                    <Text
                      color="#FF8A01"
                      fontFamily="MysteryQuest_400Regular"
                      fontSize={Platform.OS === 'web' ? 25 : 16}
                    >
                      Save
                    </Text>
                  </Button>
                </Form.Trigger>
                <Button
                  size={Platform.OS === 'web' ? '$5' : '$3'}
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    color="#FF8A01"
                    fontFamily="MysteryQuest_400Regular"
                    fontSize={Platform.OS === 'web' ? 25 : 16}
                  >
                    Close
                  </Text>
                </Button>
              </XStack>
            </YStack>
          </Form>
        </CustomModal>
      </YStack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#ffa358',
  },
  containerAvatar: {
    borderColor: '#FF8A01',
    borderRadius: 20,
    borderWidth: 4,
    height: 120,
    width: 120,
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
  containerTrophy: {
    borderColor: '#FF8A01',
    borderRadius: 15,
    padding: 4,
    borderWidth: 2,
    height: 50,
    width: 50,
  },
  containerTrophyGolden: {
    borderColor: '#D4AF37',
    borderRadius: 15,
    padding: 4,
    borderWidth: 2,
    height: 50,
    width: 50,
  },
  trophy: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  modalView: {
    height: 500,
    width: 600,
    backgroundColor: '#ff8a01',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#fff',
  },
});
