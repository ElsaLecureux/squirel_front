import { ImageBackground, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { YStack, Text, XStack, Image, Card, Button, View } from 'tamagui';
import { useState } from 'react';

type MemoryScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'Memory'
>;

type Props = {
  navigation: MemoryScreenNavigationProp;
};

export default function MemoryScreen({ navigation }: Props) {

  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  const flipCards = (id: number) => {
    console.log("flipped!", id)
    setVisibleCards((prev) => {
      const cardsSet = [...prev];
      cardsSet[id] = !cardsSet[id]
      return cardsSet;
    });
  }

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
          <XStack
          alignItems='center'
          gap={15}>
              <Card elevate bordered
                key={1}
                animation="bouncy"
                style={styles.cardStyle}>
                <Button onPress={ () => flipCards(1)} style={styles.cardStyle}>
                  <View
                  style={visibleCards[1] ? styles.invisible : styles.faceB }>
                    <Image 
                    source={require('../../assets/images/dragonCard.jpg')}
                    width={90}
                  height={100}></Image>
                  </View>
                  <View
                  style={visibleCards[1] ? styles.faceA : styles.invisible}>
                    <Text alignSelf='center' fontSize={40}>
                      1
                    </Text>
                  </View>  
                </Button>              
                </Card>
                <Card elevate bordered
                key='2'
                animation="bouncy"
                style={styles.cardStyle}>
                <Button onPress={ () => flipCards(2)} style={styles.cardStyle}>
                  <View
                  style={visibleCards[2] ? styles.invisible : styles.faceB }>
                    <Image 
                    source={require('../../assets/images/dragonCard.jpg')}
                    width={90}
                  height={100}></Image>
                  </View>
                  <View
                  style={visibleCards[2] ? styles.faceA : styles.invisible}>
                    <Text alignSelf='center' fontSize={40}>
                      2
                    </Text>
                  </View>  
                </Button>              
                </Card>
                <Card elevate bordered
                key={3}
                animation="bouncy"
                style={styles.cardStyle}>
                <Button onPress={ () => flipCards(3)} style={styles.cardStyle}>
                  <View
                  style={visibleCards[3] ? styles.invisible : styles.faceB }>
                    <Image 
                    source={require('../../assets/images/dragonCard.jpg')}
                    width={90}
                  height={100}></Image>
                  </View>
                  <View
                  style={visibleCards[3] ? styles.faceA : styles.invisible}>
                    <Text alignSelf='center' fontSize={40}>
                      3
                    </Text>
                  </View>  
                </Button>              
                </Card>
                <Card elevate bordered
                key={4}
                animation="bouncy"
                style={styles.cardStyle}>
                <Button onPress={ () => flipCards(4)} style={styles.cardStyle}>
                  <View
                  style={visibleCards[4] ? styles.invisible : styles.faceB }>
                    <Image 
                    source={require('../../assets/images/dragonCard.jpg')}
                    width={90}
                  height={100}></Image>
                  </View>
                  <View
                  style={visibleCards[4] ? styles.faceA : styles.invisible}>
                    <Text alignSelf='center' fontSize={40}>
                      4
                    </Text>
                  </View>  
                </Button>              
                </Card>
                <Card elevate bordered
                key={5}
                animation="bouncy"
                style={styles.cardStyle}>
                <Button onPress={ () => flipCards(5)} style={styles.cardStyle}>
                  <View
                  style={visibleCards[5] ? styles.invisible : styles.faceB }>
                    <Image 
                    source={require('../../assets/images/dragonCard.jpg')}
                    width={90}
                  height={100}></Image>
                  </View>
                  <View
                  style={visibleCards[5] ? styles.faceA : styles.invisible}>
                    <Text alignSelf='center' fontSize={40}>
                      5
                    </Text>
                  </View>  
                </Button>              
                </Card>
                <Card elevate bordered
                key={6}
                animation="bouncy"
                style={styles.cardStyle}>
                <Button onPress={ () => flipCards(6)} style={styles.cardStyle}>
                  <View
                  style={visibleCards[6] ? styles.invisible : styles.faceB }>
                    <Image 
                    source={require('../../assets/images/dragonCard.jpg')}
                    width={90}
                  height={100}></Image>
                  </View>
                  <View
                  style={visibleCards[6] ? styles.faceA : styles.invisible}>
                    <Text alignSelf='center' fontSize={40}>
                      6
                    </Text>
                  </View>  
                </Button>              
                </Card>
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
  invisible: {
    display: 'none',
  },
  cardStyle: {
    flex: 1,
    backgroundColor: '#fff',
    width: 105,
    height: 150,
  },
  faceB: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceA: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});