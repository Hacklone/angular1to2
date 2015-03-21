var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngShow', function() {
    var ngShow;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngShow');

        mockery.enable({ useCleanCache: true });

        ngShow = require('../ngShow')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with [hidden]', function() {
        var result = ngShow.replace('<div ng-show="variable"></div>');

        expect(result).toEqual('<div [hidden]="!variable"></div>');
    });

    it('should negate', function() {
        var result = ngShow.replace('<div ng-show="variable"></div>');

        expect(result).toEqual('<div [hidden]="!variable"></div>');
    });

    it('should double negate', function() {
        var result = ngShow.replace('<div ng-show="!variable"></div>');

        expect(result).toEqual('<div [hidden]="!!variable"></div>');
    });

    it('should replace multiple', function() {
        var result = ngShow.replace('<div ng-show="variable"></div><div ng-show="!variable"></div>');

        expect(result).toEqual('<div [hidden]="!variable"></div><div [hidden]="!!variable"></div>');
    });
});