// import { SpadesGame } from '../utils/gameLogic';
import '../components/GameBoard.css';
import { useState, useEffect } from 'react';
import Card from './Card/Card';

const GameBoard = ({ game }) => {
  const [gameState, setGameState] = useState(game.state);
  const [isCaptureValid, setIsCaptureValid] = useState(false);
  const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);
  const [selectedCenterCards, setSelectedCenterCards] = useState([]);
  // const [currentPlayerId, setCurrentPlayerId] = useState(game.state.players[game.state.currentPlayerIndex].id);
  // const [isPlayerTurn, setIsPlayerTurn] = useState(game.state.players[0].id === Socket.id);

  // need to adjust card values for face cards and aces
  const determineCardValues = () => {
    if (selectedPlayerCard && selectedCenterCards.length) {
      console.log('check Card value')
      const playerCardValue = Number(selectedPlayerCard.rank.abbrn);
      console.log('playerCardValue', playerCardValue);
      const centerCardValues = selectedCenterCards.map(card => Number(card.rank.abbrn));
      console.log('centerCardValues', centerCardValues);
      setIsCaptureValid(centerCardValues.reduce((acc, curr) => acc + curr, 0) === playerCardValue);
    } else {
      setIsCaptureValid(false);
    }
  }

  useEffect(() => {
    determineCardValues();
  }, [selectedPlayerCard, selectedCenterCards]);

  const handleSelectCard = (card, type) => {
    if (type === 'player') {
      if (selectedPlayerCard && selectedPlayerCard !== card) {
        return;
      }
      if (selectedPlayerCard === card) {
        setSelectedPlayerCard(null);
      } else {
        setSelectedPlayerCard(card);
      }
    } else {
      if (selectedCenterCards.includes(card)) {
        setSelectedCenterCards(selectedCenterCards.filter(c => c !== card));
      } else {
        setSelectedCenterCards([...selectedCenterCards, card]);
      }
    }
  }

  const handleCapture = () => {
    if (isCaptureValid) {
      const updatedState = game.captureCards(gameState.players[gameState.currentPlayerIndex].id, [selectedPlayerCard, ...selectedCenterCards]);
      console.log('updatedState', updatedState);
      setGameState(updatedState);
      // Reset selections after capture
      setSelectedPlayerCard(null);
      setSelectedCenterCards([]);
    }
  };

  return (
    <div className="game-board">
      <div className="player-section">
        <div>Player 1</div>
        <div style={{ display: 'flex' }}>
          {gameState.players[0].hand.map((card, idx) => (
            <Card key={idx} card={card} isFaceUp={gameState.currentPlayerIndex === 1} handleSelectCard={handleSelectCard} />
          ))}
          <div className="score-pile-container">
            <div className="score-pile">Score Pile</div>
            <div className="score-pile-outline"></div>
          </div>
        </div>
      </div>
      <div className="center-section">
        <div>Center</div>
        <div style={{ display: 'flex' }}>
          {gameState.centerCards.map((card, idx) => (
            <Card key={idx} card={card} isFaceUp={true} handleSelectCard={handleSelectCard} isSelected={selectedCenterCards.includes(card)} type='center' />
          ))}
          <Card isFaceUp={false} />
        </div>
      </div>
      <div className="player-section">
        <div>Player 2</div>
        <div style={{ display: 'flex' }}>
          {gameState.players[1].hand.map((card, idx) => (
            <Card key={idx} card={card} isFaceUp={gameState.currentPlayerIndex === 0} handleSelectCard={handleSelectCard} isSelected={selectedPlayerCard === card} type='player'/>
          ))}
          <div className="score-pile-container">
            <div className="score-pile">Score Pile</div>
            <div className="score-pile-outline"></div>
          </div>
        </div>
        <div>
          <button disabled={!isCaptureValid} onClick={handleCapture}>Capture</button>
          <button>Pass</button>
        </div>
      </div>
    </div>
  )
}

export default GameBoard;
