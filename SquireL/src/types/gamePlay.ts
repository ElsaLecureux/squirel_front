export type GamePlay = {
  userId: number;
  date: string;
  cards: Card[];
};

export type Card = {
  id: number;
  won: boolean;
  animal: string;
};
