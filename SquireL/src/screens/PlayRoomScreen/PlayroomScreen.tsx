import { ImageBackground, StyleSheet, Button } from 'react-native';

export default function PlayroomScreen({ navigation }) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/playroomScreen.jpg')}>
         <Button 
          title='Puzzle'
          onPress={() => navigation.navigate('Puzzle')}
          >          
        </Button>
        <Button 
          title='DrawingGame'
          onPress={() => navigation.navigate('DrawingGame')}
          >          
        </Button>
        <Button 
          title='DrawingBox'
          onPress={() => navigation.navigate('HomeStack', {screen: 'DrawingBoxScreen'})}
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