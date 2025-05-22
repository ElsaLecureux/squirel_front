
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons/faCirclePlay';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { ImageBackground, ImageSourcePropType, Platform, StyleSheet } from 'react-native';

import { gql, useApolloClient } from '@apollo/client';
import { WebView } from 'react-native-webview';

import CustomModal from '@/src/components/CustomModal/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Image, ScrollView, Separator, Spinner, Tabs, Text, XStack, YStack } from 'tamagui';

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

type Podcast = {
  id: string,
  name: string, 
  image: ImageSourcePropType,
  url: string
}

type PodcastData = {
  title: string;
  standFirst: string;
  diffusionsConnection: {
    edges: Array<{
      node: Episode;
    }>;
  };
}

type PodcastDataMap = {
  [key: string]: PodcastData | undefined;
}

type Episode = {
  id: string;
  title: string;
  published_date: string;
  podcastEpisode: {
    playerUrl: string;
    title: string;
  };
};


export default function LibraryScreen() {

  const podcasts = useMemo<Podcast[]> (
  ()=> [
    {
      id: "odyssees", name: "Les Odyssées", image: require('../../assets/images/lesOdyssees.jpg'), url: "https://www.radiofrance.fr/franceinter/podcasts/les-odyssees"
    },
    {
      id: "bestioles", name: "Bestioles", image: require('../../assets/images/bestioles.jpg'), url: "https://www.radiofrance.fr/franceinter/podcasts/bestioles"
    },
    {
      id: "zinstrus", name: "Les-Zinstrus", image: require('../../assets/images/lesZinstrus.jpg'), url: "https://www.radiofrance.fr/francemusique/podcasts/les-zinstrus"
    },
    {
      id: "caillou", name: "Professeur Caillou", image: require('../../assets/images/professeurCaillou.jpg'), url: "https://www.radiofrance.fr/franceinter/podcasts/les-aventures-du-professeur-caillou"
    }
  ], 
  []
  ); 

  const [modalVisible, setModalVisible] = useState(false);
  const [loadedData, setLoadedData] = useState<PodcastDataMap>({});
  const [isLoading, setIsLoading] = useState(true);
  const [episodeInfos, setEpisodeInfos] = useState<Episode>({
    id: '', 
    title: '', 
    published_date: '', 
    podcastEpisode: { 
      playerUrl: '', 
      title: '' }
  });
  const style_modal_bottom = true

  //use podcasts for a loop to call the the query for each url
 const client = useApolloClient();

useEffect(() => {
  const fetchData = async () => {
    try {
      const results = await Promise.all(
        podcasts.map((podcast) =>
          client.query({
            query: GET_SHOW_BY_URL,
            variables: { url: podcast.url },
            fetchPolicy: 'cache-first',
          }).then(result => ({ id: podcast.id, data: result.data }))
        )
      );
      
      const dataMap: PodcastDataMap = {};
      results.forEach(({ id, data }) => {
        dataMap[id] = data.showByUrl;
      });

      setLoadedData(dataMap);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load podcast data", error);
    }
  };

  fetchData();
}, []);


  const onplay = (episode: Episode) => {
    setEpisodeInfos(episode);
    setModalVisible(true);
  }

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
       borderColor="#ff8a01"
       alignItems='center'
       justifyContent='center'
       defaultValue="odyssees">
        <Tabs.List>
        { podcasts.map((podcast)=> (
          <Tabs.Tab focusStyle={{ backgroundColor: '$orange10' }} key={podcast.id} borderColor="#ff8a01" value={podcast.id}>
             <Text fontFamily="BubblegumSans_400Regular">{podcast.name}</Text>
          </Tabs.Tab>
        ))}
        </Tabs.List>
        { isLoading ? 
          <YStack style={styles.loadingContainer}>
            <Image width={80} height={80} source={require('../../assets/images/squirrelLogo.png')}></Image>
            <Spinner size={'large'} color="$orange10" />
          </YStack> :
         podcasts.map((podcast)=> (
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
                {loadedData[podcast.id]?.title}
            </Text>
            <Text
            fontFamily="BubblegumSans_400Regular"
            alignSelf='center'
            fontSize={30}
            color={"#fff"}>
                {loadedData[podcast.id]?.standFirst}
            </Text>
          </YStack>
          <YStack
          gap={15}
          style={styles.podcastContainer}>
              {
                loadedData[podcast.id]?.diffusionsConnection.edges.map(({ node }) => (
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
      ))
      }
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
  loadingContainer:{
    height:'95%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2%'
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
