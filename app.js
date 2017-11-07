var lichterkette = require('./lichterkette/lichterkette');
var app = require('express')();
var http = require('http').createServer( app);
var io = require('socket.io')(http);
var uuid = require('uuid/v4');

let size = 100;
let players = [];

class Player {
  constructor( id) {
    this.id = id;
  }
}

io.on('connection', function(socket){
  let userId;

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

http.listen(3000, function(){
  console.log("listening on port 3000");
});

lichterkette.init( size);

function shoot() {
  var red = {r:255, g:0, b:0};
  for( var i = 0; i < size; i++){
    var index = i;
    setTimeout(function(){
      lichterkette.set( index, red);
    }, i*100);
  }
}


setInterval(function(){
    lichterkette.draw();
},20);  
