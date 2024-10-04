import { ImageBackground, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type MemoryScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Memory'
>;

type Props = {
  navigation: MemoryScreenNavigationProp;
};

export default function MemoryScreen({ navigation }: Props) {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/memoryGame.jpg')}>
        <Text style={styles.title}>
            Memory
        </Text>
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
    pageContainer: { 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    flex: 1
  }
});