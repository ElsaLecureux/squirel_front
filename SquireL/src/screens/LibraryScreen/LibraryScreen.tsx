import { StyleSheet} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons/faHeadphones'; 
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons/faPersonDigging';

import { YStack, Text, XStack } from 'tamagui';

export default function LibraryScreen() {

  return (    
    <YStack
    gap={15}
    style={styles.pageContainer}>
      <XStack
      gap={15}>
        <Text 
        fontSize={30}
        style={styles.title}>
          Library
        </Text>
        <FontAwesomeIcon icon={faHeadphones} style={{color: "#ff8a01"}} size={50} />  
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
      color: '#FF8A01'
    }    
});