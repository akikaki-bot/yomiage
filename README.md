# 読み上げさん
読み上げボットです。

動作要件
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
## うごかす
※それぞれVoicetextのAPIキーを取得しておいて環境変数keyで保存しておく

※同じくbotTokenも環境変数tokenで保存しておく

cloneする
```
git clone https://github.com/akikaki-bot/yomiage
```

npm installする
```
npm install
```

実行する
```
npx node index.js
```

Replitで動かすなら.replitファイルを作成して

```
- .replit
run = "npx node index.js
```
でRun

## 注意
・このAPIで作成した音声はYoutube等で使用、公開することは利用規約により禁止されていますのでご遠慮ください。

[VoiceText公式](https://cloud.voicetext.jp/webapi)



