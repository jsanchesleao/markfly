var fs = require('fs');
var chokidar = require('chokidar');
var path = require('path');
var server = require('http').createServer();
var markdown = require('./markdown');
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({server: server});

var start = function(filename, port, host) {

  var sockets = [];

  var watchFile = function() {
    var watcher = chokidar.watch(filename);
    watcher.on('change', function(path) {
      console.log('Change detected! Updating');
      markdown(filename, function(content) {
        sockets.forEach(function(ws) { 
          ws.send(content)
        });
      });
      watcher.close();
      watchFile();
    });
  };
  watchFile();

  wss.on('connection', function connection(ws) {
    console.log('Opening a websocket connection');
    sockets.push(ws);

    ws.on('message', function(message) {
      console.log('received: ' + message);
    });

    ws.on('close', function() {
      console.log('Closing a websocket connection');
      sockets.splice(sockets.indexOf(ws), 1);
    });

    markdown(filename, function(content) {
      ws.send(content);
    });


  });

  server.on('request', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(path.join(__dirname, 'preview.html'), 
                {encoding: 'utf-8'}, 
                function(err, file) {
                  res.write(file.replace(/###WEBSOCKET_HOST###/g, host)
                                .replace(/###WEBSOCKET_PORT###/g, port));
                  res.end();
                });
  });

  server.listen(port, function() {
    console.log('Markfly is running!\nPreview in http://' + host + ':' + port);
  });
};

module.exports = start;
