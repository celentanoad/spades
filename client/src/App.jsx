import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Room from './components/Room';

function App() {

  const [ roomList, setRoomList ] = useState([]);
  const [ roomNumber, setRoomNumber ] = useState(0);
  const [ socket, setSocket ] = useState(null);

  useEffect(() => {
    const newSocket = io.connect('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('get_room_list');
    newSocket.on('room_list', (rooms) => {
      setRoomList(rooms);
    });

    // newSocket.on('new_player', (roomId, userId) => {
    //   // message from the server to indicate that a new user has joined, and to update the room list
    //   setRoomList(prevRoomList => 
    //     prevRoomList.map(room => 
    //       room.roomNumber === roomId ? { ...room, users: [...room.users, userId] } : room
    //     )
    //   );
    // });

    // newSocket.on('player_left', (roomId, userId) => {
    //   // message from the server to indicate that a user has left, and to update the room list
    //   setRoomList(prevRoomList => 
    //     prevRoomList.map(room => 
    //       room.roomNumber === roomId ? { ...room, users: room.users.filter(user => user !== userId) } : room
    //     )
    //   );
    // });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleReturnToLobby = () => {
    const updatedRoomList = roomList.map((r) => 
      r.roomNumber === roomNumber ? { ...r, users: r.users.filter(user => user !== socket.id) } : r
    );
    setRoomList(updatedRoomList);
    // sends a message to the server to update the room list w/ the user removed
    socket.emit('leave_room', roomNumber, socket.id);
    setRoomNumber(0);
  };

  const handleJoinRoom = (room) => {
    const updatedRoomList = roomList.map((r) => 
      r.roomNumber === room.roomNumber ? { ...r, users: [...r.users, socket.id] } : r
    );
    setRoomList(updatedRoomList);
    // sends a message to the server to update the room list w/ the user added
    socket.emit('join_room', room.roomNumber, socket.id);
    setRoomNumber(room.roomNumber);
  };

  

  return (
    <div>
    { roomNumber === 0 ? 
      <>
        <header>Welcome to Spades! Select a room to join a game. </header>
        <div>
          {roomList.map((room, idx) => 
            idx !== 0 && <button disabled={room.users.length === 2} onClick={() => { handleJoinRoom(room) }} key={idx}>Join room {room.roomNumber}</button>
          )}
        </div>
      </>
    :
      <Room room={roomList[roomNumber]} handleReturnToLobby={handleReturnToLobby}/>
    }
    </div>
  )
}

export default App;
