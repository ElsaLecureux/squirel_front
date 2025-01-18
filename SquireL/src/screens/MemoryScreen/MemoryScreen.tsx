import { ImageBackground, StyleSheet, Modal, Alert, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { YStack, Text, XStack, Image, Card, Button, View } from 'tamagui';
import { useEffect, useState } from 'react';
import CardModel from '../../models/Card';

type MemoryScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Memory'
>;

type Props = {
  navigation: MemoryScreenNavigationProp;
};

export default function MemoryScreen({ navigation }: Props) {

  const cards: CardModel[] = [
    new CardModel(1, 'panda', 'path', true),
    new CardModel(2,'tiger', 'path',true),
    new CardModel(3, 'sea turtle', 'path', true),
    new CardModel(4, 'eagle', 'path', false),
    new CardModel(5, 'bonobo', 'path', true),
    new CardModel(6, 'sei whale', 'path', true),
    new CardModel(7, 'cat', 'path', false),
    new CardModel(8, 'dog', 'path', false),
  ];

  const [playingCards,setPlayingCards] = useState<CardModel[]>([]);
  //when cardsWon.length == 12 game is won!
  const [cardsWon, setCardsWon] = useState<number[]>([]);
  const [cardPlayed, setCardPlayed] = useState<CardModel[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);

  const shuffleCards= (cards : CardModel[]) => {
    for (let i = cards.length - 1; i > 0; i--)
    {
      const j= Math.floor(Math.random() * (i+1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const flipCards = (id: number) => {
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
    if (cardPlayed[0].name === cardPlayed[1].name){
      setCardsWon((prev) => {
        const cardsSet = [...prev, cardPlayed[0].id, cardPlayed[1].id];
        return cardsSet;
      });
      setModalVisible(true);
      setCardPlayed([]);
    } else {
      setTimeout(() =>{      
        setVisibleCards((prev) => {
          const cardsSet = [...prev];
          cardsSet[cardPlayed[0].id] = !cardsSet[cardPlayed[0].id];
          cardsSet[cardPlayed[1].id] = !cardsSet[cardPlayed[1].id];
          return cardsSet;
        });
        setCardPlayed([]);
      },2000)
    }
  }

  //create random playing cards
  useEffect(()=> {
    let shuffledCards = shuffleCards(cards.slice());
    shuffledCards = shuffledCards.slice(0, 6);
    let duplicateCards = [...shuffledCards, ...shuffledCards];
    duplicateCards = duplicateCards.map((card, index )=> new CardModel(index, card.name, card.image, card.endangered));
    setPlayingCards(shuffleCards(duplicateCards));
  }, [])

  useEffect(()=> {
    if(cardPlayed.length === 2){
    checkIfWonSet();
    }
  }, [cardPlayed])

  return (    
      <ImageBackground style={styles.pageContainer} source={require('../../assets/images/memoryGame.jpeg')}>
         <YStack 
          gap={15}>
          <XStack
            alignContent='center'
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
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>You won this set, good job!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>       
          <XStack
          style={styles.cardsSet}
          gap={15}>
            {
              playingCards.map(card=>(
                <Card elevate bordered
                key={card.id}
                animation="bouncy"
                style={styles.cardStyle}>
                  <View
                  style={visibleCards[card.id] ? styles.invisible : styles.faceB }>
                    <Button onPress={ () => flipCards(card.id)} style={styles.buttonCardStyle}>
                      <Image
                      style={styles.backImage}
                      source={require('../../assets/images/memoryBackCard.jpg')}/>
                    </Button>              
                  </View>
                  <View
                    style={visibleCards[card.id] ? styles.faceA : styles.invisible}>
                    <Button onPress={ () => flipCards(card.id)} style={styles.cardStyle}>
                      <Text alignSelf='center' fontSize={20}>{card.name}</Text>
                    </Button>
                    </View>  
                </Card>
              ))}
          </XStack> 
        </YStack>
      </ImageBackground>    
  );
}

const styles = StyleSheet.create({
    pageContainer: { 
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    paddingTop: '5%',
  },
  cardsSet:{
    flexWrap:'wrap',
    alignItems:'center',
    width: '50%',
  },
  invisible: {
    display: 'none',
  },
  cardStyle: {
    backgroundColor: '#fff',
    width: 125,
    height: 175,
  },
  buttonCardStyle: {
    width: '100%',
    height: '100%',
  },
  faceB: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  faceA: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  backImage: {
    borderRadius:10,
    borderWidth: 4, 
    width:125,
    height:175,
    borderColor: '#ff8a01',
  }
});