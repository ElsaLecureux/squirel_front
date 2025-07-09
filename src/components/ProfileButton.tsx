import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Button, useMedia, XStack } from 'tamagui';
import { HomeStackParamList } from '../types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<HomeStackParamList>;
};

export const ProfileButton = ({ navigation }: Props) => {
  const media = useMedia();

  const iconSize = media.sm ? 18 : media.md ? 28 : 32;
  return (
    <XStack marginRight="3%" marginTop="3%">
      <Button
        $xs={{ size: '$2' }}
        $sm={{ size: '$3' }}
        $md={{ size: '$4' }}
        $lg={{ size: '$5' }}
        variant="outlined"
        borderColor="#ff8a01"
        onPress={() => navigation.navigate('Profile')}
      >
        <FontAwesomeIcon icon={faUser} style={{ color: '#ff8a01' }} size={iconSize} />
      </Button>
    </XStack>
  );
};
