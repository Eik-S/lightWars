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
  constructor( id, team) {
    this.id = id;
    this.team = team;
  }
}

io.on('connection', function(socket){
  let userId;
  lichterkette.init( size);
  playground.init();

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
    console.log(userId);
    console.log(getTeam( userId));
    playground.initShot( getTeam(userId));
  });

  socket.on('disconnect', function(){
    removePlayer( userId);
  });

});

function addPlayer( id) {
  let team;
  if( players.length % 2 === 0){
    team = 1;
  } else {
    team = 2;
  }
  console.log("adding player to team " + team);
  players.push( new Player(id, team));
  console.log(JSON.stringify(players));
}

function getTeam( id) {
  for( let i in players) {
    if( players[i]['id'] === id) {
      return players[i]['team'];
    }
  }
}

function removePlayer( id) {
  console.log("removing player");
  for( let i in players) {
    if( players[i]['id'] === id) {
      players.splice( i, 1);
      console.log(JSON.stringify(players));
    }
  }
}

http.listen(3000, function(){
  console.log("listening on port 3000");
});


