exports.main =async  function(db,message,voiceText,createAudioPlayer,createAudioResource,AudioPlayerStatus,writeFileSync,getVoiceConnection,StreamType,joinVoiceChannel){
   const v = await db.get(`${message.guild.id}_joined`)
    if (!v) return
      console.log('[botlog]  voiceTextのBufferをしています。 対象メッセージ : ' + message.content)
      let txt = ""

      if (message.content.length > 200) return txt = `メッセージが${200 - message.content.length}超過しています。`
      else txt = message.content

      if (message.content.match(/[0-9]{18,18}/)) return txt.replace(/[0-9]{18,18}/,'絵文字ID')
      if (message.content.match(/w{4}/)) return txt.replace(/w{4}/,'笑')

     const buffer = await voiceText.fetchBuffer(txt, {
        format: 'wav'
      })

      await  console.log('[botlog]  Bufferが完了しました。 対象メッセージ : ' + message.content)
      await  writeFileSync('voice.wav', buffer)

//お客様をボイスチャンネルまで案内する

        const connection = joinVoiceChannel({
          guildId: message.guild.id,
          channelId: message.member.voice.channel.id,
          adapterCreator: message.guild.voiceAdapterCreator,
          selfMute: false,
        });
        const resource = createAudioResource("./voice.wav", { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();

        await player.play(resource);
        await connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => console.log('[botlog] メッセージを待機中'));

        player.on(AudioPlayerStatus.Playing, () => {
          console.log('[botlog] 再生中');
        });
        player.on('error', error => {
          console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
          message.react('😢')
        });
    }
