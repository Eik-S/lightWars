let lichterkette = require('./lichterkette/lichterkette');

var values = {
  bar: [],
}

module.exports = {

  initBar: function( size) {
    if( values.bar.length === 0) {
      let start = size / 2 - 3;
      let end = start + 5;
      for( let i = start; i < end; i++) {
        values.bar.push(i);
        lichterkette.set( i, { r:255, g:255, b:255});
      }
    }
  },

  slideBar: function( direction) {


  }
}