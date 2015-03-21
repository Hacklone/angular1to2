var replaceInFileStream = require('../assets/replaceInFileStream');

module.exports = function() {
    return replaceInFileStream(/ng-hide="/g, '[hidden]="');
};