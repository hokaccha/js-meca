# meca.js

HTML/CSSのコーディングをするときに便利な機能を色々詰め込んだjQuery Plugin。

## 機能

* 画像ロールオーバー
* 画像のactive
* リンクを別ウィンドウで開く
* IE6で透過png
* 要素の高さ揃え
* IE6でpositon:fixed
* スムーズスクロール
* OS判別クラスの付加
* IEで画像のlabelをクリック

## 使い方

全ての機能は .meca() で適用されます。例えば画像のロールオーバーは以下のようにします。

    $('.btn').meca('hover', conf);

confにはハッシュで設定を渡します。全ての機能においてデフォルト値が設定されていので設定をしなくてもいい感じで動くようにはなっています。

### 画像のロールオーバー

画像にロールオーバーを設定します。

    .meca('hover', conf);

    .meca('hover', { postfix: '_over' });

#### 設定

##### postfix

default '\_o'
