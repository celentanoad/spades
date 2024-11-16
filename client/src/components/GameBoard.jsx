// import { SpadesGame } from '../utils/gameLogic';
import { useState } from 'react';
import Card from './Card/Card';

const GameBoard = ({ game }) => {
  const [gameState, setGameState] = useState(game.state);
  const [isCaptureValid, setIsCaptureValid] = useState(false);
  // const [isPlayerTurn, setIsPlayerTurn] = useState(game.state.players[0].id === Socket.id);
  return (
    <div>
      <div>
        <div>Player 1</div>
        <div style={{ display: 'flex' }}>
          {game.state.players[0].hand.map((card, idx) => (
            <Card key={idx} rank={card.rank.name} suit={card.suit.name} isFaceUp={game.state.currentPlayerIndex === 1} />
          ))}
          <div>Score Pile</div>
        </div>
      </div>
      <div>
        <div>Center</div>
        <div style={{ display: 'flex' }}>
          {game.state.centerCards.map((card, idx) => (
            <Card key={idx} rank={card.rank.name} suit={card.suit.name} isFaceUp={true} />
          ))}
          <Card isFaceUp={false} />
        </div>
      </div>
      <div>
        <div>Player 2</div>
        <div style={{ display: 'flex' }}>
          {game.state.players[1].hand.map((card, idx) => (
            <Card key={idx} rank={card.rank.name} suit={card.suit.name} isFaceUp={game.state.currentPlayerIndex === 0} />
          ))}
          <div>Score Pile</div>
        </div>
        <div>
          <button disabled={!isCaptureValid}>Capture</button>
          <button>Pass</button>
        </div>
      </div>
    </div>
  )
}

export default GameBoard;