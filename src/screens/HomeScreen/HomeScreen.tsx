import { Animated, ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles } from './HomeScreenStyle';

import { Image } from 'tamagui';
import { useRef, useEffect } from 'react';
import { HomeStackParamList } from '@/src/types/navigationTypes';
import { CommonActions } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Readonly<Props>) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const jumpAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),

        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    );

    jumpAnimation.start();
  }, [translateY]);

  return (
    <ImageBackground
      testID="background-image-home"
      style={styles.pageContainer}
      source={require('../../assets/images/homeScreen.jpg')}
    >
      <TouchableOpacity
        style={styles.door}
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: 'PlayroomStack',
            }),
          );
        }}
        accessibilityLabel="goToPlayroomButton"
      >
        <Image
          source={require('../../assets/images/key.gif')}
          width={80}
          height={80}
          $sm={{ width: 40, height: 40 }}
          $md={{ width: 60, height: 60 }}
          $lg={{ width: 80, height: 80 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.woodenSign}
        onPress={() => navigation.navigate('Memory')}
        accessibilityLabel="goToMemoryButton"
      >
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Image
            source={require('../../assets/images/woodenSign.png')}
            width={120}
            height={160}
            $sm={{ width: 60, height: 100 }}
            $md={{ width: 80, height: 120 }}
            $lg={{ width: 100, height: 140 }}
          />
        </Animated.View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
