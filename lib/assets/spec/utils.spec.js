var utils = require('../utils');

describe('Assets.utils', function() {
    describe('replaceInFileBuffer(file, replaceRegex, replacement)', function() {
        it('should throw if the file is not a Buffer', function() {
            expect(function() {
                utils.replaceInFileBuffer({
                    isBuffer: function() { return false; }
                });
            }).toThrowAnyError();
        });

        it('should replace the file contents and return a Buffer', function() {
            var result = utils.replaceInFileBuffer({
                isBuffer: function() { return true },
                contents: 'tttabc ttt abc'
            }, /abc/g, 'cba');

            expect(String(result.contents)).toEqual('tttcba ttt cba');
        });
    });
});