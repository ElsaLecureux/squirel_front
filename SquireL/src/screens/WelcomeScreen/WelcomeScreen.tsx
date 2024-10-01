import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import { Button, ButtonText, ButtonGroup } from "@/components/ui/button";
import { StackNavigationProp } from '@react-navigation/stack';

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
            <ButtonGroup>
              <Button size="md" variant="solid" action="primary"
                onPress={() => navigation.navigate('SignIn')}
              >
                <ButtonText>Start to Play!</ButtonText>
              </Button>

            </ButtonGroup>
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