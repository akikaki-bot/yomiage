const http = require('http');
http.createServer(function (req, res) {
  res.end();
}).listen(8080);
const {
  Discord,
  MessageEmbed,
  Client,
  Intents
} = require('discord.js')
const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  StreamType,
  getVoiceConnection,
  AudioPlayerStatus
} = require("@discordjs/voice");
const option = {
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]
}
const Database = require("@replit/database")
const db = new Database()
const client = new Client(option)
const {
  VoiceText
} = require('voice-text')
const {
  writeFileSync
} = require('fs');
//=============== main =====================
const { main } = require('./lib/main.js')
const { on } = require('./commands/on.js');
const { ion } = require('./commands/ion.js')
const { off } = require('./commands/off.js')
const { ioff } = require('./commands/ioff.js') 
//==========================================
client.on('ready', async () => {
  console.log('Google Teacher v1.0')
  const { generateDependencyReport } = require('@discordjs/voice');

//==============slashcommand================
 const serverid = "Your server id"
//==========================================
  console.log(generateDependencyReport());
      const data = [
        {
        name: "on",
        description: "TSSをオンにします。",
        },
        {
          name: "off",
          description: "TTSをオフにします。"
        }
    ];
    await client.application.commands.set(data, serverid);
})
client.on('messageCreate', async message => {
  //=================MessageEvent=======================

  if (message.author.bot || message.channel.type === "dm") return;

  //=================VoiceTextApi=======================

  const voiceText = new VoiceText(process.env.key);

  //=================Main handler=======================

  main(db,message,voiceText,createAudioPlayer,createAudioResource,AudioPlayerStatus,writeFileSync,getVoiceConnection,StreamType,joinVoiceChannel)

  //=================commandhandler=====================

  //=================on=================================

  if (message.content === ":on") {
  on(db,message,joinVoiceChannel,MessageEmbed)
  }

  //=================off================================

  if (message.content === ":off") {
    off(db,message,MessageEmbed)
  }

  //help================================================

  if(message.content === ":help"){
    const embed = new MessageEmbed().setTitle('TTSボット').setDescription(':help\n:join\n:off')
    message.channel.send({ embeds: [embed]})
  }
})

//interaction===========================================
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) {
        return;
    }
  //=================on=================================

  if (interaction.commandName === "on") {
    ion(db,interaction,joinVoiceChannel,MessageEmbed)
  }

  //=================off================================

  if (interaction.commandName === "off") {
        ioff(db,interaction,MessageEmbed)
  }
})
client.login(process.env.token)
