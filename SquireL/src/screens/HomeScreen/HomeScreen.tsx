import { Text, ImageBackground, StyleSheet, TouchableOpacity  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

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
        <TouchableOpacity
          onPress={() => navigation.getParent()?.navigate('PlayroomStack', {screen: 'Playroom'})}
          >
            <Text>Go to Playroom</Text>
          </TouchableOpacity>           
        <TouchableOpacity
          onPress={() => navigation.navigate('Memory')}
          >
            <Text>Memory Game</Text>
          </TouchableOpacity>
        <TouchableOpacity  
          onPress={() => navigation.getParent()?.navigate('Profile')}
        > 
          <Text>Profile</Text>         
        </TouchableOpacity> 
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