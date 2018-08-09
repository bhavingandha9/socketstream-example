const express = require('express');
const app = express();
const socketIO = require('socket.io');
const ss = require('socket.io-stream');
const server = app.listen(2000);
const path = require('path');
const io = socketIO(server);
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  ss(socket).on('file', function (stream, data) {
    stream.pipe(fs.createWriteStream('fromClient' + data.name));
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})