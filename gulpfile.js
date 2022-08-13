const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin"); //ИСПОЛЬЗУЙ ВЕРСИЮ 7!
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const spritesmith = require("gulp.spritesmith");
const webpack = require('webpack-stream');
const sync = require("browser-sync").create();

// JAVASCRIPT
const javascript = () => {
  return gulp.src('./source/js/app.js')
    .pipe(webpack({
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('./build/js/'))
    .pipe(sync.stream());
};

exports.javascript = javascript;

// STYLES
const styles = () => {
  return gulp.src("./source/sass/style.scss")
    .pipe(plumber()) // Отлов ошибок
    .pipe(sourcemap.init()) // Запускаем запись карты кода
    .pipe(sass().on('error', sass.logError)) // Перевод в CSS
    .pipe(postcss([autoprefixer()])) // Добавляем префиксы с помощью PostCSS
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))  // Добавляем карту кода
    .pipe(gulp.dest("./build/css"))
    .pipe(sync.stream()); // Перезагрузка браузера
}

exports.styles = styles;


//ОПТИМИЗАЦИЯ И ПЕРЕНОС ИЗОБРАЖЕНИЙ
const imageminProcess = () => {
  return gulp.src("./source/img-original/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('source/img'));
}

exports.images = imageminProcess;


// КОНВЕРТАЦИЯ В WEBP И ПЕРЕНОС
const webpProcess = () => {
  return gulp.src('./source/img-original/for-webp/**/*.{png,jpg}')
    // - ЕСЛИ КАЧЕСТВО ВАЖНЕЕ -
    //.pipe(webp({nearLossless: 75, lossless: true}))
    // - ЕСЛИ РАЗМЕР ВАЖНЕЕ -
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('./source/img'));
}

exports.webp = webpProcess;

//СОЗДАНИЕ png СПРАЙТА
const pngsprite = () => {
  return gulp.src('./source/img/sprite-png/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }))
  .pipe(gulp.dest('./source/img/sprite-png'));
}

exports.pngsprite = pngsprite;


// СОЗДАНИЕ svg СПРАЙТА
const svgsprite = () => {
  return gulp.src('./source/img/sprite-svg/icon-*.svg')
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest('source/img/sprite-svg'))
}

exports.svgsprite = svgsprite;


// ОПТИМИЗАЦИЯ png/jpg/svg, КОНВЕРТАЦИЯ В webp И СОЗДАНИЕ svg СПРАЙТА
exports.optimizeImages = gulp.series(
  imageminProcess, webpProcess, svgsprite
);

// Обновление html
const htmlreplace = () => {
  return gulp.src('./source/*.html')
    .pipe(gulp.dest("./build"))
    .pipe(sync.stream());
}

exports.htmlreplace = htmlreplace;


//DEL УДАЛЯЕМ СТАРУЮ ПАПКУ BUILD
const clean = () => {
  return del("./build")
}

exports.clean = clean;


//COPY КОПИРУЕМ ВСЕ В BUILD
const copy = () => {
  return gulp.src([
    "./source/fonts/**/*.{woff,woff2}",
    "./source/img/**",
    "./source/*.ico",
    "./source/js/additinal/*.js",
    "./source/js/*.json",
    "./source/*.html"
  ], {
    base: "./source"
  })
  .pipe(gulp.dest("./build"))
}

exports.copy = copy;


// SERVER
const server = (done) => {
  sync.init({
    server: {
      baseDir: './build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// WATCHER
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", gulp.series("htmlreplace"));
  gulp.watch("source/js/**/*.js").on("change", gulp.series("javascript"));
}

exports.build = gulp.series(
  clean, copy, styles, javascript
);

// NPM RUN GULP
exports.start = gulp.series(
  clean, copy, styles, javascript, server, watcher
);