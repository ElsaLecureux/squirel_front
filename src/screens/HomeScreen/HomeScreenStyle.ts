import { StyleSheet } from 'react-native';

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
    bottom: '30%',
    right: '46%',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  message: {
    backgroundColor: '#ff8a01',
    position: 'absolute',
    bottom: '35%',
    left: '15%',
    color: '#fff',
    height: 40,
    width: 80,
    fontSize: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squirrel: {
    position: 'absolute',
    bottom: '20%',
    left: '2%',
    height: 300,
    width: 300,
  },
  woodenSign: {
    position: 'absolute',
    bottom: '8%',
    right: '22%',
    width: 120,
    height: 180,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
});
