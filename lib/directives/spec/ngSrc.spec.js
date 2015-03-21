var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngSrc', function() {
    var ngSrc;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngSrc');

        mockery.enable({ useCleanCache: true });

        ngSrc = require('../ngSrc')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with [src]', function() {
        var result = ngSrc.replace('<div ng-src="variable"></div>');

        expect(result).toEqual('<div [src]="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngSrc.replace('<div ng-src="!variable"></div>');

        expect(result).toEqual('<div [src]="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngSrc.replace('<div ng-src="variable"></div><div ng-src="!variable"></div>');

        expect(result).toEqual('<div [src]="variable"></div><div [src]="!variable"></div>');
    });
});