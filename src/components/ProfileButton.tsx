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

  const iconSize = media.sm ? 18 : media.md ? 28 : 35;
  return (
    <XStack marginRight="3%" marginTop="3%" gap={12}>
      <Button
        $xs={{ height: 30, size: 30 }}
        $sm={{ height: 30, size: 30 }}
        $md={{ height: 50, size: 50 }}
        $lg={{ height: 60, size: 60 }}
        variant="outlined"
        borderColor="#ff8a01"
        paddingLeft={'30%'}
        paddingRight={'30%'}
        onPress={() => navigation.navigate('Profile')}
      >
        <FontAwesomeIcon icon={faUser} style={{ color: '#ff8a01' }} size={iconSize} />
      </Button>
    </XStack>
  );
};
