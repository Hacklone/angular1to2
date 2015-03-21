var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngBlur', function() {
    var ngBlur;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngBlur');

        mockery.enable({ useCleanCache: true });

        ngBlur = require('../ngBlur')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with (blur)', function() {
        var result = ngBlur.replace('<div ng-blur="variable"></div>');

        expect(result).toEqual('<div (blur)="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngBlur.replace('<div ng-blur="!variable"></div>');

        expect(result).toEqual('<div (blur)="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngBlur.replace('<div ng-blur="variable"></div><div ng-blur="!variable"></div>');

        expect(result).toEqual('<div (blur)="variable"></div><div (blur)="!variable"></div>');
    });
});