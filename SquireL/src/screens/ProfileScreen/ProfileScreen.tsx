import { Platform, ImageBackground, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, YStack, XStack, View, Button } from 'tamagui';
import { useUser } from '../../context/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserInfosDto from '@/src/Dto/UserInfosDto';
import UserPlayGameFullDto from '@/src/Dto/UserPlayGameFullDto';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';


type ProfileScreenNavigationProp = StackNavigationProp<
  AppDrawerParamList,
  'Profile'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {

  const [host, setHost] = useState<string>();
  const API_URL = `http://${host}:3000`;
  const [isReady, setIsReady] = useState(false);
  const { userId } = useUser();
  const [userInfo, setUserInfo] = useState<UserInfosDto>();
  const [userPlayGame, setUserPlayGame] = useState<UserPlayGameFullDto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const style_modal_bottom = false;

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

    const getInfosUser = async () =>  {
      const dataUser = await axios({
        method: 'get',
        url: `${API_URL}/users/${userId}`,
      })
      console.log("infosUser:", dataUser.data)
      if(dataUser){
        setUserInfo({...dataUser.data})
      }
    }
    const getUserWonGames = async () =>  {
      const dataGameUser = await axios({
        method: 'get',
        url: `${API_URL}/userPlayGame/${userId}`,
      })
      console.log("infosUserGame", dataGameUser)
      if(dataGameUser){
        setUserPlayGame([...dataGameUser.data])
      }
    }

  const changeInfosButton = () => {
    setModalVisible(true)
  }
    
  if (!isReady) return (
  <View>
    <Text>
      Loading ...
    </Text> 
  </View>); 
  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/profileScreen.jpg')}>
         <YStack 
          gap={15}>
          <XStack
            alignContent='center'
            gap={15}>
            <Text
            color={'#fff'}
            fontSize={30}>
                Welcome {userInfo?.username}!
            </Text>
          </XStack>
          <YStack
            alignItems='center'
            gap={15}>
            <Text
              color={'#fff'}
              fontSize={20}>
                  Username: {userInfo?.username}
            </Text>
            <Text
              color={'#fff'}
              fontSize={20}>
                  email: {userInfo?.email}
            </Text>
            <Text fontSize={20} color={'#fff'}>Your Trophie(s):</Text>
            <XStack gap={15}> 
            {
              userPlayGame.map((game) => (
                  <XStack
                  gap={15}
                  key={game.gameid}>
                    { (game.avatar && game.numberoftimewon > 0) ? 
                    <Image style={styles.avatar} source={{ uri: `${game.avatar.replace(/[\r\n]+/g, "")}` }}/>
                    : ''
                    }
                    { (game.avatarGold && game.numberoftimewon >= 5) ?
                    <Image style={styles.avatar} source={{ uri: `${game.avatarGold.replace(/[\r\n]+/g, "")}` }}/>
                    : ''}
                  </XStack>)
              )
            } 
            </XStack>
          </YStack>
          <Button
            size={ Platform.OS === 'web' ? "$8" : "$5" }
            variant="outlined"
            borderColor="#FF8A01" 
            width='auto' 
            onPress={() => changeInfosButton()}>
              Change my infos              
          </Button>
          <CustomModal
          style_modal = {style_modal_bottom}
          setModalVisible= {setModalVisible}
          modalVisible= {modalVisible} >
            <XStack style={styles.modalView}>
              {userInfo?.username}
              <Button size="$2" style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <FontAwesomeIcon icon={faXmark} style={{color: '#fff'}} />
              </Button> 
            </XStack>
          </CustomModal>
        </YStack>
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
    pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#FF8A01'
  },
  avatar: {
    height: 40,
    width: 40
  },
  modalView: {
  height: 600,
  width: 400,
  backgroundColor: '#ff8a01',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center'
  },
  modalCloseButton:{
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff8a01'
  }
});
