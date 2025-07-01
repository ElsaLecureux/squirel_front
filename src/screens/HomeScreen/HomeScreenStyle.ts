import { StyleSheet, Dimensions } from 'react-native';

const { width: vw, height: vh } = Dimensions.get('window');

export const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  door: {
    position: 'absolute',
    bottom: vh * 0.3,
    right: vw * 0.46,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  woodenSign: {
    position: 'absolute',
    bottom: vh * 0.08,
    right: vw * 0.22,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});
