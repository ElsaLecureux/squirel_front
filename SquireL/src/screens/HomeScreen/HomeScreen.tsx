import { Button, ImageBackground, StyleSheet } from 'react-native';

export default function HomeScreen() {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/homeScreen.jpg')}>
        <Button title='Go to PlayRoom'>          
        </Button>
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