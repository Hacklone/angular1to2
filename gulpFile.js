var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('test', function () {
    var files = [
        'lib/**/*.js',
        'node_modules/jasmine-expect/dist/*.js'
    ];

    return gulp.src(files)
        .pipe(jasmine());
});