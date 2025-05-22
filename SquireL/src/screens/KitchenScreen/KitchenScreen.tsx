import { ImageBackground, StyleSheet } from 'react-native';
import { YStack, Text, XStack } from 'tamagui';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons/faPersonDigging'; 

export default function KitchenScreen () {

  return (
    <ImageBackground source={require('../../assets/images/kitchenScreen.png')} style={styles.pageContainer}>
      <YStack gap={15}>
        <XStack
        alignContent='center'
        gap={15}>
          <Text
          color={'#953990'}
          fontSize={30}>
              Kitchen
          </Text>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'   
      },
    title: {
    }    
});