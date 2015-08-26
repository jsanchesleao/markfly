#!/usr/bin/env node
var markfive = require('../src/main');
var argv = require('minimist')(process.argv.slice(2));

var port = argv.p || argv.port || 8494;
var host = argv.h || argv.host || 'localhost'

markfive(argv._[0], port, host);
