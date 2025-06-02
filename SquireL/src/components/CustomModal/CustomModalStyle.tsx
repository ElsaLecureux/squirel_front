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
    height: 600,
    width: 400,
    margin: 20,
    backgroundColor: '#ff8a01',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cardFirstHalf: {
    backgroundColor: '#ff8a01',
    flex: 2,
  },
  cardSecondHalf: {
    backgroundColor: '#ff8a01',
    flex: 1,
  },
  image: {
    width: 150,
    height: 280,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
