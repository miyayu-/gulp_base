gulp_base
=========

最近お気に入りのgulpfileをいれたよ。

## 入ってるプラグインメモ

### gulp-ruby-sass
gulpでsassが使えるようになるよ。

### gulp-autoprefixer
gulpでベンダープレフィックスが自動で付くようになるよ。

### gulp-plumber
エラーが出てもwatchが止まらないよ。

#### 例：上記三つの組み合わせ

```rb
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
```

### gulp.spritesmith
スプライト画像が簡単に作れるようになるよ。

#### 例：スプライトのタスク

```rb
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
```

メモ
http://ameblo.jp/ca-1pixel/entry-11925409995.html
