var fs = require('fs');
var path = require('path');
var vfs = require('vinyl-fs');
var optimist = require('optimist');

module.exports = function() {
    var _sourceDirectory;
    var _destinationDirectory;
    
    function _start() {
        try {
            logTitle();
            
            _convert();
            
            logEnd();
        }
        catch(e) {
            console.log('-----------------------');
            console.log('Something went wrong :(');
            console.log('-----------------------');
            console.log(e);
            throw e;
        }
        
        function logTitle() {
            console.log('                           __              ____   __          ______ ');
            console.log(' .---.-.-----.-----.--.--.|  |.---.-.----.|_   | |  |_.-----.|__    |');
            console.log(' |  _  |     |  _  |  |  ||  ||  _  |   _| _|  |_|   _|  _  ||    __|');
            console.log(' |___._|__|__|___  |_____||__||___._|__|  |______|____|_____||______|');
            console.log('             |_____|               |_  \\/   |_| _  _  |  |  _ __  _ ');
            console.log('                                   |_) /    | |(_|(_  |< | (_)| |(/_ ');
            console.log('')
            console.log('https://github.com/Hacklone/angular1to2');
            console.log('=====================================================================');
        }
        
        function logEnd() {
            console.log('---------------------------------------------------------------------');
            console.log('Sucessfully converted your project to ' + _destinationDirectory);
            console.log('=====================================================================');
        }
    }
    
    function _convert() {
        var argv = _getArgs();
            
        _sourceDirectory = argv._[0];
        
        if(!fs.existsSync(_sourceDirectory)) {
            throw new Error('Your project directory doesn\' exist: ' + _sourceDirectory);
        }
        
        _destinationDirectory = _sourceDirectory.slice(0, -1) + '-converted';
        
        console.log('Converting your project from ' + _sourceDirectory + ' to ' + _destinationDirectory);
        console.log('---------------------------------------------------------------------');
        
        _convertHtmls();
    }
    
    function _getArgs() {
        return optimist
            .usage('Usage: angular1to2 <yourProjectDirectory>')
            .demand(0)
            .describe(0, 'Path to your project')
            .argv;
    }
    
    function _convertHtmls() {
        console.log('|    Converting you HTMLs...');
        
        var attributeConverters = _loadConverters('../lib/directives');
        
        var htmlConverters = [].concat(attributeConverters);
        
        _runConverters(path.join(_sourceDirectory, '/**/*.html'), _destinationDirectory, htmlConverters);
    }
    
    function _runConverters(files, destination, converters) {
        var stream = vfs.src(files);

        converters.forEach(function(converter) {
            stream = stream.pipe(converter());
        });
        
        stream.pipe(vfs.dest(destination));
    }
    
    function _loadConverters(moduleDirectoryPath) {
        return fs.readdirSync(moduleDirectoryPath)
            .map(function(file) {
                if (file.match(/.+\.js/g)) {
                    var name = file.replace('.js', '');
                    
                    var modulePath = path.join(moduleDirectoryPath, name);

                    return require(modulePath);
                }
            });
    }
    
    return {
        start: _start
    };
}();