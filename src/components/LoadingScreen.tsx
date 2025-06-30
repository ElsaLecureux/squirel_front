// add lauching animation
import { StyleSheet } from 'react-native';
import { YStack, View, Image, Spinner } from 'tamagui';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <YStack>
        <Image width={80} height={80} source={require('../assets/images/squirrelLogo.png')}></Image>
        <Spinner size={'large'} color="$orange10" />
      </YStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
