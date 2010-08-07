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
* placeholder

## 使い方

全ての機能は .meca() で適用されます。例えば画像のロールオーバーは以下のようにします。

    $('.btn').meca('hover', conf);

    $('.btn').meca('hover', { postfix: '_over' });

confにはハッシュで設定を渡します。全ての機能においてデフォルト値が設定されていので設定をしなくてもいい感じで動くようにはなっています。

### 画像のロールオーバー

画像にロールオーバーを設定します。

    .meca('hover', conf);

#### 設定

<table>
    <tr>
        <th>設定項目</th>
        <th>type</th>
        <th>デフォルト値</th>
        <th>説明</th>
    </tr>
    <tr>
        <td>postfix</td>
        <td>String</td>
        <td>\_o</td>
        <td>ロールオーバー時に画像名につく接尾語</td>
    </tr>
</table>

### 画像のactive

画像をクリックしたときに画像を切り替えます。

    .meca('hover', 'active');

#### 設定

<table>
    <tr>
        <th>設定項目</th>
        <th>type</th>
        <th>デフォルト値</th>
        <th>説明</th>
    </tr>
    <tr>
        <td>postfix</td>
        <td>String</td>
        <td>\_a</td>
        <td>クリック時に画像名につく接尾語</td>
    </tr>
    <tr>
        <td>hoverSelector</td>
        <td>String</td>
        <td>.btn</td>
        <td>ロールオーバーと併用するときのロールオーバーのセレクタ</td>
    </tr>
    <tr>
        <td>postfix</td>
        <td>hoverPostfix</td>
        <td>\_o</td>
        <td>ロールオーバーと併用するときのロールオーバーの接尾語</td>
    </tr>
</table>

### リンクを別ウィンドウで開く

    .meca('external');

### IE6で透過png

画像要素

    .meca('pngfix', conf);

背景画像

    .meca('bgpngfix', conf);

### 要素の高さ揃え

要素の高さを揃える

    .meca('heightAlign', conf);

### IE6でpositon:fixed

IE6でposition:fixedできるようにする

    .meca('positionFixed', conf);

### スムーズスクロール

スムーズスクロール対応

    .meca('smoothScroll', conf);

### OS判別クラスの付加

OSのクラスを負荷する

    .meca('addOsClass', conf);

### IEで画像のlabelをクリック

IEで画像にラベルを設定したときにラベルの機能を有効にする

    .meca('labelClickable', conf);

### placeholder

placeholderを再現する

    .meca('placeholder', conf);
