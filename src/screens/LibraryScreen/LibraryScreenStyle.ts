import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  loadingContainer: {
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2%',
  },
  scrollerView: {
    width: '100%',
  },
  pageTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
  },
  pageTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  podcastTitlesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  podcastContainer: {
    marginTop: 25,
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeCardContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '55%',
    gap: 15,
  },
  episodeCard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  episodeSeparator: {
    backgroundColor: '#ff8a01',
  },
  'episodeSeparator:last-child': {
    height: 0,
  },
  'episodeSeparator:first-child': {
    backgroundColor: '#fff',
  },
  episodeTitleContainer: {
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeTitle: {
    fontFamily: 'BubblegumSans_400Regular',
    fontSize: 20,
    color: '#fff',
  },
  episodeImage: {
    width: 160,
    height: 160,
  },
  episodeButton: {
    backgroundColor: '#ff8a01',
  },
  iconButtonStyle: {
    color: '#fff',
    width: 40,
    height: 40,
  },
  playerWeb: {
    width: 800,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff8a01',
  },
});
