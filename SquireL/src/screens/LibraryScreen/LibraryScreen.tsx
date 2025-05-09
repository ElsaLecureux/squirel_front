
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { ImageBackground, ImageSourcePropType, Platform, StyleSheet } from 'react-native';

import { gql, useQuery } from '@apollo/client';
import { WebView } from 'react-native-webview';

import { ShowByUrlResponse } from '@/src/Dto/ShowByUrlDto';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { Button, Image, ScrollView, Separator, Tabs, Text, XStack, YStack } from 'tamagui';


interface Podcast {
  id: string,
  name: string, 
  image: ImageSourcePropType,
  url: string
}

export default function LibraryScreen() {

  const podcasts: Podcast[] = [
    {
      id: "odyssees", name: "Les Odyssées", image: require('../../assets/images/lesOdyssees.jpg'), url: "https://www.radiofrance.fr/franceinter/podcasts/les-odyssees"
    },
    {
      id: "bestioles", name: "Bestioles", image: require('../../assets/images/bestioles.jpg'), url: "https://www.radiofrance.fr/franceinter/podcasts/bestioles"
    },
    {
      id: "zinstrus", name: "Les-Zinstrus", image: require('../../assets/images/lesZinstrus.jpg'), url: "https://www.radiofrance.fr/francemusique/podcasts/les-zinstrus"
    }
  ];

  const [podcastSelected, setPodcastSelected] = useState<Podcast>(podcasts[0]);
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

  const useShowByUrl = (podcastSelected: Podcast) => {
    console.log('GET_SHOW_BY_URL', GET_SHOW_BY_URL);
    const { loading, error, data } = useQuery<ShowByUrlResponse>(GET_SHOW_BY_URL, {
      variables: { url: podcastSelected.url },
    });
  
    return { loading, error, data };
  };

  const { loading, error, data } = useShowByUrl(podcastSelected);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error while loading data</Text>;

  const onplay = (node: node) => {
    setEpisodeInfos(node);
    setModalVisible(true);
  }

  const changeSelectedPodcast = (podcast: Podcast) => {
    setPodcastSelected({...podcast})
  }

  //todo fix playerUrl issue on some episode

  return (
    <ImageBackground source={require('../../assets/images/libraryScreen.png')} style={styles.pageContainer}>
      <XStack
        style={styles.pageTitleContainer}>
        <Text
          fontSize={40}
          color={"#fff"}
          fontFamily="MysteryQuest_400Regular"
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
       defaultValue="odyssees">
        <Tabs.List>
        { podcasts.map((podcast)=> (
          <Tabs.Tab key={podcast.id} value={podcast.id} onPress={() => changeSelectedPodcast(podcast)}>
             <Text fontFamily="BubblegumSans_400Regular">{podcast.name}</Text>
          </Tabs.Tab>
        ))}
        </Tabs.List>
        { podcasts.map((podcast)=> (
          <ScrollView
          backgroundColor="rgba(255, 255, 255, 0)"
          style={styles.scrollerView} key={podcast.id} >
          <Tabs.Content style={styles.scrollerView} value={podcast.id}>
          <YStack style={styles.podcastTitlesContainer}>
            <Text
            fontFamily="BubblegumSans_400Regular"
            alignSelf='center'
            fontSize={40}
            color={"#fff"}>
                {data?.showByUrl.title}
            </Text>
            <Text
            fontFamily="BubblegumSans_400Regular"
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
                  <YStack style= {styles.episodeCardContainer} key={node.id}>
                    <Separator alignSelf="stretch" style={styles.episodeSeparator}/> 
                    <XStack style= {styles.episodeCard} >
                      <XStack style= {styles.episodeTitleContainer}>
                        <Image style={styles.episodeImage} source={podcast.image}>

                        </Image>
                        <Text
                        style={styles.episodeTitle}>
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
            <Button size="$2" style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
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
    fontFamily: "BubblegumSans_400Regular",
    fontSize: 20,
    color: '#fff',
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
