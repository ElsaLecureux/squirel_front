import { ImageBackground, StyleSheet } from 'react-native';

export default function ProfileScreen() {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/profileScreen.jpeg')}>
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