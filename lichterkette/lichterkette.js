var chalk = require('chalk');

var values = {
  kette: [],
  init: false
}

var draw = function(){
  var line = "";
  
  for(var i = 0; i<values.kette.length; i++){
    var pixel = values.kette[i];
//    console.log(pixel);
    line += chalk.rgb(pixel.r, pixel.g, pixel.b).bold('O');  
  }
  console.log('\033c');
  console.log(line);
}

module.exports = {
  
  init: function(count){
    for(var i = 0; i<count; i++){
      values.kette.push({r:0,g:0,b:0});
    }
    values.init = true;
  },
  set: function(index, value){
    index = parseInt(index);
  //  console.log('index: '+ index);
    if(values.init && parseInt(index) >= 0 && index < values.kette.length){
      values.kette[index] = value;
    }
  },
  get: function(index){
    if(values.init && index >= 0 && index < values.kette.length){
      return values.kette[index];
    }
  },
  draw: function(){
    draw();
  } 
  

};
