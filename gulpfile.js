const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 2000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function () {
        console.log('Restarting');
    });
});

gulp.task('test', function () {
    let folder = process.argv.find(a => a.indexOf("--folder=") > -1).split('=')[1];
    folder = folder || '*';

    const src = `tests/${folder}/*.js`;
    return gulp.src(src)
        .pipe(gulpMocha({ reporter: 'nyan' }));
});