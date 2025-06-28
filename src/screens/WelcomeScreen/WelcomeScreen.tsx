import { Platform, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './WelcomeScreenStyle';

import { Button, Text, YStack, XStack, Image } from 'tamagui';
import { useUser } from '../../context/UserContext';
import type { RootStackParamList } from '../../types/navigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Readonly<Props>) {
  const { isSignedIn } = useUser();

  const handleAuthCheck = async () => {
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
        <YStack width="66%" height="100%" position="relative">
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Image
              source={require('../../assets/images/squirelTitle.png')}
              aspectRatio={759 / 303}
              maxWidth={Platform.OS === 'web' ? 700 : 320}
              width={Platform.OS === 'web' ? '70%' : '90%'}
              $sm={{ width: '85%', maxWidth: 350 }}
              $md={{ width: '70%', maxWidth: 500 }}
              $lg={{ width: '65%', maxWidth: 650 }}
              resizeMode="contain"
            />
          </YStack>
          <YStack
            position="absolute"
            left={0}
            right={0}
            alignItems="center"
            bottom={Platform.OS === 'web' ? '15%' : '10%'}
          >
            <Button
              backgroundColor="#FF8A01"
              width="auto"
              onPress={handleAuthCheck}
              hoverStyle={{
                backgroundColor: '#E68200',
              }}
              size="$9"
              $sm={{ size: '$5' }}
              $md={{ size: '$7' }}
              $lg={{ size: '$9' }}
            >
              <Text
                fontFamily="MysteryQuest_400Regular"
                color="#FFF"
                fontSize={42}
                $sm={{ fontSize: 24 }}
                $md={{ fontSize: 36 }}
                $lg={{ fontSize: 42 }}
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
