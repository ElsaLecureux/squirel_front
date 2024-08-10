import { Button, ImageBackground, StyleSheet, Text} from 'react-native';

export default function App() {

  return (    
      <ImageBackground style={styles.container} source={require('./welcomePage.jpg')}>
          <Text>Welcome to SquireL</Text>
          <Button title='Start to Play!'></Button>
      </ImageBackground>    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
