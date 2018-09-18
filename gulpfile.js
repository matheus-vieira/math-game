const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha');
const nodeParams = require('./utils/nodeParams');

gulp.task('default', function (done) {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: { PORT: 2000 },
        ignore: ['./node_modules/**']
    }).on('restart', () => console.log('Restarting'));
    done();
});

gulp.task('test', function () {
    let folder = nodeParams.getParam('folder') ||  '*';
    const src = `tests/${folder}/*.js`;
    return gulp.src(src)
        .pipe(gulpMocha({ reporter: 'spec' }));
});