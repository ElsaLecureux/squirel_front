import { StyleSheet } from 'react-native';
import { Text, Stack } from 'tamagui';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';

export default function PuzzleScreen() {

  return (    
      <Stack 
      gap={15}
      style={styles.pageContainer}>
        <Text 
        fontSize={24}
        style={styles.title}>
            Puzzle Screen
        </Text>
        <FontAwesomeIcon icon={faPuzzlePiece} style={{color: "#ff8a01"}} size={50} />  
      </Stack>

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
   color:'#FF8A01'
  }
});