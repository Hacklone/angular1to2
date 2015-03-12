var utils = require('../assets/utils');
var through2 = require('through2');

module.exports = function(replaceRegex, replacement) {
    return through2.obj(function (file, enc, callback) {
        utils.replaceInFileBuffer(file, replaceRegex, replacement);
        
        return callback(null, file);
    });
};