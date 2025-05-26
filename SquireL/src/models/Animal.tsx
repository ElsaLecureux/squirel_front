export interface ImageMap {
  redPanda: number;
  tiger: number;
  whale: number;
  jellyfish: number;
  gorilla: number;
  bear: number;
  cat: number;
  shark: number;
}

type AnimalKey = keyof ImageMap;
export interface Animal {
  id: number;
  name: string;
  image: AnimalKey;
  funFact: string;
  habitat: string;
  region: string;
  size: string;
  weight: string;
  speed: string;
  food: string;
  endangered: boolean;
  icon: string;
}
