import { Button, ImageBackground, StyleSheet, Text} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';


export default function App() {

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  useEffect(() => {
    changeScreenOrientation();
  })

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
