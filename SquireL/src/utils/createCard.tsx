import { Card } from '../models/Card';

export function createCard(index: number, animalName: string, animalImage: string): Card {
  return { id: index, won: false, name: animalName, image: animalImage };
}
