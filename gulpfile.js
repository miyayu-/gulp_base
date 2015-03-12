
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'), /* sassを入れる */
  plumber = require('gulp-plumber'), /* エラーが出てもwatchを止めない */
  spritesmith = require('gulp.spritesmith'), /* CSSスプライトを作成する */
  changed = require('gulp-changed'), /* 変更されたファイルのみ処理する */
  cache   = require('gulp-cached'), /* 変更されたscssファイルのみ処理する */
  imagemin = require('gulp-imagemin'), /* 画像圧縮 */
  uglify = require('gulp-uglify'), /* JS圧縮 */
  ejs = require('gulp-ejs'), /* テンプレートを作る */
  pleeease = require('gulp-pleeease'); /* 圧縮やベンダープレフィックスをつける */

//scss sass→css
gulp.task('sass', function() {
    return sass('./app/sass', {
      style: 'expanded',
      noCache: true
    })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(plumber())
    .pipe(changed('./dist/css'))
    .pipe(pleeease({
        autoprefixer: {"browsers": ["last 4 versions", 'ie 8', "Android 2.3"]},  // ベンダープレフィックス対応バージョンの指定
        minifier: false //圧縮の有無 true/false
    }))
    .pipe(gulp.dest('dist/css'));
});

//スプライト画像を生成 scssはsassフォルダに スプライト画像はdistへ
gulp.task('sprite', function () {
  var spriteData = gulp.src('./app/_sprite/*.png') //スプライトにする画像
  .pipe(spritesmith({
    imgName: 'gnav_sprite.png', //スプライトの画像
    cssName: '_sprite.scss', //生成されるscss
    imgPath: './dist/img/gnav_sprite.png', //生成されるscssに記載されるパス
    cssFormat: 'scss', //フォーマット
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
  }));
  spriteData.img.pipe(gulp.dest('./dist/cmn/img/')); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('./app/sass/')); //cssNameで指定したcssの保存先
});

// 画像圧縮のタスク app→dist
gulp.task('img', function() {
 var imageminOptions = {
    optimizationLevel: 7
  };
  gulp.src('app/img/**/*.+(jpg|png|gif)')  // imgフォルダの画像を取得
    .pipe(changed('./dist/img'))
    .pipe(imagemin(imageminOptions))   // 画像の圧縮処理を実行
    .pipe(gulp.dest('./dist/img')); // 左記フォルダー以下に保存
});

// 完成後 jsを圧縮するタスク app→dist
gulp.task('js', function() {
    gulp.src(['app/js/**/*.js','!js/min/**/*.js'])
        .pipe(changed('./dist/js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// 作業関係で必要なファイルを複製するタスク　使わなさそう
gulp.task('copy', function() {
    return gulp.src(
        ['./app/js/*.js'],
        {base: 'app'}
    )
    .pipe(gulp.dest('./dist') );
} );

// ejsを使用したテンプレートのタスク
gulp.task('ejs', function () {
gulp.src(["./app/**/*.ejs","!./app/template/*.ejs"])
    .pipe(ejs())
    .pipe(gulp.dest("./dist"));
});

// 監視ファイル scss,ejs,js
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.ejs'], ['ejs']);
  gulp.watch(['./app/sass/*.scss'], ['sass']);
  gulp.watch(['./app/js/*.js'], ['js']);
});

gulp.task('default', ['watch']);