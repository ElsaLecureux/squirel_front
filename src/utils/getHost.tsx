import { Platform } from 'react-native';

export const getHost = () => {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return '10.117.60.67';
  } else {
    return 'localhost';
  }
};
