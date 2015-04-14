gulp_base
=========




最近お気に入りのgulpfileをいれたよ。

## 入ってるプラグインメモ

### gulp-ruby-sass
gulpでsassが使えるようになるよ。

### gulp-pleeease
ベンダープレフィックスとCSSが圧縮できるよ。autoprefixerより便利だよ

### gulp-plumber
エラーが出てもwatchが止まらないよ。

### gulp-changed
変更されたファイルのみ更新されるよ。

### gulp-imagemin
画像を圧縮してくれるよ。

### gulp-uglify
jsを圧縮してくれるよ。

### gulp-ejs
ejsファイルを使ってテンプレートが扱えるよ。

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

github更新方法  
git commit -a -m"コメントを入れる"  
git push  


## 更新履歴
2015/03/12 gulpfile.jsとpackage.jsonを最新に更新
test
