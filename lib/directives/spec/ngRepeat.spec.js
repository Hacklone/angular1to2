var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngShow', function() {
    var ngRepeat;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngRepeat');

        mockery.enable({ useCleanCache: true });

        ngRepeat = require('../ngRepeat')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with *foreach', function() {
        var result = ngRepeat.replace('<div ng-repeat="variable in list"></div>');

        expect(result).toEqual('<div *ng-for="#variable in list"></div>');
    });

    it('should set the iterator to a variable', function() {
        var result = ngRepeat.replace('<div ng-repeat="variable in list"></div>');

        expect(result).toEqual('<div *ng-for="#variable in list"></div>');
    });

    it('should replace multiple', function() {
        var result = ngRepeat.replace('<div ng-repeat="variable in list"></div><div ng-repeat="variable in list"></div>');

        expect(result).toEqual('<div *ng-for="#variable in list"></div><div *ng-for="#variable in list"></div>');
    });
});