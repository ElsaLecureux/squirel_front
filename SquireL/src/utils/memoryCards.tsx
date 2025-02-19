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

const iconMap: ImageMap = {
  redPanda: require('../../assets/icons/memory/redPanda.png'),
  tiger: require('../../assets/icons/memory/tiger.png'),
  whale: require('../../assets/icons/memory/whale.png'),
  jellyfish: require('../../assets/icons/memory/jellyfish.png'),
  gorilla: require('../../assets/icons/memory/gorilla.png'),
  bear: require('../../assets/icons/memory/bear.png'),
  cat: require('../../assets/icons/memory/cat.png'),
  shark: require('../../assets/icons/memory/shark.png'),
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
    name: 'Red Panda',
    image: 'redPanda',
    funFact: 'In Chinese, its name can be translated to "little cat-bear".',
    habitat: 'Forests in the mountains',
    region: 'Asia',
    size: '50-64 cm',
    weight: '3-6 kg',
    speed: '38 km/h',
    food: 'Bamboo, fruits, eggs',
    endangered: true,
    icon: 'redPanda'
  },
  {
    id: 2,
    name: 'Tiger',
    image: 'tiger',
    funFact: 'No two tigers have the same stripes—like a fingerprint!',
    habitat: 'Forests & grasslands',
    region: 'Asia',
    size: '2.5-3.9 m',
    weight: '65-306 kg',
    speed: '65 km/h',
    food: 'Meat: deer, boar',
    endangered: true,
    icon: 'tiger'
  },
  {
    id: 3,
    name: 'Blue Whale',
    image: 'whale',
    funFact: 'Its heart is as big as a car!',
    habitat: 'Oceans',
    region: 'All major oceans except the Arctic',
    size: '24-30 m',
    weight: '100-150 tons',
    speed: '50 km/h',
    food: 'Tiny krill',
    endangered: true,
    icon: 'whale'
  },
  {
    id: 4,
    name: 'Jellyfish',
    image: 'jellyfish',
    funFact: 'Some jellyfish are biologically immortal, they can revert to an earlier stage of life.',
    habitat: 'Oceans',
    region: 'Worldwide',
    size: '1 cm - 2 m',
    weight: 'Very light!',
    speed: '8 km/h',
    food: 'Tiny fish & plankton',
    endangered: false,
    icon: 'jellyfish'
  },
  {
    id: 5,
    name: 'Gorilla',
    image: 'gorilla',
    funFact: 'Gorillas share about 98% of their DNA with humans.',
    habitat: 'Tropical rainforests and mountainous regions',
    region: 'Africa',
    size: '1.4-1.8 m',
    weight: '70-220 kg',
    speed: '40 km/h',
    food: 'Plants, fruit, and some insects',
    endangered: true,
    icon: 'gorilla'
  },
  {
    id: 6,
    name: 'Grizzly Bear',
    image: 'bear',
    funFact: 'Bears can run faster than humans!',
    habitat: 'Forests & mountains',
    region: 'North America',
    size: '1.5-2.5 m',
    weight: '80-360 kg',
    speed: '56 km/h',
    food: 'Berries & fish',
    endangered: false,
    icon: 'bear'
  },
  {
    id: 7,
    name: 'Cat',
    image: 'cat',
    funFact: 'Cats sleep for most of the day—lazy bones!',
    habitat: 'Houses & streets',
    region: 'Worldwide',
    size: '23-25 cm',
    weight: '3-6 kg',
    speed: '48 km/h',
    food: 'Fish, meat, cat food',
    endangered: false,
    icon: 'cat'
  },
  {
    id: 8,
    name: 'Shark',
    image: 'shark',
    funFact: 'Sharks have been around since before dinosaurs!',
    habitat: 'Oceans',
    region: 'Worldwide',
    size: '4-6 m',
    weight: '700-2200 kg',
    speed: '56 km/h',
    food: 'Seals & fish',
    endangered: true,
    icon: 'shark'
  },
];


export { cards, imageMap, iconMap };
