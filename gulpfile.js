// Gulp.js configuration
//Using this https://www.sitepoint.com/introduction-gulp-js/ tutorial
const
    // modules
    gulp = require('gulp'),
    // newer Source files that are newer than corresponding destination files are passed through. Everything else is removed.
    newer = require('gulp-newer'),
    //imagein sets an optional optimizationLevel argument, outputs compressed images to the Gulp dest/images/ folder, exports a public images task which calls the images function
    imagemin = require('gulp-imagemin'),
    //noop This performs no operation, which can be useful for simple development/production processing decisions
    noop = require('gulp-noop'),
    //htmlclean safely minify our HTML code to remove unnecessary whitespace and attributes
    htmlclean = require('gulp-htmlclean'),
    //concat Concatenate all script files into a single main.js
    concat = require('gulp-concat'),
    //deporder Ensure dependencies are loaded first This analyses comments at the top of each script to ensure correct ordering — such as // requires: defaults.js lib.js.
    deporder = require('gulp-deporder'),
    //terser Minimize code with the ES6-compatible 
    terser = require('gulp-terser'),
    // development mode?
    devBuild = (process.env.NODE_ENV !== 'production'),
    //stripdebug only loaded in development mode for efficiency. Remove all console and debugging statements when running in production mode.
    stripdebug = devBuild ? null : require('gulp-strip-debug'),
    //sourcemap only loaded in development mode for efficiency. Append a source map when running in development mode
    sourcemaps = devBuild ? require('gulp-sourcemaps') : null,
    //sass compiles Sass .scss files to a single .css We’ll presume your primary Sass file scss/main.scss is responsible for loading all partials.
    sass = require('gulp-sass'),
    //postcss PostCSS requires its own set of plugins
    postcss = require('gulp-postcss'),
    //assets this allows us to use properties such as background: resolve('image.png'); to resolve file paths or background: inline('image.png'); to inline data-encoded images
    assets = require('postcss-assets'),
    //autoprefixer automatically add vendor prefixes to CSS properties.
    autoprefixer = require('autoprefixer'),
    //mqpacker pack multiple references to the same CSS media query into a single rule.
    mqpacker = require('css-mqpacker'),
    //cssnano minify the CSS code when running in production mode.
    cssnano = require('cssnano'),
    //size show change size
    size = require('gulp-size');
    // folders
    src = 'src/',
    build = 'build/'
    ;

// image processing
function images() {

    const out = build + 'images/';

    return gulp.src(src + 'images/**/*')
        .pipe(newer(out))
        .pipe(size())
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(size())
        .pipe(gulp.dest(out));
        
};
exports.images = images;

// HTML processing
function html() {
    const out = build + 'html/';

    return gulp.src(src + 'html/**/*')
        .pipe(newer(out))
        .pipe(devBuild ? noop() : htmlclean())
        .pipe(gulp.dest(out));
};
exports.html = gulp.series(images, html);

// JS processing
function js() {

    return gulp.src(src + 'js/**/*')
        .pipe(sourcemaps ? sourcemaps.init() : noop())
        .pipe(deporder())
        .pipe(concat('main.js'))
        .pipe(stripdebug ? stripdebug() : noop())
        .pipe(terser())
        .pipe(sourcemaps ? sourcemaps.write() : noop())
        .pipe(gulp.dest(build + 'js/'));

}
exports.js = js;

// CSS processing
//.on('error', sass.logError) ensures Sass outputs syntax errors to the console without stopping the Gulp task.
function css() {

    return gulp.src(src + 'scss/main.scss')
        .pipe(sourcemaps ? sourcemaps.init() : noop())
        .pipe(sass({
            outputStyle: 'nested',
            imagePath: '/images/',
            precision: 3,
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(postcss([
            assets({ loadPaths: ['images/'] }),
            //autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
            mqpacker,
            cssnano
        ]))
        .pipe(sourcemaps ? sourcemaps.write() : noop())
        .pipe(gulp.dest(build + 'css/'));

}
exports.css = gulp.series(images, css);

// run all tasks
exports.build = gulp.parallel(exports.html, exports.css, exports.js);

function watch(done) {

    // image changes
    gulp.watch(src + 'images/**/*', images);

    // html changes
    gulp.watch(src + 'html/**/*', html);

    // css changes
    gulp.watch(src + 'scss/**/*', css);

    // js changes
    gulp.watch(src + 'js/**/*', js);

    done();

}
exports.watch = watch;

//type "gulp" to monitor changes and execute needed tasks accordingly
exports.default = gulp.series(exports.build, exports.watch);