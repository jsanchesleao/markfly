var fs = require('fs');
var chokidar = require('chokidar');
var path = require('path');
var server = require('http').createServer();
var markdown = require('./markdown');
var rimraf = require('rimraf');
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({server: server});

var start = function(filename, port, host) {

  var sockets = [];
  var watcher = null;

  var watchFile = function() {
    watcher = chokidar.watch(filename);
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
    if (req.url === '/quit') {
      res.write('0');
      res.end();
      process.exit(0);
    }
    else if (req.url === '/scroll/smart') {
      sockets.forEach(function(ws) { ws.send(':set:smart-scroll') });
      res.end(); return;
    }
    else if (req.url === '/scroll/fixed') {
      sockets.forEach(function(ws) { ws.send(':set:fixed-scroll') });
      res.end(); return;
    }
    else if (req.url === '/scroll/pin-down') {
      sockets.forEach(function(ws) { ws.send(':set:pin-down') });
      res.end(); return;
    }
    else if (req.url === '/content') {
      var content = '';
      req.on('data', function(chunk) { content += chunk; });
      req.on('end', function() { 
        var html = markdown.compile(content);
        sockets.forEach(function(ws){
          ws.send(html);
        });
        res.end();
      });
      return;
    }
    else if (req.url === '/file') {
      var file = '';
      req.on('data', function(chunk) { file += chunk; });
      req.on('end', function() {
        console.log('Now watching ', file);
        fs.exists(file, function(exists) {
          if (exists) {
            res.write('0');
            filename = file;
            watcher && watcher.close();
            watchFile();
            markdown(filename, function(content){
              sockets.forEach(function(ws) {
                ws.send(content);
              });
            });
          }
          else {
            console.log(file);
            res.write('1');
          }
          res.end();
        });
      });
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(path.join(__dirname, 'preview.html'), 
                {encoding: 'utf-8'}, 
                function(err, file) {
                  res.write(file.replace(/###WEBSOCKET_HOST###/g, host)
                                .replace(/###WEBSOCKET_PORT###/g, port));
                  res.end();
                });
  });

  var removeLockFile = function() {
    rimraf.sync('.markfly_port');
  };

  server.listen(port, function() {
    console.log('Markfly is running!\nPreview in http://' + host + ':' + port);
    fs.writeFile('.markfly_port', port + '\n', {encoding: 'utf8'}, function(err) {
      if (err) {
        console.log('Could not write .markfly_port file', err);
      }
    });

    process.on('exit', removeLockFile);
    process.on('SIGINT', function() {
      process.exit();
    });
  });
};

module.exports = start;
