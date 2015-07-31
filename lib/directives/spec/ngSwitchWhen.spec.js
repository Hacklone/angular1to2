var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngSwitchWhen', function() {
    var ngSrc;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngSwitchWhen');

        mockery.enable({ useCleanCache: true });

        ngSrc = require('../ngSwitchWhen')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with new syntax', function() {
        var result = ngSrc.replace('<div ng-switch-when="variable"></div>');

        expect(result).toEqual('<div [ng-switch-when]="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngSrc.replace('<div ng-switch-when="!variable"></div>');

        expect(result).toEqual('<div [ng-switch-when]="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngSrc.replace('<div ng-switch-when="variable"></div><div ng-switch-when="!variable"></div>');

        expect(result).toEqual('<div [ng-switch-when]="variable"></div><div [ng-switch-when]="!variable"></div>');
    });
});