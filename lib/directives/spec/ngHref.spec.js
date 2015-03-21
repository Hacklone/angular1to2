var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngHref', function() {
    var ngHref;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngHref');

        mockery.enable({ useCleanCache: true });

        ngHref = require('../ngHref')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with [href]', function() {
        var result = ngHref.replace('<div ng-href="variable"></div>');

        expect(result).toEqual('<div [href]="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngHref.replace('<div ng-href="!variable"></div>');

        expect(result).toEqual('<div [href]="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngHref.replace('<div ng-href="variable"></div><div ng-href="!variable"></div>');

        expect(result).toEqual('<div [href]="variable"></div><div [href]="!variable"></div>');
    });
});