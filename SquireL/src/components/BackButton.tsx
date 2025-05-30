import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons/faArrowCircleLeft';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from 'tamagui';

type Props = {
  navigation: StackNavigationProp<any>;
};

export default function BackButton({ navigation }: Props) {
  return (
    <Button
      size="$2"
      height={50}
      variant="outlined"
      borderColor="#ff8a01"
      onPress={() => navigation.goBack()}
    >
      <FontAwesomeIcon
        icon={faArrowCircleLeft}
        style={{ color: '#ff8a01' }}
        size={35}
      ></FontAwesomeIcon>
    </Button>
  );
}
