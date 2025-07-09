import { useScreenOrientation } from '@/src/utils/useScreenOrientation';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, Image, View, Button } from 'tamagui';

export default function KitchenScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useScreenOrientation();

  return (
    <ImageBackground
      source={require('../../assets/images/kitchenScreen.jpg')}
      style={styles.pageContainer}
      resizeMode="stretch"
    >
      <Stack height={'100%'} width={'100%'} justifyContent="center" alignItems="center">
        <Stack
          width={'100%'}
          justifyContent="center"
          paddingRight={'10%'}
          paddingTop={isMobile ? '5%' : ''}
          alignItems="flex-end"
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
        </Stack>

        {isVisible ? (
          <View
            flex={1}
            justifyContent="center"
            style={styles.recipe}
            backgroundColor={'rgb(255, 255, 255)'}
            $xs={{ width: '100%', height: '100%' }}
            $sm={{ width: '100%', height: '100%' }}
            $md={{ width: '80%', height: '70%' }}
            $lg={{ width: '70%', height: '60%' }}
            padding={'4%'}
            borderRadius={10}
            marginBottom={isMobile ? '5%' : ''}
          >
            <Button
              style={styles.closeButton}
              $xs={{ size: '$2' }}
              $sm={{ size: '$3' }}
              $md={{ size: '$4' }}
              $lg={{ size: '$4' }}
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <FontAwesomeIcon icon={faXmark} style={{ color: '#fff' }} />
            </Button>
            <Image
              zIndex={0}
              objectFit="cover"
              height={'100%'}
              width={'100%'}
              borderRadius={0}
              source={require('../../assets/images/recipeGuacamole.jpg')}
            />
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
  recipe: {
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff8a01',
    zIndex: 10,
    elevation: 10,
  },
});
