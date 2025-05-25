import { Card } from '../models/Card';

export function createCard(id: number, card: Omit<Card, 'id'>): Card {
  return { id, ...card };
}
