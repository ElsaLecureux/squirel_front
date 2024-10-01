import { ImageBackground, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignInScreen({ navigation }: Props) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/welcomeScreen.jpg')}>
        <View style={styles.container}>
            <Text style={styles.text}>Sign In</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AppDrawer')}
            >
              <Text>Validate</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text>Sign Up</Text>
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