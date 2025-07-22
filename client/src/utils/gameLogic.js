import { decks } from 'cards';
import Card from './card';
// https://github.com/kbjr/node-cards

class SpadesGame {
  constructor(playerIds) {
    this.state = this.initializeGame(playerIds);
  }
  convertToCustomCards = (cardArray) => cardArray.map(card => new Card(card.rank, card.suit.name));

  initializeGame(playerIds) {
    const [player1Id, player2Id] = Math.random() > 0.5 ? playerIds : [playerIds[1], playerIds[0]];

    const drawPile = new decks.StandardDeck();
    drawPile.shuffleAll();
    const players = [
      { id: player1Id, hand: this.convertToCustomCards(drawPile.draw(7)), scorePile: [] },
      { id: player2Id, hand: this.convertToCustomCards(drawPile.draw(7)), scorePile: [] }
    ];
    const centerCards = this.convertToCustomCards(drawPile.draw(6));
    const roundStatus = 'active'; // "active" or "ended"
    const passHistory = [];
    // Validate initial game state card counts
    if (players[0].hand.length !== 7 || players[1].hand.length !== 7) {
      console.error('Initialization Error: Each player must have 7 cards. Player 1 has', players[0].hand.length, 'and Player 2 has', players[1].hand.length);
    }
    if (centerCards.length !== 6) {
      console.error('Initialization Error: Center must have 6 cards, but has', centerCards.length);
    }
    if (drawPile.deckPile.length !== 32) {
      console.error('Initialization Error: Draw pile must have 32 cards remaining, but has', drawPile.deckPile.length);
    }
    return { players, centerCards, drawPile, currentPlayerIndex: 0, roundStatus, passHistory };
  }

  updateCenterCards(cards) {
    let centerCards = this.state.centerCards.filter((card) => !cards.some(capturedCard => card.isEqual(capturedCard)));
    console.log('state', this.state)
    let remainingInDeck = this.state.drawPile.deckPile.length;
    if (remainingInDeck >= 6 - centerCards.length) {
      centerCards = [...centerCards, ...this.convertToCustomCards(this.state.drawPile.draw(6-centerCards.length))]
    } else {
      centerCards = [...centerCards, ...this.convertToCustomCards(this.state.drawPile.draw(remainingInDeck))]
    }
    return centerCards;
  }

  captureCards(playerId, cards) {
    const playerIndex = this.state.players.findIndex((player) => player.id === playerId);
    const currentPlayer = this.state.players[playerIndex];
    const opponent = this.state.players[playerIndex === 0 ? 1 : 0]
    currentPlayer.scorePile.push(...cards);
    const updatedCenterCards = this.updateCenterCards(cards);
    // Assume the first card in cards array is the player's selected card for capture
    const playerCard = cards[0];
    const updatedPlayerHand = currentPlayer.hand.filter(
      (handCard) => !handCard.isEqual(playerCard)
    );
    const updatedGameState = {
      ...this.state,
      players: this.state.players.map((player, index) =>
        index === playerIndex ? { ...player, hand: updatedPlayerHand } : player
      ),
      centerCards: updatedCenterCards,
      currentPlayerIndex: playerIndex === 0 ? 1 : 0,
      passHistory: []
    };
    this.state = updatedGameState;
    return updatedGameState;
  }

  passTurn(playerIndex) {
    const updatedPassHistory = this.state.passHistory.length + 1;

    if (this.state.passHistory.length >= 1) {
      this.endRound()
    } else {
      const updatedPassHistory = [...this.state.passHistory, playerIndex]
      const updatedGameState = {
        ...this.state,
      passHistory: updatedPassHistory
    }
      this.state = updatedGameState;
      return updatedGameState;
    }
  }

  endRound() {
    console.log('end round');
    // set passHistory to empty array
    return {
      ...this.state,
      passHistory: []
    }
    // add up scores
    // check for end of game
  }
}

export default SpadesGame;
