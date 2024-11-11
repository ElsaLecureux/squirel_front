import { ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { YStack, Text, XStack, Image } from 'tamagui';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons/faPersonDigging';

type MemoryScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Memory'
>;

type Props = {
  navigation: MemoryScreenNavigationProp;
};

export default function MemoryScreen({ navigation }: Props) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/memoryGame.jpeg')}>
         <YStack 
          gap={15}>
          <XStack
            alignContent='center'
            gap={15}>
            <Text
            color={'#953990'}
            fontSize={30}>
                Memory
            </Text>
            <Image
              source={{
                uri:require('../../assets/icons/poker-cards.png'), 
                width: 50,
                height: 50}}
              ></Image>    
          </XStack>        
          <XStack
          alignItems='center'
          gap={15}>
              <Text
              color={'#FFF'}
              fontSize={18}>
              ... work in progress
              </Text>
            <FontAwesomeIcon icon={faPersonDigging} style={{color: "#FFF"}}  size={40}/>
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
    height: '100%',
    width: '100%'
  },
  title: {
  }
});