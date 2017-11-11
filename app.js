var lichterkette = require('./lichterkette/lichterkette');
var playground = require('./playground');
var app = require('express')();
var http = require('http').createServer( app);
var io = require('socket.io')(http);
var uuid = require('uuid/v4');

let size = 100;
let players = [];
let bar = [];

class Player {
  constructor( id) {
    this.id = id;
  }
}

io.on('connection', function(socket){
  let userId;
  lichterkette.init( size);
  playground.initBar( size);

  socket.on('playerCon', function(uid){
    userId = uid;
    if( !userId){
      userId = uuid();
      console.log("New player " + userId + " connected.");
      socket.emit('saveId',userId);
      addPlayer( userId);
    } else {
      console.log("Player " + userId + " is back.");
      let playerExists = players.some( function(i){
        return i['id'] === userId;
      });
      if( !playerExists){
        addPlayer( userId);
      }
    }
  })

  socket.on('shoot', function(){
    shoot();
  });

  socket.on('disconnect', function(){
    removePlayer( userId);
  });

});

function addPlayer( id) {
  console.log("adding player");
  players.push( new Player(id));
  console.log(JSON.stringify(players));
}

function removePlayer( id, team) {
  console.log("removing player");
  let index = players.some( function(i){
    return i['id'] === id;
  });
  players.splice( index, 1);
  console.log(JSON.stringify(players));
}

function shoot() {
  var red = {r:255, g:0, b:0};
  var white = {r: 255, g:255, b:255};
  var black = {r: 0, g:0, b:0};
  for( let i = 0; i <= size; i++){
    setTimeout(function( ){
      lichterkette.set( i-1, black);
      lichterkette.set( i, red);
    }, i*5);
  }
}


http.listen(3000, function(){
  console.log("listening on port 3000");
});


