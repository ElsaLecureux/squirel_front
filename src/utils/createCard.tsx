import { Card } from '../models/Card';

export function createCard(index: number, animalName: string, animalImage: string): Card {
  return { id: index, name: animalName, won: false, image: animalImage };
}
