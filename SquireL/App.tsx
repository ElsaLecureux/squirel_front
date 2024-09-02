import { View, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';
import WelcomePage from './WelcomePage';

export default function App() {

  const [isLoading, setIsloading] = useState(true);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    console.log(await ScreenOrientation.getOrientationAsync())
    if (await ScreenOrientation.getOrientationAsync() === 4){
      setIsloading(false);
    }
  }

  useEffect(() => {
    changeScreenOrientation();
  })

  return (    
    <View style={styles.container} >
      {
       isLoading ? <LoadingScreen></LoadingScreen> : <WelcomePage></WelcomePage>
      }      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

