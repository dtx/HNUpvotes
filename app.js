
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , rest = require('./httpreq')
  , processor = require('./processor')
  , sorter = require('./qsort');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var hnjs = {};
var workOnData = function(hnjson){
  hnjson = processor.sortByTime(hnjson);
  hnjson = sorter.quickSort(hnjson);
  for(var i=0; i<((hnjson.items.length)-1); i++){
    console.log(hnjson.items[i]);
  }
  hnjs = hnjson;
};

var url = 'http://hndroidapi.appspot.com/best/format/json/page/';
http.get(url, function(res){
  var body = '';
  res.on('data', function(chunk){
    body+=chunk;
  });
  res.on('end', function(){
    var hnresp = JSON.parse(body);
    console.log('Calling processor');
    workOnData(hnresp);
  });
}).on('error', function(e){
  console.log('Got error: ' + e.message);
});

app.get('/', function(req, res){
  res.render('index', { items: hnjs.items});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



