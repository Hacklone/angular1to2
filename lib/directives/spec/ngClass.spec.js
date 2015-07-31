var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngClass', function() {
    var ngSrc;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngClass');

        mockery.enable({ useCleanCache: true });

        ngSrc = require('../ngClass')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with new syntax', function() {
        var result = ngSrc.replace('<div ng-class="variable"></div>');

        expect(result).toEqual('<div [class]="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngSrc.replace('<div ng-class="!variable"></div>');

        expect(result).toEqual('<div [class]="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngSrc.replace('<div ng-class="variable"></div><div ng-class="!variable"></div>');

        expect(result).toEqual('<div [class]="variable"></div><div [class]="!variable"></div>');
    });
});