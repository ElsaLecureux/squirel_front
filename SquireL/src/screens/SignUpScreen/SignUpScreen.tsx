import { ImageBackground, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'tamagui';

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

export default function SignUpScreen({ navigation }: Props) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/welcomeScreen.jpg')}>
        <View style={styles.container}>
            <Text style={styles.text}>Sign Up</Text>
            <Button 
              onPress={() => navigation.navigate('AppDrawer')}
              >
                <Text>Register</Text>
              </Button>
            <Button
              onPress={() => navigation.navigate('SignIn')}
             >
              <Text>Sign In</Text>
             </Button>
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
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 0.5,
    alignItems: 'center',
  },
  text: {
    color: '#fff' 
  }
});