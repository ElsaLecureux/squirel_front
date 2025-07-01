import { ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { styles } from './MemoryStyle';
import { Text, XStack, Image, View, YStack, Button, Stack } from 'tamagui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../../models/Card';
import { GamePlay } from '../../types/gamePlay';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { animals, imageMap } from '../../utils/memoryAnimals';
import { useFocusEffect } from '@react-navigation/native';
import { createCard } from '@/src/utils/createCard';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { Animal, AnimalKey } from '@/src/models/Animal';
import { useUser } from '@/src/context/UserContext';
import { URL_BACKEND_SQUIREL } from '@env';
import axiosInstance from '@/src/utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat';

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
  const API_URL = `${URL_BACKEND_SQUIREL}/gamePlay`;
  const gameId = 1;

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

  const loadGamePlay = useCallback(async () => {
    if (!userId) return false;
    try {
      const response = await axiosInstance.get<GamePlay>(`/${userId}`);
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
    const createCardSet = () => {
      const shuffledAnimals = shuffleAnimals([...animals]).slice(0, 6);
      const duplicateAnimals = [...shuffledAnimals, ...shuffledAnimals];
      return shuffleCards(
        duplicateAnimals.map((animal, index) => createCard(index, animal.name, animal.image)),
      );
    };
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

  const closeAnimalCard = () => {
    setAnimalCardVisible(false);
    // verify if game is won to show endGame modale
    if (playingCards.every((card) => card.won)) {
      setEndGameVisible(true);
      // save player new score
      saveGameWon();
    }
  };

  const saveGameWon = async () => {
    await axiosInstance.post(`/userPlayGame`, { userId: userId, gameId: gameId });
  };

  return (
    <ImageBackground
      style={styles.pageContainer}
      source={require('../../assets/images/memoryScreen.jpg')}
    >
      <Button style={styles.replayButton} size="$4" backgroundColor="#FF8A01">
        <Text
          color="#fff"
          fontFamily="BubblegumSans_400Regular"
          fontSize={25}
          onPress={() => restartGaming()}
        >
          Rejouer
        </Text>
        <FontAwesomeIcon icon={faRepeat} style={{ color: '#fff', width: 40, height: 40 }} />
      </Button>
      <CustomModal
        style_modal={style_modal_bottom}
        setModalVisible={setAnimalCardVisible}
        modalVisible={animalCardVisible}
      >
        <XStack
          $xs={{ width: 320, height: 240 }}
          $sm={{ width: 375, height: 280 }}
          $md={{ width: 600, height: 450 }}
          $lg={{ width: 800, height: 600 }}
          style={styles.modalView}
        >
          <Image
            flex={1}
            borderTopLeftRadius={15}
            borderBottomLeftRadius={15}
            $xs={{ width: 180, height: 240 }}
            $sm={{ width: 210, height: 280 }}
            $md={{ width: 300, height: 450 }}
            $lg={{ width: 400, height: 600 }}
            source={imageMap[animal?.image as AnimalKey]}
          />

          <YStack flex={1} justifyContent="center" alignItems="center">
            <Text
              $xs={{ fontSize: 15 }}
              $sm={{ fontSize: 20 }}
              $md={{ fontSize: 30 }}
              $lg={{ fontSize: 40 }}
              style={styles.modalTitle}
            >
              {animal?.name}
            </Text>
            <Text
              $xs={{ fontSize: 9 }}
              $sm={{ fontSize: 12 }}
              $md={{ fontSize: 16 }}
              $lg={{ fontSize: 20 }}
              style={styles.modalText}
            >
              {animal?.food}
            </Text>
            <Text
              $xs={{ fontSize: 9 }}
              $sm={{ fontSize: 12 }}
              $md={{ fontSize: 16 }}
              $lg={{ fontSize: 20 }}
              style={styles.modalText}
            >
              {animal?.habitat} {animal?.region}
            </Text>
            <Text
              $xs={{ fontSize: 9 }}
              $sm={{ fontSize: 12 }}
              $md={{ fontSize: 16 }}
              $lg={{ fontSize: 20 }}
              style={styles.modalText}
            >
              Taille: {animal?.size}
            </Text>
            <Text
              $xs={{ fontSize: 9 }}
              $sm={{ fontSize: 12 }}
              $md={{ fontSize: 16 }}
              $lg={{ fontSize: 20 }}
              style={styles.modalText}
            >
              Poids: {animal?.weight}
            </Text>
            <Text
              $xs={{ fontSize: 9 }}
              $sm={{ fontSize: 12 }}
              $md={{ fontSize: 16 }}
              $lg={{ fontSize: 20 }}
              style={styles.modalText}
            >
              Vitesse: {animal?.speed}
            </Text>
            <Text
              $xs={{ fontSize: 9 }}
              $sm={{ fontSize: 12 }}
              $md={{ fontSize: 16 }}
              $lg={{ fontSize: 20 }}
              style={styles.modalText}
            >
              En danger: {animal?.endangered ? 'oui' : 'non'}
            </Text>
          </YStack>
          <Stack style={styles.funfact}>
            <Text
              $xs={{ fontSize: 10 }}
              $sm={{ fontSize: 15 }}
              $md={{ fontSize: 20 }}
              $lg={{ fontSize: 25 }}
              style={styles.funfactText}
            >
              "{animal?.funFact}"
            </Text>
          </Stack>
        </XStack>
        <Button
          margin={'1%'}
          $xs={{ size: '$2' }}
          $sm={{ size: '$3' }}
          $md={{ size: '$4' }}
          $lg={{ size: '$5' }}
          style={styles.modalCloseButton}
          onPress={() => closeAnimalCard()}
        >
          <FontAwesomeIcon icon={faXmark} style={{ color: '#fff' }} />
        </Button>
      </CustomModal>
      <CustomModal
        setModalVisible={setEndGameVisible}
        modalVisible={endGameVisible}
        style_modal={style_modal_bottom}
      >
        <YStack
          $xs={{ width: 225, height: 180 }}
          $sm={{ width: 250, height: 200 }}
          $md={{ width: 375, height: 300 }}
          $lg={{ width: 500, height: 400 }}
          style={styles.modalView}
        >
          <Image
            marginBottom={'2%'}
            $xs={{ width: 60, height: 60 }}
            $sm={{ width: 80, height: 80 }}
            $md={{ width: 100, height: 100 }}
            $lg={{ width: 120, height: 120 }}
            source={require('../../assets/images/seriousSquirrel.png')}
          />
          <Text
            fontFamily="BubblegumSans_400Regular"
            fontWeight={'bold'}
            $xs={{ fontSize: 20 }}
            $sm={{ fontSize: 30 }}
            $md={{ fontSize: 50 }}
            $lg={{ fontSize: 60 }}
            color={'#ff8a01'}
          >
            Bravo! Tu as gagné!
          </Text>
        </YStack>
        <Button
          $xs={{ size: '$2' }}
          $sm={{ size: '$3' }}
          $md={{ size: '$4' }}
          $lg={{ size: '$5' }}
          style={styles.modalCloseButton}
          onPress={() => setEndGameVisible(false)}
        >
          <FontAwesomeIcon icon={faXmark} style={{ color: '#fff' }} />
        </Button>
      </CustomModal>
      {dataLoading || !userId ? (
        <View>
          <Text style={{ color: '#fff' }}>... isLoading</Text>
        </View>
      ) : (
        <XStack style={styles.cardsSet} gap="3%">
          {playingCards.map((card, index) => (
            <View
              key={card.id}
              animation="bouncy"
              $xs={{ width: 65, height: 100 }}
              $sm={{ width: 80, height: 120 }}
              $md={{ width: 120, height: 160 }}
              $lg={{ width: 160, height: 220 }}
            >
              <TouchableOpacity onPress={() => flipCards(index)} activeOpacity={1}>
                <View
                  flex={1}
                  $xs={{ width: 65, height: 100 }}
                  $sm={{ width: 80, height: 120 }}
                  $md={{ width: 120, height: 160 }}
                  $lg={{ width: 160, height: 220 }}
                  style={visibleCards[index] ? styles.invisible : styles.faceB}
                >
                  <Image
                    style={styles.backImage}
                    source={require('../../assets/images/memoryBackCard.jpg')}
                  />
                </View>
                <View
                  flex={1}
                  $xs={{ width: 65, height: 100 }}
                  $sm={{ width: 80, height: 120 }}
                  $md={{ width: 120, height: 160 }}
                  $lg={{ width: 160, height: 220 }}
                  style={visibleCards[index] ? styles.faceA : styles.invisible}
                >
                  <Image
                    style={styles.animalImage}
                    source={imageMap[card.image as AnimalKey]}
                  ></Image>
                  <Text
                    style={styles.textCard}
                    alignSelf="center"
                    $xs={{ fontSize: 9 }}
                    $sm={{ fontSize: 12 }}
                    $md={{ fontSize: 16 }}
                    $lg={{ fontSize: 20 }}
                  >
                    {card.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </XStack>
      )}
    </ImageBackground>
  );
}
