const http = require('http');
const express = require('express');
const path = require('path');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(path.resolve('./public')));

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.sendFile('/public/index.html');
    });


// Socket.io
io.on('connection', (socket) => {
//   console.log('User connected', socket.id);
    socket.on('user-message', (message) => {
        // console.log('A new User message: ', msg);
        io.emit('message', message);
});
});