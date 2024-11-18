# webpro_06

## このプログラムについて

## ファイル一覧
ファイル名　|　説明
-|-
app.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんのテンプレートファイル

```javascript
console.log('Hello');
```

## 使い方
1. app5.jsを起動する
1. Webブラウザでlocalhost8080/public/janken.htmlにアクセスする
1. 自分の手を入力する

```mermaid
flowchart TD;
start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> if
if -->|yes| win
win --> end1
if -->|no| loose
loose --> end1
```
