var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngKeydown', function() {
    var ngKeydown;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngKeydown');

        mockery.enable({ useCleanCache: true });

        ngKeydown = require('../ngKeydown')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with (keydown)', function() {
        var result = ngKeydown.replace('<div ng-keydown="variable"></div>');

        expect(result).toEqual('<div (keydown)="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngKeydown.replace('<div ng-keydown="!variable"></div>');

        expect(result).toEqual('<div (keydown)="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngKeydown.replace('<div ng-keydown="variable"></div><div ng-keydown="!variable"></div>');

        expect(result).toEqual('<div (keydown)="variable"></div><div (keydown)="!variable"></div>');
    });
});