var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngKeyup', function() {
    var ngKeyup;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngKeyup');

        mockery.enable({ useCleanCache: true });

        ngKeyup = require('../ngKeyup')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with (keyup)', function() {
        var result = ngKeyup.replace('<div ng-keyup="variable"></div>');

        expect(result).toEqual('<div (keyup)="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngKeyup.replace('<div ng-keyup="!variable"></div>');

        expect(result).toEqual('<div (keyup)="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngKeyup.replace('<div ng-keyup="variable"></div><div ng-keyup="!variable"></div>');

        expect(result).toEqual('<div (keyup)="variable"></div><div (keyup)="!variable"></div>');
    });
});