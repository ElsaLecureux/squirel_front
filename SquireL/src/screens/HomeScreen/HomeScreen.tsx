import { Text, ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, Image } from 'tamagui';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad'; 

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/homeScreen.jpg')}>
        <Button
          chromeless
          onPress={() => navigation.getParent()?.navigate('PlayroomStack', {screen: 'Playroom'})}
          >
            <FontAwesomeIcon icon={faGamepad} style={{color: "#ff8a01",}} />
          </Button>           
        <Button
          chromeless
          onPress={() => navigation.navigate('Memory')}
          >
             <Image
           source={{
            uri:require('../../assets/icons/poker-cards.png'), 
            width: 20,
            height: 20}}
           ></Image>       
          </Button>
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
    pageContainer: {
    flex: 1,
   
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  }
});