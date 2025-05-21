import { Animated, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, Image, View } from 'tamagui';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad'; 
import { useRef, useEffect } from 'react';

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  
  const translateY = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {

    startJumping(3);

    const interval = setInterval(() => {
      startJumping(3);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (    
    <ImageBackground 
      style={styles.pageContainer} 
      source={require('../../assets/images/homeScreen.jpg')}
    >
      <Image style={styles.squirrel} source={require('../../assets/images/seriousSquirrel.png')}/>
      <View style={styles.message}>Hello</View>
      <TouchableOpacity
        style={styles.door}
        onPress={() => navigation.getParent()?.navigate('PlayroomStack', {screen: 'Playroom'})}
      >
        <FontAwesomeIcon icon={faGamepad} style={{ width: 120, height: 100, color: "#ff8a01" }} />
      </TouchableOpacity>           
      <TouchableOpacity 
        style={styles.woodenSign}
        onPress={() => navigation.navigate('Memory')}
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

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  door: {
    position: 'absolute',
    bottom: '30%',
    right: '45%',
    width: 120,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  message: {
    backgroundColor: "#ff8a01",
    position: 'absolute',
    bottom: '35%',
    left: '15%',
    color: "#fff",
    height: 40,
    width: 80,
    fontSize: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squirrel: {
    position: 'absolute',
    bottom: '20%',
    left: '2%',
    height: 300,
    width: 300
  },
  woodenSign: {
    position: 'absolute',
    bottom: '8%',
    right: '22%',
    width: 120,
    height: 180,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});
