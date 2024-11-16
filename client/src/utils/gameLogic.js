import { decks } from 'cards';
// https://github.com/kbjr/node-cards

class SpadesGame {
  constructor(playerIds) {
    this.state = this.initializeGame(playerIds);
  }

  initializeGame(playerIds) {
    const [player1Id, player2Id] = Math.random() > 0.5 ? playerIds : [playerIds[1], playerIds[0]];

    const drawPile = new decks.StandardDeck();
    drawPile.shuffleAll();
    const players = [
      { id: player1Id, hand: drawPile.draw(7), scorePile: [] },
      { id: player2Id, hand: drawPile.draw(7), scorePile: [] }
    ];
    const centerCards = drawPile.draw(6);
    console.log(centerCards);
    console.log(players[0].hand);
    return { players, centerCards, drawPile, currentPlayerIndex: 0 };
  }
}

export default SpadesGame;