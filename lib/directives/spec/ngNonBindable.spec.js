var mockery = require('mockery');
var replaceStub = require('../../assets/spec/replaceInFileStream.stub');

describe('Attributes.ngNonBindable', function() {
    var ngSrc;

    beforeEach(function() {
        mockery.registerMock('../assets/replaceInFileStream', replaceStub);
        mockery.registerAllowable('../ngNonBindable');

        mockery.enable({ useCleanCache: true });

        ngSrc = require('../ngNonBindable')();
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should replace with new syntax', function() {
        var result = ngSrc.replace('<div ng-non-bindable></div>');

        expect(result).toEqual('<div non-bindable></div>');
    });    

    it('should replace with new syntax with space', function() {
        var result = ngSrc.replace('<div ng-non-bindable ></div>');

        expect(result).toEqual('<div non-bindable ></div>');
    });   

    it('should replace with new syntax with var declaration', function() {
        var result = ngSrc.replace('<div ng-non-bindable=""></div>');

        expect(result).toEqual('<div non-bindable=""></div>');
    });

    it('should replace multiple', function() {
        var result = ngSrc.replace('<div ng-non-bindable></div><div ng-non-bindable ></div>');

        expect(result).toEqual('<div non-bindable></div><div non-bindable ></div>');
    });
});