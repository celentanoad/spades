const Room = ({ room, handleReturnToLobby }) => {
  if (!room) {
    return <div>Loading...</div>;
  }
  console.log('room', room);
  return ( 
    <>
      <div>Joined Room {room.roomNumber}</div>
      <div>User List</div>
      <ul>
        {room.users.map((user, idx) => (
          <li key={idx}>{user}</li>
        ))}
      </ul>
      <div>
        <button onClick={handleReturnToLobby}>Return to Lobby</button>

      </div>
    </>
   );
}
 
export default Room;