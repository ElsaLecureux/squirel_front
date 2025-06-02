import { ImageBackground, StyleSheet } from 'react-native';
import { YStack } from 'tamagui';

export default function KitchenScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/kitchenScreen.png')}
      style={styles.pageContainer}
      resizeMode="stretch"
    >
      <YStack gap={15}></YStack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  title: {},
});
