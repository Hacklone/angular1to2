var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngDblclick', function() {
    var ngDblclick;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngDblclick');

        mockery.enable({ useCleanCache: true });

        ngDblclick = require('../ngDblclick')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with (dblclick)', function() {
        var result = ngDblclick.replace('<div ng-dblclick="variable"></div>');

        expect(result).toEqual('<div (dblclick)="variable"></div>');
    });

    it('should not negate', function() {
        var result = ngDblclick.replace('<div ng-dblclick="!variable"></div>');

        expect(result).toEqual('<div (dblclick)="!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngDblclick.replace('<div ng-dblclick="variable"></div><div ng-dblclick="!variable"></div>');

        expect(result).toEqual('<div (dblclick)="variable"></div><div (dblclick)="!variable"></div>');
    });
});