import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button } from 'tamagui';

type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function WelcomeScreen({ navigation}: Props) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/welcomeScreen.jpg')}>
        <View style={styles.container}>
            <Text>Welcome to SquireL</Text>
              <Button size="$3" variant="outlined" theme='orange' color='#FF8A01'
                onPress={() => navigation.navigate('SignIn')}
              >Start to Play!
              </Button>
        </View>
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
    pageContainer: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  container: {
    flex: 0.5,
    alignItems: 'center',
  }
});