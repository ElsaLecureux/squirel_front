import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingTop: '5%',
    gap: 4,
  },
  pageTitle: {
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  cardsSet: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '60%',
  },
  invisible: {
    display: 'none',
  },
  cardStyle: {
    width: 140,
    height: 200,
  },
  faceB: {
    width: 140,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#ff8a01',
  },
  faceA: {
    width: 140,
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#ff8a01',
  },
  animalImageContainer: {
    flex: 4,
    width: '100%',
    backgroundColor: '#ff8a01',
  },
  textContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ff8a01',
  },
  backImage: {
    height: '100%',
    width: '100%',
  },
  animalImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  textCard: {
    height: '100%',
    color: 'white',
    textTransform: 'uppercase',
    alignContent: 'center',
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
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalView: {
    height: 600,
    width: 400,
    backgroundColor: '#ff8a01',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff8a01',
  },
});
