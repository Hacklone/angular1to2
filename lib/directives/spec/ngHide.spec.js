var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngHide', function() {
    var ngHide;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngHide');

        mockery.enable({ useCleanCache: true });

        ngHide = require('../ngHide')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with [hidden]', function() {
        var result = ngHide.replace('<div ng-hide="variable"></div>');

        expect(result).toEqual('<div [hidden]="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngHide.replace('<div ng-hide="!variable"></div>');

        expect(result).toEqual('<div [hidden]="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngHide.replace('<div ng-hide="variable"></div><div ng-hide="variable"></div>');

        expect(result).toEqual('<div [hidden]="variable"></div><div [hidden]="variable"></div>');
    });
});