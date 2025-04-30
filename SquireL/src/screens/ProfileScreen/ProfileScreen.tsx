import { ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, YStack, XStack } from 'tamagui';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons/faPersonDigging';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

type ProfileScreenNavigationProp = StackNavigationProp<
  AppDrawerParamList,
  'Profile'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

export default function ProfileScreen({ navigation }: Props) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/profileScreen.jpg')}>
         <YStack 
          gap={15}>
          <XStack
            alignContent='center'
            gap={15}>
            <Text
            color={'#953990'}
            fontSize={30}>
                Profile
            </Text>
            <FontAwesomeIcon icon={faUser} style={{color: "#953990",}} size={40}/> 
          </XStack>        
          <XStack
          alignItems='center'
          gap={15}>
              <Text
              color={'#FFF'}
              fontSize={18}>
              ... work in progress
              </Text>
              <FontAwesomeIcon icon={faPersonDigging} style={{color: "#FFF",}} size={30}/> 
          </XStack>
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
  }
});