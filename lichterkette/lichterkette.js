var chalk = require('chalk');


var values = {
  kette: [],
  init: false,
  //Treshold for draw in ms
  updateThreshold: 0,
  oldTime: 0
}

var draw = function(){
  let oldTime = values.oldTime;
  let updateThreshold = values.updateThreshold;
  let time = new Date().getTime();
  if( time - oldTime > updateThreshold) {
    let line = "";  
    for(let i = 0; i<values.kette.length; i++){
      let pixel = values.kette[i];
      line += chalk.rgb(pixel.r, pixel.g, pixel.b).bold('O');  
    }
    console.log('\033c');
    console.log(line);
    values.oldTime = time;
  }
}

module.exports = {
  
  init: function(count){
    if( !values.init){
      for(let i = 0; i<count; i++){
        values.kette.push({r:0,g:0,b:0});
      }
      values.init = true;
    }
  },
  getStatus: function(){
    return values.init;
  },
  getLength: function(index){
    return values.kette.length;
  },
  set: function(index, value){
    index = parseInt(index);
    if(values.init && parseInt(index) >= 0 && index < values.kette.length){
      values.kette[index] = value;
      draw();
    }
  },
  draw: function(){
    draw();
  }
};