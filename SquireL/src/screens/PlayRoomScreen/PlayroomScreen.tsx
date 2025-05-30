import { Animated, Easing, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'tamagui';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons/faHeadphones';
import { useEffect, useRef } from 'react';

type PlayroomScreenNavigationProp = StackNavigationProp<PlayroomStackParamList, 'Playroom'>;

type Props = {
  navigation: PlayroomScreenNavigationProp;
};

export default function PlayroomScreen({ navigation }: Props) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const rotate = spinValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-15deg', '15deg', '-15deg'],
  });

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  useEffect(() => {
    spin();
  }, []);

  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/playroomScreen.png')}
    >
      <TouchableOpacity style={styles.kitchen} onPress={() => navigation.navigate('Kitchen')}>
        <Image
          source={require('../../assets/images/cauldron.gif')}
          style={{ width: 100, height: 100 }}
        />
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
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  kitchen: {
    marginLeft: 40,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  headPhones: {
    marginRight: 20,
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});
