import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons/faArrowCircleLeft';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, useMedia } from 'tamagui';

type Props = {
  navigation: StackNavigationProp<any>;
};

export default function BackButton({ navigation }: Readonly<Props>) {
  const media = useMedia();

  const iconSize = media.sm ? 18 : media.md ? 28 : 32;
  return (
    <Button
      $xs={{ size: '$2' }}
      $sm={{ size: '$3' }}
      $md={{ size: '$4' }}
      $lg={{ size: '$5' }}
      variant="outlined"
      borderColor="#ff8a01"
      onPress={() => navigation.goBack()}
    >
      <FontAwesomeIcon
        icon={faArrowCircleLeft}
        style={{ color: '#ff8a01' }}
        size={iconSize}
      ></FontAwesomeIcon>
    </Button>
  );
}
