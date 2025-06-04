import { Animated, Easing, ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'tamagui';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons/faHeadphones';
import { useEffect, useRef } from 'react';
import { PlayroomStackParamList } from '@/src/types/navigationTypes';
import { styles } from './PlayroomStyle';

type PlayroomScreenNavigationProp = StackNavigationProp<PlayroomStackParamList, 'Playroom'>;

type Props = {
  navigation: PlayroomScreenNavigationProp;
};

export default function PlayroomScreen({ navigation }: Readonly<Props>) {
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

  //todo wooden sign for the kictehn with the ani,ation for library and change animation library for size growing and shrinking

  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/playroomScreen.png')}
      resizeMode="stretch"
    >
      <TouchableOpacity style={styles.kitchen} onPress={() => navigation.navigate('Kitchen')}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Image
            source={require('../../assets/images/woodenSignKitchen.png')}
            style={{ width: 150, height: 150 }}
          />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headPhones} onPress={() => navigation.navigate('Library')}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <FontAwesomeIcon
            icon={faHeadphones}
            style={{ color: '#ff8a01', width: 80, height: 80 }}
          />
        </Animated.View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
