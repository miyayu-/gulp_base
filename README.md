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

#### 上記三つの組み合わせ

```
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


