# web-english-training

## 環境構築


### Next.js + Typescript

以下は初期の環境構築
```
yarn create react-app --ts .
```

初回のgit cloneでは以下を実行する
```
yarn install
```


### パッケージ
```
yarn add styled-components
yarn add papaparse
yarn add @types/papaparse -D
yarn add dotenv
yarn add @tanstack/react-query@4
```

## firebase

### 環境設定
これをしたら上でインストールしたパッケージが消えた。  
先にこっちをやった方がいいかも
```
yarn add firebase
```

firebaseにログイン
```
firebase login
```
その後の処理がうまくいかないときはログインしなおす
```
firebase login --reauth
```

firebaseの設定等
```
firebase init
```

### firestore

参考ページ
* 初期設定は以下のいずれのリンクにも記載あり
* [データの追加](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja)
* [データの取得](https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja#web_2)




## Next.js

### 設定等

`next.config.ts`に以下を追記
```
output: 'export',
reactStrictMode: true,
compiler: {
  styledComponents: true,
},
```
これによりstyledComponentsの使用、`yarn build`したときに`out`フォルダに実行物が出力ができるようになる。


## firestore

### historyコレクション
* history (親collection)
  * ユーザごとのdocument
    * 問題集名のcollection
      * 各問題番号: [解いた回数, ミス数]

