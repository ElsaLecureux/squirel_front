import { ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { styles } from './MemoryStyle';
import { Text, XStack, Image, View, YStack, Button } from 'tamagui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../../models/Card';
import { GamePlay } from '../../types/gamePlay';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { animals, imageMap } from '../../utils/memoryAnimals';
import { useFocusEffect } from '@react-navigation/native';
import { createCard } from '@/src/utils/createCard';
import axios from 'axios';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { Animal, AnimalKey } from '@/src/models/Animal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useUser } from '@/src/context/UserContext';
import { URL_BACKEND_SQUIREL } from '@env';

export default function MemoryScreen() {
  const [playingCards, setPlayingCards] = useState<Card[]>([]);
  const isSavingRef = useRef(false);
  const { userId, isLoading } = useUser();
  const [animal, setAnimal] = useState<Animal>();
  const [cardPlayed, setCardPlayed] = useState<{ card: Card; index: number }[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const style_modal_bottom = false;
  const [animalCardVisible, setAnimalCardVisible] = useState(false);
  const [endGameVisible, setEndGameVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(12).fill(false));
  const [gameInitialized, setGameInitialized] = useState(false);
  const API_URL = `${URL_BACKEND_SQUIREL}gamePlay`;

  //todo reset after party won and saveGamePlay with no cards
  //todo correct endgame not showing
  //todo refacto to have only one function accepting Animal OR Card
  //todo verify what happen when no gameplay or first game
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

  const flipCards = (index: number) => {
    if (cardPlayed.length < 2 && !visibleCards[index]) {
      setVisibleCards((prev) => {
        const cardsSet = [...prev];
        cardsSet[index] = true;
        return cardsSet;
      });
      const cardToSave = playingCards[index];
      if (cardToSave) {
        setCardPlayed((prev) => [...prev, { card: cardToSave, index }]);
      }
    }
  };

  const saveGamePlay = useCallback(async () => {
    if (!userId || isSavingRef.current) {
      return;
    }
    isSavingRef.current = true;

    const currentGamePlay: GamePlay = {
      userId,
      date: new Date().toISOString(),
      cards: playingCards,
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentGamePlay),
        keepalive: true,
      });
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      isSavingRef.current = false;
    }
  }, [API_URL, playingCards, userId]);

  const restartGaming = () => {
    const createCardSet = () => {
      let shuffledAnimals = shuffleAnimals([...animals]);
      shuffledAnimals = shuffledAnimals.slice(0, 6);
      const duplicateAnimals = [...shuffledAnimals, ...shuffledAnimals];
      const createdCardSet = duplicateAnimals.map((animal, index) => {
        return createCard(index, animal.name, animal.image);
      });
      return shuffleCards(createdCardSet);
    };

    const newCards = createCardSet();
    setVisibleCards(new Array(newCards.length).fill(false));
    setPlayingCards(newCards);
    setCardPlayed([]);
    setAnimalCardVisible(false);
    setEndGameVisible(false);
  };

  const createCardSet = () => {
    const shuffledAnimals = shuffleAnimals([...animals]).slice(0, 6);
    const duplicateAnimals = [...shuffledAnimals, ...shuffledAnimals];
    return shuffleCards(
      duplicateAnimals.map((animal, index) => createCard(index, animal.name, animal.image)),
    );
  };

  const loadGamePlay = useCallback(async () => {
    if (!userId) return false;
    try {
      const response = await axios.get<GamePlay>(`${API_URL}/${userId}`);
      if (response.data && response.data.cards.length > 0) {
        setPlayingCards(response.data.cards);
        setVisibleCards(response.data.cards.map((card: Card) => card.won));
        return true;
      }
    } catch (error) {
      console.error('Failed to load game:', error);
    }
    return false;
  }, [API_URL, userId]);

  const initializeGame = useCallback(async () => {
    setDataLoading(true);
    const gameLoaded = await loadGamePlay();

    if (!gameLoaded) {
      const newCards = createCardSet();
      setPlayingCards(newCards);
      setVisibleCards(new Array(newCards.length).fill(false));
    }

    setDataLoading(false);
    setGameInitialized(true);
  }, [loadGamePlay]);

  // 👇 Main trigger
  useEffect(() => {
    if (userId && !isLoading && !gameInitialized) {
      initializeGame();
    }
  }, [userId, isLoading, gameInitialized, initializeGame]);

  //save when app is unfocused in mobile app
  useFocusEffect(
    useCallback(() => {
      return () => {
        saveGamePlay();
      };
    }, [saveGamePlay]),
  );

  useEffect(() => {
    //save when browser is closed
    const handleBeforeUnLoad = () => {
      saveGamePlay();
    };

    // save when switching tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        saveGamePlay();
      }
    };

    if (Platform.OS === 'web') {
      window.addEventListener('beforeunload', handleBeforeUnLoad);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        // important remove event listener to not repeat the save
        window.removeEventListener('beforeunload', handleBeforeUnLoad);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [saveGamePlay]);

  useEffect(() => {
    const checkIfWonSet = () => {
      const [firstCard, secondCard] = cardPlayed;
      if (firstCard.card.name === secondCard.card.name) {
        const updatedCards = playingCards.map((card) =>
          card.id === firstCard.card.id || card.id === secondCard.card.id
            ? { ...card, won: true }
            : card,
        );
        const animalFound = animals.find((animal: Animal) => {
          return firstCard.card.name === animal.name;
        });
        setPlayingCards(updatedCards);
        setAnimal(animalFound);
        setAnimalCardVisible(true);
        setCardPlayed([]);
      } else {
        setTimeout(() => {
          setVisibleCards((prev) => {
            const cardsSet = [...prev];
            cardsSet[firstCard.index] = false;
            cardsSet[secondCard.index] = false;
            return cardsSet;
          });
          setCardPlayed([]);
        }, 1500);
      }
    };

    if (cardPlayed.length === 2) {
      checkIfWonSet();
    }
  }, [cardPlayed, playingCards]);

  useEffect(() => {
    if (animalCardVisible) {
      const timer = setTimeout(() => {
        setAnimalCardVisible(false);
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [animalCardVisible]);

  useEffect(() => {
    if (cardPlayed.length === 2 && playingCards.every((card) => card.won)) {
      if (animalCardVisible) {
        setTimeout(() => {
          setEndGameVisible(true);
        }, 3000);
      } else {
        setEndGameVisible(true);
      }
    }
  }, [playingCards, animalCardVisible, cardPlayed.length]);

  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/memoryGame.jpeg')}
    >
      <Button size={Platform.OS === 'web' ? '$5' : '$3'} backgroundColor="#FF8A01">
        <Text
          color="#fff"
          fontFamily="MedievalSharp-Regular"
          fontSize={Platform.OS === 'web' ? 25 : 16}
          onPress={() => restartGaming()}
        >
          Restart
        </Text>
      </Button>
      <CustomModal
        style_modal={style_modal_bottom}
        setModalVisible={setAnimalCardVisible}
        modalVisible={animalCardVisible}
      >
        <XStack style={styles.modalView}>
          <YStack style={styles.cardFirstHalf}>
            <View>
              <Image style={styles.image} source={imageMap[animal?.image as AnimalKey]} />
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
        <Text>YOU WON!</Text>
        <Button size="$2" style={styles.modalCloseButton} onPress={() => setEndGameVisible(false)}>
          <FontAwesomeIcon icon={faXmark} style={{ color: '#fff' }} />
        </Button>
      </CustomModal>
      {dataLoading || !userId ? (
        <View>
          <Text style={{ color: '#fff' }}>... isLoading</Text>
        </View>
      ) : (
        <XStack style={styles.cardsSet} gap={15}>
          {playingCards.map((card, index) => (
            <View key={card.id} animation="bouncy" style={styles.cardStyle}>
              <TouchableOpacity
                onPress={() => flipCards(index)}
                activeOpacity={1} /*disabled={disabled[card.id]}*/
              >
                <View style={visibleCards[index] ? styles.invisible : styles.faceB}>
                  <Image
                    style={styles.backImage}
                    source={require('../../assets/images/memoryBackCard.jpg')}
                  />
                </View>
                <View style={visibleCards[index] ? styles.faceA : styles.invisible}>
                  <View style={styles.animalImageContainer}>
                    <Image
                      style={styles.animalImage}
                      source={imageMap[card.image as AnimalKey]}
                    ></Image>
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
      )}
    </ImageBackground>
  );
}
