import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, Image, View, Text, Button } from 'tamagui';

export default function KitchenScreen() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/images/kitchenScreen.jpg')}
      style={styles.pageContainer}
      resizeMode="stretch"
    >
      <Stack
        flex={1}
        width={'100%'}
        justifyContent="center"
        alignItems="flex-end"
        paddingRight={'10%'}
        paddingTop={'5%'}
      >
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
        >
          {!isVisible ? (
            <Image
              $xs={{ width: 30, height: 30 }}
              $sm={{ width: 40, height: 40 }}
              $md={{ width: 60, height: 60 }}
              $lg={{ width: 80, height: 80 }}
              source={require('../../assets/images/avocado.gif')}
            ></Image>
          ) : (
            ''
          )}
        </TouchableOpacity>

        {isVisible ? (
          <View
            justifyContent="center"
            backgroundColor={'rgba(255, 255, 255, 0.51)'}
            style={styles.recipeAnnoucement}
            $xs={{ width: 100, height: 100 }}
            $sm={{ width: 150, height: 150 }}
            $md={{ width: 200, height: 200 }}
            $lg={{ width: 300, height: 300 }}
          >
            <Button
              style={styles.closeButton}
              $xs={{ size: '$2' }}
              $sm={{ size: '$3' }}
              $md={{ size: '$4' }}
              $lg={{ size: '$5' }}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} style={{ color: '#fff' }} />
            </Button>
            <Text
              textAlign="center"
              $xs={{ fontSize: 15 }}
              $sm={{ fontSize: 20 }}
              $md={{ fontSize: 30 }}
              $lg={{ fontSize: 40 }}
              fontFamily="BubblegumSans_400Regular"
              alignSelf="center"
              color={'#000'}
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
  recipeAnnoucement: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff8a01',
  },
});
