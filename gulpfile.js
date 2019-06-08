'use strict';
var browserify = require('browserify');
var gulp = require('gulp')
var uglify = require('gulp-uglify')
var babelify = require('babelify')
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps')
const uuidV4 = require('uuid/v4')
const dash2underline = function(str) {
    return str.replace(/-/g, '_')
}
const uuidv4 = function() {
    return `${dash2underline(uuidV4())}`
}

const defaultOpts = { debug: process.env.NODE_ENV == 'production' ? false : true }

function bundle(opts) {
    opts = Object.assign(defaultOpts, opts)
    return browserify(opts)
        .external(['fs', 'path'])
        .transform(babelify, {
            presets: ['@babel/preset-env', '@babel/preset-flow'],
            plugins: [
                ["@babel/plugin-transform-runtime"]
            ]
        })
        .bundle()
}

gulp.task('plugin', () => {
    return bundle({
            entries: ['./src'],
            standalone: `$${uuidv4()}`,

        })
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./lib'));
})


gulp.task('plugin-min', () => {
    return bundle({ entries: ['./src'], standalone: `$${uuidv4()}` })
        .pipe(source('index.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./lib'));
})


gulp.task('build', gulp.series(
    'plugin',
    'plugin-min'
))