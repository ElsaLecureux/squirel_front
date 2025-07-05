import { Animated, Easing, ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, useMedia } from 'tamagui';
import { useEffect, useRef } from 'react';
import { PlayroomStackParamList } from '@/src/types/navigationTypes';
import { styles } from './PlayroomStyle';

type PlayroomScreenNavigationProp = StackNavigationProp<PlayroomStackParamList, 'Playroom'>;

type Props = {
  navigation: PlayroomScreenNavigationProp;
};

export default function PlayroomScreen({ navigation }: Readonly<Props>) {
  const media = useMedia();

  const signHeight = media.sm ? 80 : media.md ? 120 : 150;
  const spinValue = useRef(new Animated.Value(0)).current;
  const rotate = spinValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-15deg', '15deg', '-15deg'],
  });

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/playroomScreen.png')}
      resizeMode="stretch"
    >
      <TouchableOpacity style={styles.kitchen} onPress={() => navigation.navigate('Kitchen')}>
        <Animated.View
          style={{
            transform: [
              { translateY: -signHeight / 2 },
              { rotate },
              { translateY: signHeight / 2 },
            ],
          }}
        >
          <Image
            source={require('../../assets/images/woodenSignKitchen.png')}
            width={80}
            height={80}
            $sm={{ width: 80, height: 80 }}
            $md={{ width: 120, height: 120 }}
            $lg={{ width: 150, height: 150 }}
          />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headPhones} onPress={() => navigation.navigate('Library')}>
        <Image
          source={require('../../assets/images/headphones.gif')}
          width={60}
          height={60}
          $sm={{ width: 60, height: 60 }}
          $md={{ width: 80, height: 80 }}
          $lg={{ width: 100, height: 100 }}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
}
