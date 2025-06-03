import { Animated, ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './HomeScreenStyle';

import { Image } from 'tamagui';
import { useRef, useEffect } from 'react';
import { HomeStackParamList } from '@/src/types/navigationTypes';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Readonly<Props>) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startJumping = (jumps = 3) => {
      const jumpAnimations = [];

      // Create a jump animation sequence for the specified number of jumps
      for (let i = 0; i < jumps; i++) {
        jumpAnimations.push(
          Animated.timing(translateY, {
            toValue: -10, // Move up by 10px
            duration: 200,
            useNativeDriver: true,
          }),
        );
        jumpAnimations.push(
          Animated.timing(translateY, {
            toValue: 0, // Back to original position
            duration: 200,
            useNativeDriver: true,
          }),
        );
      }

      // Create the sequence of jumps and start the animation
      Animated.sequence(jumpAnimations).start();
    };
    startJumping(3);

    const interval = setInterval(() => {
      startJumping(3);
    }, 10000);
    return () => clearInterval(interval);
  }, [translateY]);

  return (
    <ImageBackground
      testID="background-image-home"
      style={styles.pageContainer}
      source={require('../../assets/images/homeScreen.jpg')}
    >
      <TouchableOpacity
        style={styles.door}
        onPress={() => navigation.getParent()?.navigate('PlayroomStack', { screen: 'Playroom' })}
        accessibilityLabel="goToPlayroomButton"
      >
        <Image source={require('../../assets/images/key.gif')} style={{ width: 80, height: 80 }} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.woodenSign}
        onPress={() => navigation.navigate('Memory')}
        accessibilityLabel="goToMemoryButton"
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Image
            source={require('../../assets/images/woodenSign.png')}
            style={{ width: 120, height: 160 }}
          />
        </Animated.View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
