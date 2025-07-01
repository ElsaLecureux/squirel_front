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
    marginTop: '1%',
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
    flexDirection: 'row',
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
    gap: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeTitle: {
    fontFamily: 'BubblegumSans_400Regular',
    color: '#fff',
    flexWrap: 'wrap',
  },
  episodeButton: {
    backgroundColor: '#ff8a01',
  },
  iconButtonStyle: {
    color: '#fff',
    width: '80%',
    height: '80%',
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
