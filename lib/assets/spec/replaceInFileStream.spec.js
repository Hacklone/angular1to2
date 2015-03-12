var mockery = require('mockery');

describe('Assets.replaceInFileStream', function() {
    var replaceInFileStream;
    var utilsMock, through2Mock, through2MockObj;

    beforeEach(function() {
        utilsMock = {
            replaceInFileBuffer: jasmine.createSpy('utils.replaceInFileBuffer')
        };

        through2Mock = {
            obj: function(callback) {
                through2MockObj = {
                    trigger: function(file, enc, cb) {
                        callback(file, enc, cb);
                    }
                };

                return through2MockObj;
            }
        };

        mockery.registerMock('../assets/utils', utilsMock);
        mockery.registerMock('through2', through2Mock);
        mockery.registerAllowable('../replaceInFileStream');

        mockery.enable({ useCleanCache: true });

        replaceInFileStream = require('../replaceInFileStream');
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should return a stream object', function() {
        var streamObject = replaceInFileStream(/a/g, 'b');
        streamObject.trigger({}, null, function() {});

        expect(streamObject).toEqual(through2MockObj);
    });

    it('should pass the right parameters to utils replace', function() {
        var file = {a: 'b'};
        var replaceRegex = /a/g;
        var replacementString = 'b';

        var streamObject = replaceInFileStream(replaceRegex, replacementString);

        streamObject.trigger(file, null, function() {});

        expect(utilsMock.replaceInFileBuffer).toHaveBeenCalledWith(file, replaceRegex, replacementString);
    });

    it('should call passed callback with the given file', function() {
        var file = {a: 'b'};

        var streamObject = replaceInFileStream(/a/g, 'b');

        var callback = jasmine.createSpy();

        streamObject.trigger(file, null, callback);

        expect(callback).toHaveBeenCalledWith(null, file);
    });
});