var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngKeypress', function() {
    var ngKeypress;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngKeypress');

        mockery.enable({ useCleanCache: true });

        ngKeypress = require('../ngKeypress')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with (keypress)', function() {
        var result = ngKeypress.replace('<div ng-keypress="variable"></div>');

        expect(result).toEqual('<div (keypress)="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngKeypress.replace('<div ng-keypress="!variable"></div>');

        expect(result).toEqual('<div (keypress)="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngKeypress.replace('<div ng-keypress="variable"></div><div ng-keypress="!variable"></div>');

        expect(result).toEqual('<div (keypress)="variable"></div><div (keypress)="!variable"></div>');
    });
});