import { useState } from 'react';
import SpadesGame from '../utils/gameLogic';
import GameBoard from './GameBoard';

const GameRoom = ({ room, handleReturnToLobby }) => {
  const [game, setGame] = useState(null);

  const startGame = () => {
    if (room.users.length === 2) {
      const newGame = new SpadesGame(room.users);
      setGame(newGame);
    }
  };

  const handleConfirmationWindow = () => {
    if (window.confirm('Are you sure you want to leave the game?')) handleReturnToLobby();
  }

  if (!room) {
    return <div>Loading...</div>;
  }
  console.log('room', room);

  return ( 
    <>
    {game ? 
      <GameBoard game={game} /> :
      <><div>Joined Room {room.roomNumber}</div><div>User List</div><ul>
          {room.users.map((user, idx) => (
            <li key={idx}>{user}</li>
          ))}
        </ul><div>
            <button disabled={room.users.length !== 2} onClick={startGame}>Start Game</button>
          </div></>
    }
    <button onClick={game ? handleConfirmationWindow : handleReturnToLobby}>Return to Lobby</button>
    </>
   );
}
 
export default GameRoom;