import { ImageBackground, StyleSheet, Text, View, Button} from 'react-native';

export default function SignUpScreen({ navigation }) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/welcomeScreen.jpg')}>
        <View style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
            <Button 
              title='Register'
              onPress={() => navigation.navigate('HomeDrawer')}
              />
            <Button
              title='Sign In'
              onPress={() => navigation.navigate('SignInScreen')}
             />
        </View>
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
  },
  container: {
    flex: 0.5,
    alignItems: 'center',
  },
  text: {
    color: '#fff' 
  }
});