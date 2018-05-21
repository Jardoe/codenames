const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const parser = require('body-parser');
const Game = require('./model/game.js')

app.use(parser.json());


// allows cross origin resource sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.on('connection', function(socket){
  socket.on('chat', (message) => {
    io.sockets.emit('chat', message);
  });
  socket.on('newGame', () => {
    const game = new Game();
    game.getData();
    const newGame = game.buildGame();
    io.sockets.emit('newGame', newGame)
  });
  socket.on('cardClick', (clickedIndex) => {
    io.sockets.emit('cardClick', clickedIndex)
  });
  socket.on('endTurnClicked', () => {
    console.log('re-emitting endTurnClick message')
    io.sockets.emit('endTurnClicked')
  })
});


const server = http.listen(3001, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
