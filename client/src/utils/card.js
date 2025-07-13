class Card {
  constructor(rank, suit) {
    this.rank = rank.name;
    this.suit = suit;
    this.value = this.getValue(rank.abbrn);
  }

  getValue(rank) {
    if (rank === 'A') {
      return 1;
    } else if (rank === 'K') {
      return 13;
    } else if (rank === 'Q') {
      return 12;
    } else if (rank === 'J') {
      return 11;
    } else {
      return parseInt(rank, 10);
    }
  }

  isEqual(card) {
    return this.rank === card.rank && this.suit === card.suit;
  }
}

export default Card;
