
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'), /* sassを入れる */
	autoprefixer = require('gulp-autoprefixer'), /* ベンダープレフィックスが自動でつく */
	plumber = require('gulp-plumber'), /* エラーが出てもwatchを止めない */
	spritesmith = require('gulp.spritesmith'), /* CSSスプライトを作成する */
  hologram = require('gulp-hologram'), /* スタイルガイド */
  cached = require('gulp-cached'); /* 変更があったファイルだけに処理を行う */

gulp.task('sass', function() {
	gulp.src('sass/*scss')
		.pipe(plumber())
		.pipe(sass({
			style: 'expanded',
			noCache: true
		}))
		.on('error', function (err) { console.log(err.message); })
		.pipe(autoprefixer("last 2 version", "ie 9", "Android 2.3"))
		.pipe(gulp.dest('css'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('_sprite/*.png') //スプライトにする画像
  .pipe(spritesmith({
    imgName: 'sprite.png', //スプライトの画像
    cssName: '_sprite.scss', //生成されるscss
    imgPath: '../img/sprite.png', //生成されるscssに記載されるパス
    cssFormat: 'scss', //フォーマット
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name; //VarMap(生成されるScssにいろいろな変数の一覧を生成)
    }
  }));
  spriteData.img.pipe(gulp.dest('img/')); //imgNameで指定したスプライト画像の保存先
  spriteData.css.pipe(gulp.dest('sass/')); //cssNameで指定したcssの保存先
});

// hologramのタスク
gulp.task('hologram', function() {
  return gulp.src('hologram_config.yml')
    .pipe(hologram());
});

gulp.task("default", function() {
    gulp.watch("sass/*.scss",["sass"]);
    gulp.watch("_guide/*.css",["hologram"]);
});

gulp.task("css-sprite", function() {
    gulp.run('sprite');
});
