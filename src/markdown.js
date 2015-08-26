var marked = require('marked');
var fs = require('fs');
var hljs = require('highlight.js');

marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

var getMarkdown = function(filename, callback) {
  fs.readFile(filename, {encoding: 'utf-8'}, function(err, content) {
    callback(marked(content));
  });
};

getMarkdown.compile = function(content) {
  return marked(content);
};

module.exports = getMarkdown;
