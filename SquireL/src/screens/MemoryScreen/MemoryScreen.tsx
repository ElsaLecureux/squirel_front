import { ImageBackground, StyleSheet, Text, Button } from 'react-native';

export default function MemoryScreen({ navigation }) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/memoryGame.jpg')}>
        <Text style={styles.title}>
            Memory
        </Text>
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
    pageContainer: { 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    flex: 1
  }
});