module.exports = function(replaceRegex, replacement) {
    return {
        replace: function(textToReplaceIn) {
            return textToReplaceIn.replace(replaceRegex, replacement);
        }
    };
};