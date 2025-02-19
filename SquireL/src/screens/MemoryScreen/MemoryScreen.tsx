import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, XStack, Image, View } from 'tamagui';
import { useEffect, useState } from 'react';
import CardModel from '../../models/Card';
import CustomModal from '@/src/components/CustomModal/CustomModal';
import { cards, imageMap } from '../../utils/memoryCards';

type MemoryScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Memory'
>;

type Props = {
  navigation: MemoryScreenNavigationProp;
};

export default function MemoryScreen({ navigation }: Props) {


  const [playingCards,setPlayingCards] = useState<CardModel[]>([]);
  //when cardsWon.length == 12 game is won!
  const [cardsWon, setCardsWon] = useState<number[]>([]);
  const [card, setCard] = useState<CardModel>();
  const [cardPlayed, setCardPlayed] = useState<CardModel[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);
  const [disabled, setDisabled] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);

  const shuffleCards= (cards : CardModel[]) => {
    for (let i = cards.length - 1; i > 0; i--)
    {
      const j= Math.floor(Math.random() * (i+1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const flipCards = (id: number) => {
    setDisabled((prev) => {
      const cardsSet = [...prev];
      cardsSet[id] = !cardsSet[id]
      return cardsSet;
    });
    if(cardPlayed.length < 2 && visibleCards[id] == false){
      setVisibleCards((prev) => {
        const cardsSet = [...prev];
        cardsSet[id] = !cardsSet[id]
        return cardsSet;
      });
      const cardToSave = playingCards.find(card => card.id === id);
      if(cardToSave){
        setCardPlayed((prev) => [...prev, cardToSave]);
      }
    }
  }

  const checkIfWonSet = () =>{ 
    setDisabled((prev) => {
      return new Array(prev.length).fill(true);
    });
    if (cardPlayed[0].name === cardPlayed[1].name){
      setCardsWon((prev) => {
        const cardsSet = [...prev, cardPlayed[0].id, cardPlayed[1].id];
        return cardsSet;
      });
      setCard(cardPlayed[1]);
      setModalVisible(true);
      setCardPlayed([]);
      setDisabled((prev) => {
        return new Array(prev.length).fill(false);
      });
    } else {
      setTimeout(() =>{      
        setVisibleCards((prev) => {
          const cardsSet = [...prev];
          cardsSet[cardPlayed[0].id] = !cardsSet[cardPlayed[0].id];
          cardsSet[cardPlayed[1].id] = !cardsSet[cardPlayed[1].id];
          return cardsSet;
        });
        setCardPlayed([]);
        setDisabled((prev) => {
          return new Array(prev.length).fill(false);
        });
      },2000)
    }
  }

  //create random playing cards
  useEffect(()=> {
    let shuffledCards = shuffleCards(cards.slice());
    shuffledCards = shuffledCards.slice(0, 6);
    let duplicateCards = [...shuffledCards, ...shuffledCards];
    duplicateCards = duplicateCards.map((card, index )=> new CardModel(index, card.name, card.image, card.funFact, card.habitat, card.region, card.size, card.weight, card.speed, card.endangered));
    setPlayingCards(shuffleCards(duplicateCards));
  }, [])

  useEffect(()=> {
    if(cardPlayed.length === 2){
    //todo correct disable cards 
    checkIfWonSet();
    }
  }, [cardPlayed, disabled])

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/memoryGame.jpeg')}>
          <XStack
            style={styles.pageTitle}
            gap={15}>
            <Text
            color={'#953990'}
            fontSize={30}>
                Memory
            </Text>
            <Image
              source={require('../../assets/icons/poker-cards.png')}
                width= {50}
                height= {50}
              ></Image>    
          </XStack> 
          <CustomModal
          setModalVisible= {setModalVisible}
          modalVisible= {modalVisible}
          card = {card}>
          </CustomModal>       
          <XStack
          style={styles.cardsSet}
          gap={15}>
            {
              playingCards.map(card=>(
                <View
                key={card.id}
                animation="bouncy"
                style={styles.cardStyle}>
                  <TouchableOpacity onPress={ () => flipCards(card.id)} disabled={disabled[card.id]}>
                  <View
                    style={visibleCards[card.id] ? styles.invisible : styles.faceB }>
                        <Image
                        style={styles.backImage}
                        source={require('../../assets/images/memoryBackCard.jpg')}/>
                    </View>
                    <View
                      style={visibleCards[card.id] ? styles.faceA : styles.invisible}>
                        <Image
                        style={styles.backImage}
                        source={imageMap[card.image]}>
                        </Image>
                        <Text style={styles.textCard} alignSelf='center' fontSize={20}>{card.name}</Text>
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
  pageTitle:{
     flex: 1,
  },
  button:{
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  cardsSet:{
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap:'wrap',
    width: '50%',
  },
  invisible: {
    display: 'none',
  },
  cardStyle: {
    width: 125,
    height: 175,
  },
  faceB: {
    width: 125,
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  faceA: {
    width: 125,
    height: 175,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  backImage: {
    flex: 1,
    width: 125,
    height: 175,
    borderRadius:10,
    borderWidth: 4,
    borderColor: '#ff8a01',
  },
  animalImage: {
    flex: 4,
    borderWidth: 4,
    borderColor: '#ff8a01',
  },
  textCard: {
    flex: 1,
    borderWidth: 4,
    backgroundColor: '#ff8a01',
  }
});