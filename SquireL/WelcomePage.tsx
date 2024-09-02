import { Button, ImageBackground, StyleSheet, Text, View} from 'react-native';

export default function App() {

  return (    
      <ImageBackground style={styles.pageContainer} source={require('./welcomePage.jpg')}>
        <View style={styles.container}>
            <Text>Welcome to SquireL</Text>
            <Button title='Start to Play!'></Button>
        </View>
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
  container: {
    flex: 0.5,
    alignItems: 'center',
  }
});