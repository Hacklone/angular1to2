var replaceInFileStream = require('../assets/replaceInFileStream');

module.exports = function() {
    return replaceInFileStream(/ng-value="/g, '[value]="');
};