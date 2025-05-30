import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, XStack } from 'tamagui';
import { HomeStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<HomeStackParamList>;
};

export const Header = ({ navigation }: Props) => {
  return (
    <XStack marginRight="3%" marginTop="3%" gap={12}>
      <Button
        size="$2"
        height={50}
        variant="outlined"
        borderColor="#ff8a01"
        onPress={() => navigation.navigate('Profile')}
      >
        <FontAwesomeIcon icon={faUser} style={{ color: '#ff8a01' }} size={35} />
      </Button>
    </XStack>
  );
};
