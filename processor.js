exports.sortByTime = function(hnjson){
  var items = hnjson.items;
  //convert time to minutes
  for(var i = 0; i<items.length-1; i++){
    addTimeInMinutes(items[i]);
  };
  /*
  for(var i = 0; i<items.length-1; i++){
    console.log(items[i].minutesAgo);
  };
 */
  hnjson.items = items;
  return hnjson;
};

exports.getNthOldest = function(hnjson, n){
  var items = hnjson.items;
}
var getNumber = function(str){
  var first = str.charAt(0);
  first = parseInt(first);
  var second = str.charAt(1);
  second = parseInt(second);
  if(0<second && second<=9){
    return total = (first*10)+second;
  }
  else
    return total = first;
}

var getMinutes = function(num, type){
  switch(type){
    case 1:
      return num;
      break;
    case 2:
      return num*60;
      break;
    case 3:
      return (num*24)*60;
      break;
  }
}
var addTimeInMinutes = function(item){
  var time = item.time;
  if(time.indexOf("day") !== -1){
    var num = getNumber(time);
    num = getMinutes(num, 3);
    item.minutesAgo = num;
  }
  else if(time.indexOf("hour") !== -1){
    var num = getNumber(time);
    num = getMinutes(num, 2);
    item.minutesAgo = num;
  }
  else{
    var num = getNumber(time);
    num = getMinutes(num, 1);
    item.minutesAgo = num;
  }
}
