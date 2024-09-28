import { ImageBackground, StyleSheet } from 'react-native';

export default function PlayroomScreen() {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/playroomScreen.jpg')}>
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
  }
});