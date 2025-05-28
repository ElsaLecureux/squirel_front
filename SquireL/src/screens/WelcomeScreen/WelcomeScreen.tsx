import { Platform, ImageBackground, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, Text, YStack, XStack } from 'tamagui';
import { useUser } from '../../context/UserContext';
import { useEffect } from 'react';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function WelcomeScreen({ navigation }: Readonly<Props>) {
  const { checkIfSignedIn } = useUser();

  const handleAuthCheck = async () => {
    const isSignedIn = await checkIfSignedIn();
    if (isSignedIn) {
      navigation.navigate('AppDrawer');
    } else {
      navigation.navigate('SignIn');
    }
  };

  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/welcomeScreen.jpg')}
    >
      <XStack flex={1}>
        <YStack flex={2} justifyContent="center" alignItems="flex-start" paddingLeft="2%">
          <Image
            style={styles.titleWelcomePage}
            source={require('../../assets/images/titleWelcomePage3.png')}
          />
          <YStack alignItems="center" width="100%" paddingTop="5%">
            <Button
              size={Platform.OS === 'web' ? '$8' : '$5'}
              variant="outlined"
              borderColor="#FF8A01"
              width="auto"
              onPress={() => handleAuthCheck()}
            >
              <Text
                fontSize={Platform.OS === 'web' ? 38 : 24}
                fontFamily="MedievalSharp_400Regular"
                color="#FF8A01"
              >
                Play
              </Text>
            </Button>
          </YStack>
        </YStack>
        <YStack flex={1}></YStack>
      </XStack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
  },
  titleWelcomePage: {
    width: '70%',
    height: '16%',
    alignSelf: 'center',
  },
});
