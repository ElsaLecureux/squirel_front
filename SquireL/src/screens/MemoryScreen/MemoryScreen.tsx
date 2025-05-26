import { ImageBackground, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text, XStack, Image, View, YStack, Button } from 'tamagui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../../models/Card';
import { Animal } from '../../models/Animal';
import { GamePlay } from '../../types/gamePlay';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { animals, imageMap } from '../../utils/memoryAnimals';
import { useFocusEffect } from '@react-navigation/native';
import { createCard } from '@/src/utils/createCard';
import axios from 'axios';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { Animal } from '@/src/models/Animal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useUser } from '@/src/context/UserContext';

//todo create a button to start another party
//todofind why not saed in database !!Ensure your backend is receiving the right shape!!

export default function MemoryScreen() {
  const [playingCards, setPlayingCards] = useState<Card[]>([]);
  const isSavingRef = useRef(false);
  const { userId } = useUser();
  const [animal, setAnimal] = useState<Animal>();
  const [cardPlayed, setCardPlayed] = useState<Card[]>([]);
  const style_modal_bottom = false;
  const [animalCardVisible, setAnimalCardVisible] = useState(false);
  const [endGameVisible, setEndGameVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(12).fill(false));
  const [gamePlay, setGamePlay] = useState<GamePlay | null>(null);
  const [host, setHost] = useState('localhost');
  const API_URL = `http://${host}:3000/gamePlay`;

  const shuffleAnimals = (animals: Animal[]) => {
    for (let i = animals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [animals[i], animals[j]] = [animals[j], animals[i]];
    }
    return animals;
  };

  const shuffleCards = (cards: Card[]) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const createCardSet = () => {
    if (!gamePlay) {
      let shuffledAnimals = shuffleAnimals(animals.slice());
      shuffledAnimals = shuffledAnimals.slice(0, 6);
      const duplicateAnimals = [...shuffledAnimals, ...shuffledAnimals];
      const createdCardSet = duplicateAnimals.map((animal, index) => {
        return createCard(index, animal.name, animal.image);
      });
      setPlayingCards(shuffleCards(createdCardSet));
    } else {
      setPlayingCards(gamePlay.cards);
      setGamePlay(null);
    }
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
      setPlayingCards((prev) => {
        return prev.map((card) =>
          card.id === cardPlayed[0].id || card.id === cardPlayed[1].id
            ? { ...card, won: true }
            : card,
        );
      });
      const animalFound = animals.find((animal: Animal) => {
        return cardPlayed[1].name === animal.name;
      });
      setAnimal(animalFound);
      setAnimalCardVisible(true);
      if (userId) {
        setGamePlay({ userId: userId, date: '', cards: playingCards });
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
      }, 1500);
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
    getHost();
    loadGamePlay();
    createCardSet();
  }, []);

  useEffect(() => {
    if (cardPlayed.length === 2) {
      checkIfWonSet();
      setTimeout(() => {
        setAnimalCardVisible(false);
      }, 3000);
    }
    if (
      playingCards.find((card) => card.won === true) &&
      !playingCards.find((card) => card.won === false)
    ) {
      if (animalCardVisible === false) {
        setEndGameVisible(true);
      } else {
        setTimeout(() => {
          setEndGameVisible(true);
        }, 3000);
      }
    }
  }, [cardPlayed, playingCards]);

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
        style_modal={style_modal_bottom}
        setModalVisible={setAnimalCardVisible}
        modalVisible={animalCardVisible}
      >
        <XStack style={styles.modalView}>
          <YStack style={styles.cardFirstHalf}>
            <View>
              <Image style={styles.image} source={imageMap[animal?.image]} />
            </View>
            <YStack>
              <Text style={styles.modalText}>Name: {animal?.name}</Text>
              <Text style={styles.modalText}>Size: {animal?.size}</Text>
              <Text style={styles.modalText}>Weight: {animal?.weight}</Text>
              <Text style={styles.modalText}>Speed: {animal?.speed}</Text>
              <Text style={styles.modalText}>Endangered: {animal?.endangered ? 'yes' : 'no'}</Text>
            </YStack>
          </YStack>
          <YStack style={styles.cardSecondHalf}>
            <Text style={styles.modalText}>Food: {animal?.food}</Text>
            <Text style={styles.modalText}>Habitat: {animal?.habitat}</Text>
            <Text style={styles.modalText}>Region: {animal?.region}</Text>
            <Text style={styles.modalText}>Fun fact: {animal?.funFact}</Text>
          </YStack>
        </XStack>
        <Button
          size="$2"
          style={styles.modalCloseButton}
          onPress={() => setAnimalCardVisible(false)}
        >
          <FontAwesomeIcon icon={faXmark} style={{ color: '#fff' }} />
        </Button>
      </CustomModal>
      <CustomModal
        setModalVisible={setEndGameVisible}
        modalVisible={endGameVisible}
        style_modal={style_modal_bottom}
      >
        END GAME!
        <Button size="$2" style={styles.modalCloseButton} onPress={() => setEndGameVisible(false)}>
          <FontAwesomeIcon icon={faXmark} style={{ color: '#fff' }} />
        </Button>
      </CustomModal>
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
    // shadowColor: '#000',
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
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
