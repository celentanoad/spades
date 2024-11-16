const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

let defaultRooms = [
  {
    roomNumber: 0,
    users: []
  },
  { 
    roomNumber: 1,
    users: [] 
  },
  { 
    roomNumber: 2,
    users: [] 
  },
  { 
    roomNumber: 3,
    users: [] 
  }
]

// socket.emit sends a message to the client that initiated the event
// socket.broadcast.emit sends a message to all clients except the client that initiated the event
// io.emit sends a message to all clients
// https://socket.io/docs/v4/emit-cheatsheet/#server-side for more info

io.on('connection', (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.emit('room_list', defaultRooms);

  socket.on('get_room_list', () => {
    // does this need to be broadcasted to all clients?
    socket.emit('room_list', defaultRooms);
  });

  socket.on('join_room', (roomNumber, userId) => {
    defaultRooms = defaultRooms.map((room) => 
      room.roomNumber === roomNumber ? { ...room, users: [...room.users, userId] } : room
    );
    console.log(`user ${userId} joined room ${roomNumber}`);
    io.emit('room_list', defaultRooms);
    // io.emit('new_player', roomNumber, userId);

  });

  socket.on('leave_room', (roomNumber, userId) => {
    console.log(`user ${userId} left room ${roomNumber}`);
    defaultRooms = defaultRooms.map((room) => 
      room.roomNumber === roomNumber ? { ...room, users: room.users.filter(user => user !== userId) } : room
    );
    io.emit('room_list', defaultRooms);
    // io.emit('player_left', roomNumber, userId);
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected: ${socket.id}`);
    defaultRooms = defaultRooms.map((room) =>
    ({ ...room, users: room.users.filter(user => user !== socket.id) })
    );
    io.emit('room_list', defaultRooms);
    // io.emit('player_left', null, socket.id);
  });
});

server.listen(3001, () => {
  console.log('server is running');
})