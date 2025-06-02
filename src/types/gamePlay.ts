import { Card } from '../models/Card';

export type GamePlay = {
  userId: string;
  date: string;
  cards: Card[];
};
