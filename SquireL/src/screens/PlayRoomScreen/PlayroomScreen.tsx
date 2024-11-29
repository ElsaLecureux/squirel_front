import { ImageBackground, StyleSheet} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Image } from 'tamagui';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons/faPuzzlePiece';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons/faHeadphones';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
//import treasureChest from '../../assets/icons/treasure-chest.png';


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
          size="$4"
          chromeless
          onPress={() => navigation.navigate('Puzzle')}
          >
            <FontAwesomeIcon icon={faPuzzlePiece} style={{color: "#ff8a01",}} />          
        </Button>
        <Button 
          size="$4"
          chromeless
          onPress={() => navigation.navigate('DrawingGame')}
          >
           <Image
           source={require('../../assets/icons/color-palette.png')}
            width= {20}
            height= {20}
           ></Image>           
        </Button>
        <Button 
          size="$4"
          chromeless
          onPress={() => navigation.getParent()?.navigate('DrawingsBox')}
          > 
           <Image
          source={require('../../assets/icons/treasure-chest.png')}
          width= {20}
          height= {20}
           ></Image>       
        </Button>
        <Button 
          size="$4"
          chromeless
          onPress={() => navigation.getParent()?.navigate('Library')}
          > 
           <FontAwesomeIcon icon={faHeadphones} style={{color: "#ff8a01",}} />        
        </Button>
        <Button 
          size="$4"
          chromeless
          onPress={() => navigation.getParent()?.navigate('LookAndFind')}
          > 
           <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ff8a01",}} />      
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
    width: '100%',
    height: '100%',
  }
});