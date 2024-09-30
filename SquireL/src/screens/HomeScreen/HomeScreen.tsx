import { Button, ImageBackground, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/homeScreen.jpg')}>
        <Button 
          title='Go to PlayRoom'
          onPress={() => navigation.navigate('PlayroomStack', {screen: 'Playroom'})}
          >          
        </Button>
        <Button 
          title='Memory Game'
          onPress={() => navigation.navigate('Memory')}
          >          
        </Button>
        <Button 
          title='Profile'
          onPress={() => navigation.navigate('Profile')}
          >          
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