var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngClick', function() {
    var ngClick;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngClick');

        mockery.enable({ useCleanCache: true });

        ngClick = require('../ngClick')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with (click)', function() {
        var result = ngClick.replace('<div ng-click="variable"></div>');

        expect(result).toEqual('<div (click)="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngClick.replace('<div ng-click="!variable"></div>');

        expect(result).toEqual('<div (click)="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngClick.replace('<div ng-click="variable"></div><div ng-click="!variable"></div>');

        expect(result).toEqual('<div (click)="variable"></div><div (click)="!variable"></div>');
    });
});