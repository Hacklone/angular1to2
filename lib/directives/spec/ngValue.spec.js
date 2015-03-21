var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngValue', function() {
    var ngValue;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngValue');

        mockery.enable({ useCleanCache: true });

        ngValue = require('../ngValue')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with [value]', function() {
        var result = ngValue.replace('<div ng-value="variable"></div>');

        expect(result).toEqual('<div [value]="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngValue.replace('<div ng-value="!variable"></div>');

        expect(result).toEqual('<div [value]="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngValue.replace('<div ng-value="variable"></div><div ng-value="!variable"></div>');

        expect(result).toEqual('<div [value]="variable"></div><div [value]="!variable"></div>');
    });
});