import { Card } from '../models/Card';

export type GamePlay = {
  userId: number;
  date: string;
  cards: Card[];
};
