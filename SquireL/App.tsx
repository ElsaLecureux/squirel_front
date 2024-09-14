import { View, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import LoadingScreen from './src/screens/LoadingScreen';
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen';

export default function App() {

  const [isLoading, setIsloading] = useState(true);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).then(() => setTimeout(() => {setIsloading(false)}, 2000));
  }

  useEffect(() => {
    changeScreenOrientation();
  },[]);

  return (    
    <View style={styles.container} >
      {
       isLoading ? <LoadingScreen></LoadingScreen> : <WelcomeScreen></WelcomeScreen>
      }      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

