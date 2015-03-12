module.exports = function() {
    function _replaceInFileBuffer(file, replaceRegex, replacement) {
        if(!file.isBuffer()) {
            throw new Error('file should be a Buffer');
        }
        
        file.contents = new Buffer(String(file.contents).replace(replaceRegex, replacement));
        
        return file;
    }
    
    return {
        replaceInFileBuffer: _replaceInFileBuffer
    };
}();
