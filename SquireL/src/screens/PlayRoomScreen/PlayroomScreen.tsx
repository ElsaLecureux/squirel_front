import { ImageBackground, StyleSheet, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type PlayroomScreenNavigationProp = StackNavigationProp<
  PlayroomStackParamList,
  'Playroom'
>;

type Props = {
  navigation: PlayroomScreenNavigationProp;
};

export default function PlayroomScreen({ navigation }: Props) {

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
          title='DrawingsBox'
          onPress={() => navigation.getParent()?.navigate('DrawingsBox')}
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