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
yarn add styled-css
yarn add styled-components
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



