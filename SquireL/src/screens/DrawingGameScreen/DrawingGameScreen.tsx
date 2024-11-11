import { StyleSheet } from 'react-native';
import { YStack, Text, XStack, Image } from 'tamagui';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons/faPersonDigging'; 

export default function DrawingGameScreen() {

  return (    
    <YStack 
    gap={15}
    style={styles.pageContainer}>
      <XStack
      alignContent='center'
      gap={15}>
        <Text
        color={'#FF8A01'}
        fontSize={30}>
            Drawing Game
        </Text>
        <Image
           source={{
            uri:require('../../assets/icons/color-palette.png'), 
            width: 50,
            height: 50}}
           ></Image>    
      </XStack>        
      <XStack
      alignItems='center'
      gap={15}>
          <Text
          fontSize={18}>
          ... work in progress
          </Text>
         <FontAwesomeIcon icon={faPersonDigging} style={{color: "#000"}}  size={40}/>
      </XStack>
    </YStack>       
  );
}

const styles = StyleSheet.create({
    pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    },
    title: {
      flex: 1
    }
});