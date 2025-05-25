import { ImageBackground, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { Text, XStack, Image, View } from 'tamagui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../../models/Card';
import { GamePlay } from '../../types/gamePlay';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { animals, imageMap } from '../../utils/memoryAnimals';
import { useFocusEffect } from '@react-navigation/native';
import { createCard } from '@/src/utils/createCard';
import axios from 'axios';

//todo fix after merge with develop to get userId

//todo create game with gamePlay
//todo create a button to start another party
//todo set gamePlay when cards are won

export default function MemoryScreen() {
  const [playingCards, setPlayingCards] = useState<Card[]>([]);
  //when cardsWon.length == 12 game is won!
  const isSavingRef = useRef(false);
  const userId = 1;
  const [cardsWon, setCardsWon] = useState<number[]>([]);
  const [card, setCard] = useState<Card>();
  const [cardPlayed, setCardPlayed] = useState<Card[]>([]);
  const [animalCardVisible, setAnimalCardVisible] = useState(false);
  const [endGameVisible, setEndGameVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(12).fill(false));
  const [gamePlay, setGamePlay] = useState<GamePlay | null>(null);
  const [host, setHost] = useState('localhost');
  const API_URL = `http://${host}:3000/gamePlay`;

  const shuffleCards = (cards: Card[]) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const createCardSet = () => {
    let shuffledCards = shuffleCards(animals.slice());
    shuffledCards = shuffledCards.slice(0, 6);
    let duplicateCards = [...shuffledCards, ...shuffledCards];
    duplicateCards = duplicateCards.map((card, index) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...cardWithoutId } = card;
      return createCard(index, cardWithoutId);
    });
    setPlayingCards(shuffleCards(duplicateCards));
  };

  const getHost = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      setHost('10.117.60.67');
    } else if (Platform.OS === 'web') {
      setHost('localhost');
    }
  };

  const flipCards = (id: number) => {
    if (cardPlayed.length < 2 && !visibleCards[id]) {
      setVisibleCards((prev) => {
        const cardsSet = [...prev];
        cardsSet[id] = !cardsSet[id];
        return cardsSet;
      });
      const cardToSave = playingCards.find((card) => card.id === id);
      if (cardToSave) {
        setCardPlayed((prev) => [...prev, cardToSave]);
      }
    }
  };

  const checkIfWonSet = () => {
    if (cardPlayed[0].name === cardPlayed[1].name) {
      setCardsWon((prev) => {
        const cardsSet = [...prev, cardPlayed[0].id, cardPlayed[1].id];
        return cardsSet;
      });
      setCard(cardPlayed[1]);
      setAnimalCardVisible(true);
      if (!gamePlay) {
      }
      setCardPlayed([]);
    } else {
      setTimeout(() => {
        setVisibleCards((prev) => {
          const cardsSet = [...prev];
          cardsSet[cardPlayed[0].id] = !cardsSet[cardPlayed[0].id];
          cardsSet[cardPlayed[1].id] = !cardsSet[cardPlayed[1].id];
          return cardsSet;
        });
        setCardPlayed([]);
      }, 2000);
    }
  };

  const saveGamePlay = useCallback(async () => {
    if (isSavingRef.current) {
      return;
    }
    isSavingRef.current = true;
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gamePlay),
        keepalive: true,
      });
      console.log('Game saved successfully');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      isSavingRef.current = false;
    }
  }, [API_URL, gamePlay]);

  //load gamePlay at party starting
  useEffect(() => {
    const loadGamePlay = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${API_URL}/${userId}`,
        });
        setGamePlay(response.data);
      } catch (error) {
        console.error('Failed to load game:', error);
      }
    };
    loadGamePlay();
  }, [userId]);

  //save when app is unfocused in mobile app
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (gamePlay) {
          saveGamePlay();
        }
      };
    }, [gamePlay]),
  );

  useEffect(() => {
    //save when browser is closed
    const handleBeforeUnLoad = () => {
      if (gamePlay) {
        saveGamePlay();
      }
    };

    // save when switching tabs
    const handleVisibilityChange = () => {
      if (document.hidden && gamePlay) {
        saveGamePlay();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnLoad);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      // important remove event listener to not repeat the save
      window.removeEventListener('beforeunload', handleBeforeUnLoad);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gamePlay, saveGamePlay]);

  //create random playing cards
  useEffect(() => {
    createCardSet();
    getHost();
  }, []);

  useEffect(() => {
    if (cardPlayed.length === 2) {
      checkIfWonSet();
      if (cardsWon.length === 12) {
        setTimeout(() => {
          setAnimalCardVisible(false);
        }, 2000);
        setEndGameVisible(true);
      }
    }
  }, [cardPlayed, cardsWon]);

  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/memoryGame.jpeg')}
    >
      <XStack style={styles.pageTitle} gap={15}>
        <Text color={'#953990'} fontSize={30}>
          Memory
        </Text>
        <Image
          source={require('../../assets/icons/poker-cards.png')}
          width={50}
          height={50}
        ></Image>
      </XStack>
      <CustomModal
        setModalVisible={setAnimalCardVisible}
        modalVisible={animalCardVisible}
        card={card}
      ></CustomModal>
      <CustomModal
        setModalVisible={setEndGameVisible}
        modalVisible={endGameVisible}
        card={card}
      ></CustomModal>
      <XStack style={styles.cardsSet} gap={15}>
        {playingCards.map((card) => (
          <View key={card.id} animation="bouncy" style={styles.cardStyle}>
            <TouchableOpacity
              onPress={() => flipCards(card.id)}
              activeOpacity={1} /*disabled={disabled[card.id]}*/
            >
              <View style={visibleCards[card.id] ? styles.invisible : styles.faceB}>
                <Image
                  style={styles.backImage}
                  source={require('../../assets/images/memoryBackCard.jpg')}
                />
              </View>
              <View style={visibleCards[card.id] ? styles.faceA : styles.invisible}>
                <View style={styles.animalImageContainer}>
                  <Image style={styles.animalImage} source={imageMap[card.image]}></Image>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textCard} alignSelf="center" fontSize={20}>
                    {card.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </XStack>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    width: '50%',
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
});
