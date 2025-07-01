import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
