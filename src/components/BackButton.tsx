import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons/faArrowCircleLeft';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, useMedia } from 'tamagui';

type Props = {
  navigation: StackNavigationProp<any>;
};

export default function BackButton({ navigation }: Readonly<Props>) {
  const media = useMedia();

  const iconSize = media.sm ? 20 : media.md ? 28 : 35;
  return (
    <Button
      $sm={{ height: 40, size: 40 }}
      $md={{ height: 50, size: 50 }}
      $lg={{ height: 60, size: 60 }}
      variant="outlined"
      borderColor="#ff8a01"
      onPress={() => navigation.navigate('Home')}
    >
      <FontAwesomeIcon
        icon={faArrowCircleLeft}
        style={{ color: '#ff8a01' }}
        size={iconSize}
      ></FontAwesomeIcon>
    </Button>
  );
}
