#!/usr/bin/env node
var markfive = require('../src/main');
var argv = require('minimist')(process.argv.slice(2));

console.log('port: ', argv.p || argv.port);
console.log('host: ', argv.h || argv.host);
console.log('file: ', argv._[0]);

markfive(argv._[0], 
         argv.p || argv.port || 8494,
         argv.h || argv.host || 'localhost');
