# Readme for Test Projects

## Firebaseプロジェクトの作製

- プロジェクトを新規に作成する
- Firebase CLIで`firebase use <ID of project>`.
- `.firebaserc`の`default`を先程のプロジェクトに変更.
- `static/js/firebase.js`の`config`を書き換える

### 認証

#### twitter
- 新しいプロジェクトを作製
  - `Enable 3-legged OAuth`
  - API keyとAPI secretをメモる
  - callbackをfirebaseプロジェクトに

#### firebase
- `Authentication` -> `Sign-in method`をTwitterのみにする
  - TwitterのAPIキーとかを登録
- 同ページの`Authorized domains`をいい感じにする
  - `localhost` / `skbctf.firebaseapp.com` / `skbctf.web.app` / `<host domain>`

### Webappの登録
- プロジェクトoverviewから登録
- `config`をメモっておく

## MicroCMSの設定
- 新しいMicroCMSプロジェクトを立ち上げる
- `functions/src/index.ts`におけるMicroCMSのURLを書き換える
- `.env`の2つの値を書き換え

## Functionsの設定
- configのアップロード
  - `firebase functions:config:set microcms.apikey="<microcms api key>"`
- `firebase deploy --only functions`

## Firestoreの設定
- import元プロジェクトのCloudStorageにexport
- import先プロジェクトに該当bucketの権限をいい感じに付与
- import
- ルールをデプロイ

