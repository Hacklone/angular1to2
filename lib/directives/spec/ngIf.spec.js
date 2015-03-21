var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngIf', function() {
    var ngIf;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngIf');

        mockery.enable({ useCleanCache: true });

        ngIf = require('../ngIf')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with *if', function() {
        var result = ngIf.replace('<div ng-if="variable"></div>');

        expect(result).toEqual('<div *if="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngIf.replace('<div ng-if="!variable"></div>');

        expect(result).toEqual('<div *if="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngIf.replace('<div ng-if="variable"></div><div ng-if="!variable"></div>');

        expect(result).toEqual('<div *if="variable"></div><div *if="!variable"></div>');
    });
});