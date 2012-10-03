var http = require('http');

exports.getJSON = function(options, onresult){
  console.log("rest::getJSON");
  var prot = http;
  var req = prot.request(options, function(res){
    var output = '';
    console.log(options.host + ' :responded with: ' + res.statusCode);
    res.setEncoding('utf8');

    res.on('data', function(chunk){
      output += chunk;
    });

    res.on('end', function(){
      var obj = JSON.parse(output);
      onresult(res.statusCode, obj);
    });
  });
  req.on('error', function(err){
    //res.send('error:' + err.message);
  });
  req.end();
};

