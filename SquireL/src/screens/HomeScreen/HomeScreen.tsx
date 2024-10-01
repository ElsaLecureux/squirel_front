import { Text, ImageBackground, StyleSheet, TouchableOpacity  } from 'react-native';

export default function HomeScreen({ navigation }) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/homeScreen.jpg')}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PlayroomStack', {screen: 'Playroom'})}
          >
            <Text>Go to Playroom</Text>
          </TouchableOpacity>           
        <TouchableOpacity
          onPress={() => navigation.navigate('Memory')}
          >
            <Text>Memory Game</Text>
          </TouchableOpacity>
        <TouchableOpacity  
          onPress={() => navigation.navigate('Profile')}
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