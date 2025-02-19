import Card from '../models/Card';

// Define the type for the image map
interface ImageMap {
  redPanda: number;
  tiger: number;
  whale: number;
  jellyfish: number;
  gorilla: number;
  bear: number;
  cat: number;
  shark: number;
}

// Image mapping object
const imageMap: ImageMap = {
  redPanda: require('../../assets/images/memory/redPanda.jpg'),
  tiger: require('../../assets/images/memory/tiger.jpg'),
  whale: require('../../assets/images/memory/whale.jpg'),
  jellyfish: require('../../assets/images/memory/jellyfish.jpg'),
  gorilla: require('../../assets/images/memory/gorilla.jpg'),
  bear: require('../../assets/images/memory/bear.jpg'),
  cat: require('../../assets/images/memory/cat.jpg'),
  shark: require('../../assets/images/memory/shark.jpg'),
};

const cards: Card[] = [
  {
    id: 1,
    name: 'red panda',
    image: 'redPanda',
    funFact: 'funFact',
    habitat: 'habitat',
    region: 'region',
    size: 'size',
    weight: 'weight',
    speed: 'speed',
    endangered: true,
  },
  {
    id: 2,
    name: 'tiger',
    image: 'tiger',
    funFact: 'funFact',
    habitat: 'habitat',
    region: 'region',
    size: 'size',
    weight: 'weight',
    speed: 'speed',
    endangered: true,
  },
  {
    id: 3,
    name: 'whale',
    image: 'whale',
    funFact: 'funFact',
    habitat: 'habitat',
    region: 'region',
    size: 'size',
    weight: 'weight',
    speed: 'speed',
    endangered: true,
  },
  {
    id: 4,
    name: 'jellyfish',
    image: 'jellyfish',
    funFact: 'funFact',
    habitat: 'habitat',
    region: 'region',
    size: 'size',
    weight: 'weight',
    speed: 'speed',
    endangered: true,
  },
  {
    id: 5,
    name: 'gorilla',
    image: 'gorilla',
    funFact: 'funFact',
    habitat: 'habitat',
    region: 'region',
    size: 'size',
    weight: 'weight',
    speed: 'speed',
    endangered: true,
  },
  {
    id: 6,
    name: 'bear',
    image: 'bear',
    funFact: 'funFact',
    habitat: 'habitat',
    region: 'region',
    size: 'size',
    weight: 'weight',
    speed: 'speed',
    endangered: true,
  },
  {
    id: 7,
    name: 'cat',
    image: 'cat',
    funFact: 'funFact',
    habitat: 'habitat',
    region: 'region',
    size: 'size',
    weight: 'weight',
    speed: 'speed',
    endangered: true,
  },
  {
    id: 8,
    name: 'shark',
    image: 'shark',
    funFact: 'funFact',
    habitat: 'habitat',
    region: 'region',
    size: 'size',
    weight: 'weight',
    speed: 'speed',
    endangered: true,
  },
];

export { cards, imageMap };
