import { Platform, ImageBackground, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './WelcomeScreenStyle';

import { Button, Text, YStack, XStack } from 'tamagui';
import { useUser } from '../../context/UserContext';
import type { RootStackParamList } from '../../types/navigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Readonly<Props>) {
  const { checkIfSignedIn } = useUser();

  const handleAuthCheck = async () => {
    const isSignedIn = await checkIfSignedIn();
    if (isSignedIn) {
      navigation.navigate('HomeStack', { screen: 'Home' });
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
              onPress={handleAuthCheck}
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
