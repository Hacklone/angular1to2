var replaceInFileStream = require('../assets/replaceInFileStream');

module.exports = function() {
    return replaceInFileStream(/ng-switch="/g, '[ng-switch]="');
};