let lichterkette = require('./lichterkette/lichterkette');

var values = {
  bar: -1,
  //shoot time per step in ms
  speed: 5,
  running: false
}

function slide( direction) {
  if( values.bar > 0 &&
      values.bar + 5 < lichterkette.getLength() &&
      values.running ) {
    if( direction === 1) {
      lichterkette.set(values.bar, 'black');
      lichterkette.set(values.bar + 5, 'white');
      values.bar += 1;
    } else if( direction === 2) {
      lichterkette.set(values.bar + 4, 'black');
      lichterkette.set(values.bar - 1, 'white');
      values.bar -= 1;
    }
  } else {
    endGame( direction);
  }
}

function endGame( direction) {
  values.running = false;
  let color;
  for( let i = 0; i < 10; i++) {
    setTimeout( function() {
      if( i % 2 === 1) {
        color = 'black';
      } else {
        color = 'white';
      }
      lichterkette.set(values.bar, color);
      lichterkette.set(values.bar + 1, color);
      lichterkette.set(values.bar + 2, color);
      lichterkette.set(values.bar + 3, color);
      lichterkette.set(values.bar + 4, color);
    }, i * 500);
  }
}


module.exports = {

  init: function() {
    if( values.bar === -1 && lichterkette.getStatus()) {
      let sizeKette = lichterkette.getLength();
      let start = sizeKette / 2 - 3;
      values.bar = start;
      let end = start + 5;
      for( let i = start; i < end; i++) {
        lichterkette.set( i, 'white');
      }
    }
    values.running = true;
  },

  initShot: function( direction) {
    let lkSize = lichterkette.getLength();
    if( lichterkette.getStatus() && 
        values.bar < lichterkette.getLength() &&
        values.bar > 0 &&
        values.running) {
      if( direction === 1) {
        for( let i = 0; i <= values.bar; i++){
          setTimeout(function( ){
            lichterkette.set( i-1, 'black');
            lichterkette.set( i, 'red');
            if( i === values.bar) {
              slide( 1);
            }
          }, i * values.speed);
        }
      } else if( direction === 2) {
        for( let i = lkSize; i >= values.bar + 4; i--) {
          setTimeout(function( ){
            lichterkette.set( i+1, 'black');
            lichterkette.set( i, 'red');
            if( i === values.bar + 4) {
              slide( 2);
            }
          }, (lkSize - i) * values.speed);
        }
      }
    }
  }
};