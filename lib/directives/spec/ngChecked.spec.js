var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngChecked', function() {
    var ngChecked;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngChecked');

        mockery.enable({ useCleanCache: true });

        ngChecked = require('../ngChecked')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with [checked]', function() {
        var result = ngChecked.replace('<div ng-checked="variable"></div>');

        expect(result).toEqual('<div [checked]="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngChecked.replace('<div ng-checked="!variable"></div>');

        expect(result).toEqual('<div [checked]="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngChecked.replace('<div ng-checked="variable"></div><div ng-checked="!variable"></div>');

        expect(result).toEqual('<div [checked]="variable"></div><div [checked]="!variable"></div>');
    });
});