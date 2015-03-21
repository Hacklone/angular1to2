var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngFocus', function() {
    var ngFocus;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngFocus');

        mockery.enable({ useCleanCache: true });

        ngFocus = require('../ngFocus')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with (focus)', function() {
        var result = ngFocus.replace('<div ng-focus="variable"></div>');

        expect(result).toEqual('<div (focus)="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngFocus.replace('<div ng-focus="!variable"></div>');

        expect(result).toEqual('<div (focus)="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngFocus.replace('<div ng-focus="variable"></div><div ng-focus="!variable"></div>');

        expect(result).toEqual('<div (focus)="variable"></div><div (focus)="!variable"></div>');
    });
});