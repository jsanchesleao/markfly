var marked = require('marked');
var fs = require('fs');

var getMarkdown = function(filename, callback) {
  fs.readFile(filename, {encoding: 'utf-8'}, function(err, content) {
    callback(marked(content));
  });
};

module.exports = getMarkdown;
