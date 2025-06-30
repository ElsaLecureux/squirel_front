import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, Image, View, Text, Button } from 'tamagui';

export default function KitchenScreen() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/images/kitchenScreen.png')}
      style={styles.pageContainer}
      resizeMode="stretch"
    >
      <Stack>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
        >
          <Image
            $xs={{ width: 30, height: 30 }}
            $sm={{ width: 40, height: 40 }}
            $md={{ width: 60, height: 60 }}
            $lg={{ width: 80, height: 80 }}
            source={require('../../assets/images/avocado.gif')}
          ></Image>
        </TouchableOpacity>

        {isVisible ? (
          <View
            $xs={{ width: 30, height: 30 }}
            $sm={{ width: 40, height: 40 }}
            $md={{ width: 60, height: 60 }}
            $lg={{ width: 80, height: 80 }}
          >
            <Button
              $xs={{ size: '$3' }}
              $sm={{ size: '$4' }}
              $md={{ size: '$5' }}
              $lg={{ size: '$6' }}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} style={{ color: '#fff' }} />
            </Button>
            <Text
              fontFamily="BubblegumSans_400Regular"
              alignSelf="center"
              color={'#000'}
              backgroundColor={'rgba(255, 255, 255, 0.51)'}
            >
              Bientôt une nouvelle aventure sur cette page!
            </Text>
          </View>
        ) : (
          ''
        )}
      </Stack>
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
