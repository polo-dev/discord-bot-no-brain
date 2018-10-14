const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const pr0gramm =  require('./pr0gramm.js');
const fun =  require('./fun.js');
const apiE621 = require('./e621.js');
const love = require('./love.js');
const admin = require('./admin.js');
const server = require('../server/Api.js');
// const bot = require("discord-music-bot");
exports.Client = client;

// music
var textChannelName = "test";
var voiceChannelName = "General";
var aliasesFile = "/files";
var botToken = process.env.TOKEN;
/*** **/



client.on('ready', () => {
  console.log('I am ready!');
  var guild = (client.guilds.find('id', '179693296447258625'));
  var serverName = guild.name; 
  var voiceChannelName = guild.channels.find('id', '179693297319542785').name;
  console.log(voiceChannelName);
  // bot.run(serverName, textChannelName, voiceChannelName, aliasesFile, process.env.TOKEN);
  // bot.setYoutubeKey(process.env.YOUTUBE_KEY);
});

// Create an event listener for messages
client.on('message', (message: any) => {
  if (message.author.bot) return;
  //if (!message.content.startsWith('.')) return;

    if(message.author.id === '179694444168085507')
    {
      admin.getMessage(message, client);
    }

  //if(message.author.id !== '306474787180511233') {
    //sfw
    fun.getMessage(message, client);
    pr0gramm.getMessage(message);
    love.getMessage(message);
    server.getMessage(message);
    getHelp(message);

    //nsfw
    if(message.channel.nsfw) {
      apiE621.getMessage(message);
    }
  //}
});

// Create a new webhook
//const hook = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

// Send a message using the webhook
//hook.send('I am now alive!');

client.login(process.env.TOKEN);

function getHelp(message: any)
{
  if(message.content === '/help')
  {
    var help = "```Pr0 <tag> : Image de pr0gramm\n"
    help += "Pr0-vid <tag> : mp4 de pr0gramm\n"
    help += "Pr0-all <tag> : Image ou mp4 de pr0gramm\n"
    help += "inspirobot : C'est bien de s'inspirer parfois\n"
    help += "Gay : Parce que vous voulez savoir si c'est gay\n"
    help += "/furry <tag> : Deviner ?\n"
    help += "/horoscope <signe> : Obtenir son horoscope du jour!\n"
    help += "\n"
    help += "/addKey <name> : Ajoute un mot Clé\n"
    help += "/addM <name> <sentence> : Ajoute une phrase à votre mot clé ;)\n"
    help += "<name> : Utilisez votre mot clé !\n"
    help += "/love <name1> <name2> : Calculateur d'amour ! <3\n"
    help += "```"
    message.channel.send(help)
  }
}
