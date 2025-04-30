import { StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons/faPersonDigging';
import { YStack, XStack, Text } from 'tamagui';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';

export default function LookAndFindScreen() {

  return (    
      <YStack 
      gap={15}
      style={styles.pageContainer}>
        <XStack
        gap={15}>
            <Text
            fontSize={26}
            style={styles.text}>
            LookAndFind
            </Text>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#FF8A01"}}  size={40}/>
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
      text: {
        color:'#FF8A01'
    }    
});