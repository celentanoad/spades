import { useEffect, useState } from 'react';
import './App.css';
import io, { Socket } from 'socket.io-client';
import GameRoom from './components/GameRoom';

export interface Room {
  roomNumber: number;
  users: string[];
}

const App = () => {
  const [ roomList, setRoomList ] = useState<Room[]>([]);
  const [ roomNumber, setRoomNumber ] = useState<number>(0);
  const [ socket, setSocket ] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('get_room_list');
    newSocket.on('room_list', (rooms) => {
      setRoomList(rooms);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleReturnToLobby = () => {
    if (!socket) return;
    const updatedRoomList = roomList.map((r) => 
      r.roomNumber === roomNumber ? { ...r, users: r.users.filter(user => user !== socket.id) } : r
    );
    setRoomList(updatedRoomList);
    // sends a message to the server to update the room list w/ the user removed
    socket?.emit('leave_room', roomNumber, socket.id);
    setRoomNumber(0);
  };

  const handleJoinGameRoom = (room: Room) => {
    if (!socket) return;

    const updatedRoomList = roomList.map((r) => 
      r.roomNumber === room.roomNumber ? { ...r, users: [...r.users, socket.id].filter((user): user is string => user !== undefined) } : r
    );
    setRoomList(updatedRoomList);
    // sends a message to the server to update the room list w/ the user added
    socket?.emit('join_room', room.roomNumber, socket.id);
    setRoomNumber(room.roomNumber);
  };

  

  return (
    <div>
    { roomNumber === 0 ? 
      <>
        <header>Welcome to Spades! Select a room to join a game. </header>
        <div>
          {roomList.map((room, idx) => 
            idx !== 0 && <button disabled={room.users.length === 2} onClick={() => { handleJoinGameRoom(room) }} key={idx}>Join room {room.roomNumber}</button>
          )}
        </div>
      </>
    :
      <GameRoom room={roomList[roomNumber]} handleReturnToLobby={handleReturnToLobby}/>
    }
    </div>
  )
}

export default App;
