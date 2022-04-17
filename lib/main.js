exports.main =async  function(db,message,voiceText,createAudioPlayer,createAudioResource,AudioPlayerStatus,writeFileSync,getVoiceConnection,StreamType,joinVoiceChannel,dic){
  if(!message.member.voice.channel) return
   const v = await db.get(`${message.guild.id}_joined`)
    if (!v) return
   
      console.log(`LOG : [${message.author.username} が発言した 「${message.content}」 ] をBufferしています。`)
      let txt = ""

      if (message.content.length > 200) txt = txt.slice(0,190)+"いかりゃく"
      else txt = message.content
      if(!txt) return;
      let w = new RegExp('w{4}/g/i/m');
      let url = new RegExp("")
      
       txt = await txt.replaceAll(/w/g,'わら')
       txt = await txt.replaceAll(/[0-9]{18}/g,'ID')
       txt = await txt.replaceAll(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g,'URL')
       txt = await txt.replaceAll(/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,'URL')

  //===============WORD DICTIONARY=============================

  const saved_dic = await dic.get(`${message.guild.id}_words`)
  const saved_speak = await dic.get(`${message.guild.id}_speak`)

  let it
  if(saved_dic){
    saved_dic.forEach(d => {
      it += 1
    })

    for(let i = 0; i<saved_dic.length; i++){
      console.log(`LOG : ユーザー辞書 [変換] / ${saved_dic[i]} => ${saved_speak[i]}`)
      txt = await txt.replaceAll(saved_dic[i],saved_speak[i])
    }
  }
  
  //===========================================================
      

     const buffer = await voiceText.fetchBuffer(txt, {
        format: 'wav'
      })

      await  console.log(`LOG : [${message.author.username} が発言した 「${message.content}」 ] のBufferが完了しました。`)
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

        player.on(AudioPlayerStatus.Idle, () => console.log('LOG : すたんばいざめっせーじ'));

        player.on(AudioPlayerStatus.Playing, () => {
          console.log('LOG : TTSしてます');
        });
        player.on('error', error => {
          console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
          message.react('😢')
        });
    }
