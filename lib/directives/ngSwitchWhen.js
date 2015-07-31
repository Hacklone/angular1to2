var replaceInFileStream = require('../assets/replaceInFileStream');

module.exports = function() {
    return replaceInFileStream(/ng-switch-when="/g, '[ng-switch-when]="');
};