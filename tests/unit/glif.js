var path = require('path');
var fs = require('fs');
var UFOglif = require('../../src/ufo/glif');

var ufoRoot = path.join(__dirname, '../data/UFO/');
// var tstRoot = '../data/UFO/';
var xmlGlif = fs.readFileSync(ufoRoot + './glif/square.glif');
var xmlGlif = fs.readFileSync(ufoRoot + './glif/anchor.glif');

var parser = new UFOglif();
parser.parse('' + xmlGlif);
console.log(parser.print());
console.log('-- report ---------------------');
console.log(parser.report());
