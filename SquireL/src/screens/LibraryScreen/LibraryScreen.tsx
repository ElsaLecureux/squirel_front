
import { ImageBackground, Platform, StyleSheet } from 'react-native';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay';

import { useQuery, gql } from '@apollo/client';
import { WebView } from 'react-native-webview';

import { Text, XStack, ScrollView, Button, Image, YStack, Separator, Tabs } from 'tamagui';
import React, { useState } from 'react';
import { ShowByUrlResponse } from '@/src/Dto/ShowByUrlDto';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



export default function LibraryScreen() {

  const urlPodcasts = [
    "https://www.radiofrance.fr/franceinter/podcasts/les-odyssees",
    "https://www.radiofrance.fr/franceinter/podcasts/bestioles",
    "https://www.radiofrance.fr/francemusique/podcasts/les-zinstrus"
  ]
  const podcasts = [
    {
      id: 0, name: "Les Odyssées", image: require('../../assets/images/lesOdyssees.jpg')
    },
    {
      id: 1, name: "Bestioles", image: require('../../assets/images/bestioles.jpg')
    },
    {
      id: 2, name: "Les-Zinstrus", image: require('../../assets/images/lesZinstrus.jpg')
    }
  ];
  const [podcastSelected, setPodcastSelected] = useState(0);
  const GET_SHOW_BY_URL = gql`
  query GetShowByUrl($url: String!) {
    showByUrl(url: $url) {
      title
      standFirst
      diffusionsConnection {
        edges {
          node {
            id
            title
            published_date
            podcastEpisode {
              playerUrl
              title
            }
          }
        }
      }
    }
  }
`;


type node = {
  id: string; 
  title: string; 
  published_date: string; 
  podcastEpisode: { 
    playerUrl: string; 
    title: string; }
  };

  const [modalVisible, setModalVisible] = useState(false);

  
  const [episodeInfos, setEpisodeInfos] = useState({
    id: '', 
    title: '', 
    published_date: '', 
    podcastEpisode: { 
      playerUrl: '', 
      title: '' }
  });
  const style_modal_bottom = true

  const useShowByUrl = (podcastSelected: number, urlPodcasts: string[]) => {
    const { loading, error, data } = useQuery<ShowByUrlResponse>(GET_SHOW_BY_URL, {
      variables: { url: urlPodcasts[podcastSelected] },
    });
  
    return { loading, error, data };
  };

  const { loading, error, data } = useShowByUrl(podcastSelected, urlPodcasts);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error while loading data</Text>;

  const onplay = (node: node) => {
    setEpisodeInfos(node);
    setModalVisible(true);
  }

  const changeSelectedPodcast = (podcastId: number) => {
    setPodcastSelected(podcastId)
  }

  //todo add condition to add podcast to list only if playerUrl is available: 404 in console: in networK?

  return (
    <ImageBackground source={require('../../assets/images/libraryScreen.png')} style={styles.pageContainer}>
      <XStack
        style={styles.pageTitleContainer}>
        <Text
          fontSize={40}
          color={"#fff"}
          fontFamily="MedievalSharp-Regular"
          style={styles.pageTitle}>
              AudioBooks Library
        </Text>
      </XStack>
      <Tabs
       orientation="horizontal"
       flexDirection="column"
       flex={1}
       width={'100%'}
       alignItems='center'
       justifyContent='center'
       defaultValue="1">
        <Tabs.List>
        { podcasts.map((podcast)=> (
          <Tabs.Tab key={podcast.id} value={podcast.id.toString()} onPress={() => changeSelectedPodcast(podcast.id)}>
             <Text>{podcast.name}</Text>
          </Tabs.Tab>
        ))}
        </Tabs.List>
        { podcasts.map((podcast)=> (
          <ScrollView
          backgroundColor="rgba(255, 255, 255, 0)"
          style={styles.scrollerView} key={podcast.id} >
          <Tabs.Content style={styles.scrollerView} value={podcast.id.toString()}>
          <YStack style={styles.podcastTitlesContainer}>
            <Text
            alignSelf='center'
            fontSize={40}
            color={"#fff"}>
                {data?.showByUrl.title}
            </Text>
            <Text
            alignSelf='center'
            fontSize={30}
            color={"#fff"}>
                {data?.showByUrl.standFirst}
            </Text>
          </YStack>
          <YStack
          gap={15}
          style={styles.podcastContainer}>
              {
                data?.showByUrl.diffusionsConnection.edges.map(({ node }) => (
                  <YStack style= {styles.episodeCardContainer} key={podcast.id}>
                    <Separator alignSelf="stretch" style={styles.episodeSeparator}/> 
                    <XStack style= {styles.episodeCard} >
                      <XStack style= {styles.episodeTitleContainer}>
                        <Image style={styles.episodeImage} source={podcast.image}>

                        </Image>
                        <Text fontSize={15} style={styles.episodeTitle}>
                          {node.title}
                        </Text>
                      </XStack>
                      <Button size="$6" style={styles.episodeButton} onPress={() => onplay(node) }>
                        <FontAwesomeIcon icon={faCirclePlay} style={styles.iconButtonStyle} />
                      </Button> 
                    </XStack>
                  </YStack>
                ))}
          </YStack>
        </Tabs.Content>
        </ScrollView>
      ))}
        <CustomModal
          style_modal = {style_modal_bottom}
          setModalVisible= {setModalVisible}
          modalVisible= {modalVisible} >
            {    
                  Platform.OS === 'web' ? (
                  <iframe
                  style={styles.playerWeb}
                  key={episodeInfos.id}
                  frameBorder="0"
                  title={episodeInfos.podcastEpisode.title}
                  src={episodeInfos.podcastEpisode.playerUrl}
                  />
                ) : (
                  <WebView
                    key={episodeInfos.id}
                    source={{ uri: episodeInfos.podcastEpisode.playerUrl }}
                  />
                )
            }
            <Button size="$2" style={styles.modalCloseButton}onPress={() => setModalVisible(false)}>
              <FontAwesomeIcon icon={faXmark} style={{color: '#fff'}} />
            </Button>
        </CustomModal>
      </Tabs>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  scrollerView:{
    width: '100%'
  },
  pageTitleContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
 },
  pageTitle:{
    alignItems: 'center',
    justifyContent: 'center',
 },
  podcastTitlesContainer:{
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
    gap: 15
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
    height: 0
  },
  'episodeSeparator:first-child': {
    backgroundColor: '#fff'
  },
  episodeTitleContainer: {
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  episodeTitle: {
    color: '#fff',
    fontSize: 23,
  },
  episodeImage: {
    width: 160,
    height: 160,
  },
  episodeButton: {
    backgroundColor:'#ff8a01'
  },
  iconButtonStyle: {
    color: "#fff", 
    width: 40, 
    height: 40
  },
  playerWeb:{
    width: 800
  },
  modalCloseButton:{
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff8a01'
  }
});
