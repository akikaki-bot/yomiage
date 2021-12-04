# 読み上げさん
読み上げボットです。

## 動作要件
```
discord.js v13
voice-text 0.1.2
@discordjs/
           opus  0.7.0
           voice 0.7.5
@replit/database 2.0.1
ffmpeg 0.0.4
ffmpeg-static 4.4.0
libsodium-wrappers 0.7.9
```
## Windows環境 de うごかす
まだ方法は思いついてないですが書き換えるところだけ書いておきます。

```
> index.js
line 23~24
line 70 (db削除のみ)
line 77 83 102 108

> lib/main.js
line 1 (db削除のみ)
line 2

> commands/allfile
 >>on.js
 >>ion.js
 >>off.js
 >>ioff.js
すべてdb削除＆改良
```

## Replit de うごかす
※この読み上げさんはReplitDatabaseを使用しています。

※Replit環境でないと動かない場合があります。

※それぞれVoicetextのAPIキーを取得しておいて環境変数keyで保存しておく

※同じくbotTokenも環境変数tokenで保存しておく

**このリポジトリをフォークしておく。**

**Replitを開いてgithubの欄からこれをクリックする。**

そうすると勝手にcloneが始まります

.replitファイルを作成して
```
run = "npx node index.js
```
と中に書いておく

そしてRun

適当にメッセージを送信してvoice.wavが生成され再生されたらおｋ

## スラッシュコマンド登録
index.jsの`Client.on('Ready', () => {..})`のところに
```
//==============slashcommand================
 const serverid = "Your server id"
//==========================================
```

というところがあるので"Your server id"を変えて登録してください

## 注意
・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。

All thx for [VoiceTextAPI](https://cloud.voicetext.jp/webapi)





