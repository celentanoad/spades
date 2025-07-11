class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  isEqual(card) {
    return this.rank === card.rank && this.suit === card.suit;
  }
}