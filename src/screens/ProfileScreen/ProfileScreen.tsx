import { Platform, ImageBackground, StyleSheet } from 'react-native';
import { Text, Image, Input, Label, Button, Form, Stack, View, Spinner } from 'tamagui';
import { useUser } from '../../context/UserContext';

import { useEffect, useState } from 'react';
import { UserInfosDto } from '@/src/Dto/UserInfosDto';
import { UserPlayGameFullDto } from '@/src/Dto/UserPlayGameFullDto';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { UserDto } from '@/src/Dto/UserDto';
import { URL_BACKEND_SQUIREL } from '@env';
import axiosInstance from '@/src/utils/axiosInstance';
import { RotationWarning } from '@/src/components/rotatingWarning/RotatingWarning';
import { useScreenOrientation } from '@/src/utils/useScreenOrientation';

export default function ProfileScreen() {
  const API_URL = URL_BACKEND_SQUIREL;
  const [isReady, setIsReady] = useState(false);
  const { userId, signOut } = useUser();
  const [userInfo, setUserInfo] = useState<UserInfosDto>();
  const [userPlayGame, setUserPlayGame] = useState<UserPlayGameFullDto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userDto, setUserDto] = useState<UserDto>({
    username: '',
    email: '',
    password: '',
    newPassword: undefined,
    consent: true,
  });
  const style_modal_bottom = false;
  const [errorMessage, setErrorMessage] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const { isLandscape, isMobile } = useScreenOrientation();

  useEffect(() => {
    const getInfosUser = async () => {
      const dataUser = await axiosInstance({
        method: 'get',
        url: `/users/${userId}`,
      });
      if (dataUser) {
        setUserInfo({ ...dataUser.data });
        setUserDto({ ...dataUser.data });
      }
    };
    const getUserWonGames = async () => {
      const dataGameUser = await axiosInstance({
        method: 'get',
        url: `/userPlayGame/${userId}`,
      });
      if (dataGameUser) {
        setUserPlayGame([...dataGameUser.data]);
      }
    };

    if (userId) {
      getInfosUser();
      getUserWonGames();
      setIsReady(true);
    }
  }, [userId, API_URL]);

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
        const response = await axiosInstance({
          method: 'put',
          url: `/users/${userId}`,
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
        <Image
          width={80}
          height={80}
          source={require('../../assets/images/squirrelLogo.png')}
        ></Image>
        <Spinner size={'large'} color="$orange10" />
      </View>
    );
  return (
    <ImageBackground
      style={styles.pageContainer}
      source={
        isMobile
          ? require('../../assets/images/profileScreenPortrait.jpg')
          : require('../../assets/images/profileScreen.jpg')
      }
    >
      {isLandscape && <RotationWarning />}
      <Stack marginTop={'5%'} gap={'2%'} justifyContent="center" alignContent="center">
        <Text
          color="#E65100"
          textAlign="center"
          marginBottom={'4%'}
          fontFamily="MysteryQuest_400Regular"
          $xs={{ fontSize: 40 }}
          $sm={{ fontSize: 50 }}
          $md={{ fontSize: 60 }}
          $lg={{ fontSize: 70 }}
        >
          Bienvenue {userInfo?.username}!
        </Text>
        <Stack
          marginBottom={'2%'}
          padding={'2%'}
          borderRadius={10}
          backgroundColor="rgba(255, 255, 255, 0.34)"
        >
          <Stack gap={'5%'}>
            <Stack justifyContent="center" gap={'2%'}>
              <Stack justifyContent="center" gap={'2%'}>
                <Text
                  fontFamily="BubblegumSans_400Regular"
                  fontStyle="italic"
                  color={'#fff'}
                  $xs={{ fontSize: 20 }}
                  $sm={{ fontSize: 25 }}
                  $md={{ fontSize: 30 }}
                  $lg={{ fontSize: 35 }}
                >
                  Identifiant
                </Text>
                <Text
                  fontFamily="BubblegumSans_400Regular"
                  color={'#E65100'}
                  $xs={{ fontSize: 30 }}
                  $sm={{ fontSize: 35 }}
                  $md={{ fontSize: 40 }}
                  $lg={{ fontSize: 45 }}
                >
                  {userInfo?.username}
                </Text>
              </Stack>

              <Stack justifyContent="center" gap={'2%'}>
                <Text
                  fontFamily="BubblegumSans_400Regular"
                  fontStyle="italic"
                  color={'#FFF'}
                  $xs={{ fontSize: 20 }}
                  $sm={{ fontSize: 25 }}
                  $md={{ fontSize: 30 }}
                  $lg={{ fontSize: 35 }}
                >
                  Email
                </Text>
                <Text
                  fontFamily="BubblegumSans_400Regular"
                  color={'#E65100'}
                  $xs={{ fontSize: 30 }}
                  $sm={{ fontSize: 35 }}
                  $md={{ fontSize: 40 }}
                  $lg={{ fontSize: 45 }}
                >
                  {userInfo?.email}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack flexDirection="column">
          <Stack
            gap={'2%'}
            marginBottom={'2%'}
            padding={'2%'}
            borderRadius={10}
            backgroundColor="rgba(255, 255, 255, 0.34)"
            alignItems="center"
            flexDirection="row"
          >
            <Text
              fontFamily="BubblegumSans_400Regular"
              $xs={{ fontSize: 30 }}
              $sm={{ fontSize: 35 }}
              $md={{ fontSize: 40 }}
              $lg={{ fontSize: 45 }}
              color={'#fff'}
            >
              Trophées gagnés:
            </Text>
            {userPlayGame.map((game) => (
              <Stack gap="1%" key={game.gameid} flexDirection="row">
                {game.avatar && game.numberoftimewon > 0 ? (
                  <Stack style={styles.containerTrophy}>
                    <Image
                      key={game.avatar}
                      style={styles.trophy}
                      source={{ uri: `${game.avatar.replace(/[\r\n]+/g, '')}` }}
                    />
                  </Stack>
                ) : null}
                {game.avatargold && game.numberoftimewon >= 5 ? (
                  <Stack gap="1%" key={game.gameid} style={styles.containerTrophyGolden}>
                    <Image
                      key={game.avatargold}
                      style={styles.trophy}
                      source={{ uri: `${game.avatargold.replace(/[\r\n]+/g, '')}` }}
                    />
                  </Stack>
                ) : null}
              </Stack>
            ))}
          </Stack>
          <Stack alignItems="center">
            <Button
              size="$5"
              backgroundColor={'#FF8A01'}
              onPress={() => changeInfosButton()}
              marginBottom={'2%'}
            >
              <Text fontFamily="MysteryQuest_400Regular" color={'#fff'} fontSize={25}>
                Change tes infos
              </Text>
            </Button>
            <Button size="$5" backgroundColor={'#FF8A01'} onPress={() => signOut()}>
              <Text fontFamily="MysteryQuest_400Regular" color={'#fff'} fontSize={25}>
                Quitter le jeu
              </Text>
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <CustomModal
        style_modal={style_modal_bottom}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      >
        <Form
          backgroundColor="rgba(0, 0, 0, 0.53)"
          style={styles.modalView}
          gap="2%"
          paddingTop="5%"
          paddingBottom="5%"
          $xs={{ width: 'auto' }}
          $sm={{ width: 'auto' }}
          $md={{ width: 300 }}
          $lg={{ width: 400 }}
          onSubmit={() => onFormSubmit()}
        >
          <Stack gap="2%" width="auto">
            <Label htmlFor="username">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular">
                Identifiant
              </Text>
            </Label>
            <Input
              id="username"
              value={userDto.username}
              onChangeText={(text) => handleInputChange('username', text)}
              autoCapitalize="none"
              width="100%"
            />
          </Stack>
          <Stack gap="2%" width="auto" justifyContent="center" alignItems="center">
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
            ></Input>
          </Stack>
          <Stack gap="2%" width="auto" justifyContent="center" alignItems="center">
            <Label htmlFor="password">
              <Text
                fontSize={Platform.OS === 'web' ? 25 : 16}
                color="#fff"
                fontFamily="BubblegumSans_400Regular"
              >
                Mot de passe
              </Text>
            </Label>
            <Input
              id="password"
              value={userDto.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
              autoCorrect={false}
              autoComplete="off"
              size="auto"
            />
          </Stack>
          <Stack marginTop={'3%'} gap="2%" width="auto" justifyContent="center" alignItems="center">
            <Label htmlFor="newPassword">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular">
                Nouveau mot de passe
              </Text>
            </Label>
            <Input
              id="newPassword"
              value={userDto.newPassword}
              onChangeText={(text) => handleInputChange('newPassword', text)}
              secureTextEntry
              autoCorrect={false}
              autoComplete="off"
              size="auto"
            />
          </Stack>
          <Stack
            paddingTop={'2%'}
            gap="2%"
            width="auto"
            justifyContent="center"
            alignItems="center"
          >
            <Label htmlFor="newPasswordConfirmation">
              <Text fontSize={25} color="#fff" fontFamily="BubblegumSans_400Regular">
                Confirmation du nouveau mot de passe
              </Text>
            </Label>
            <Input
              id="newPasswordConfirmation"
              value={confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry
              autoCorrect={false}
              autoComplete="off"
              size="auto"
            />
          </Stack>
          {errorMessage ? <Text>{errorMessage}</Text> : null}
          <Stack paddingTop={'2%'} alignItems="center" justifyContent="center">
            <Form.Trigger asChild>
              <Button marginBottom={'2%'} size={'2%'} backgroundColor="#FFF">
                <Text color="#FF8A01" fontFamily="MysteryQuest_400Regular" fontSize={25}>
                  Sauver
                </Text>
              </Button>
            </Form.Trigger>
            <Button
              size={'4%'}
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text color="#FF8A01" fontFamily="MysteryQuest_400Regular" fontSize={25}>
                Fermer
              </Text>
            </Button>
          </Stack>
        </Form>
      </CustomModal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  containerTrophy: {
    borderColor: '#FF8A01',
    borderRadius: 15,
    padding: 4,
    borderWidth: 2,
    height: 'auto',
    width: 'auto',
  },
  containerTrophyGolden: {
    borderColor: '#D4AF37',
    borderRadius: 15,
    padding: 4,
    borderWidth: 2,
    height: 'auto',
    width: 'auto',
  },
  trophy: {
    borderRadius: 15,
    height: 60,
    width: 60,
  },
  modalView: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#fff',
  },
});
