import { ImageBackground, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function SignUpScreen({ navigation }) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/welcomeScreen.jpg')}>
        <View style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('AppDrawer')}
              >
                <Text>Register</Text>
              </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
             >
              <Text>Sign In</Text>
             </TouchableOpacity>
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