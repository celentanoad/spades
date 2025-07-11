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
    return { players, centerCards, drawPile, currentPlayerIndex: 0 };
  }

  captureCards(playerId, cards) {
    const playerIndex = this.state.players.findIndex((player) => player.id === playerId);
    const currentPlayer = this.state.players[playerIndex];
    console.log('current player', currentPlayer);
    console.log('centerCards', this.state.centerCards);
    currentPlayer.scorePile.push(...cards);
    const updatedCenterCards = this.state.centerCards.filter((card) => !cards.includes(card));
    console.log('updatedCenterCards', updatedCenterCards);
    // const updatedPlayerHand = currentPlayer.hand.filter(
    //   (handCard) => !cards.some((capturedCard) => capturedCard.rank.name === handCard.rank.name && capturedCard.suit === handCard.suit)
    // );

    // cards in hand don't seem to match up w/ the cards on the board
    // possible solution would be to create my own Card class w/ custom methods for drawing cards, removing cards, etc
    const updatedPlayerHand = currentPlayer.hand.filter((handCard) => {
      const isMatch = cards.some((capturedCard) => {
        const match = capturedCard.rank.name === handCard.rank.name && capturedCard.suit === handCard.suit;
        console.log(`Comparing handCard: ${handCard.rank.name} ${handCard.suit} with capturedCard: ${capturedCard.rank.name} ${capturedCard.suit} - Match: ${match}`);
        return match;
      });
      return !isMatch;
    });
    console.log('updatedPlayerHand', updatedPlayerHand);
    console.log('captured cards', cards);
    console.log('player score pile', currentPlayer.scorePile);
    const updatedGameState = {
      ...this.state,
      players: this.state.players.map((player, index) =>
        index === playerIndex ? { ...player, hand: updatedPlayerHand } : player
      ),
      centerCards: updatedCenterCards
    };
    this.state = updatedGameState;
    return updatedGameState;
  }
}

export default SpadesGame;