const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const pr0gramm = require('./pr0gramm.js');
const fun = require('./fun.js');
const apiE621 = require('./e621.js');
const love = require('./love.js');
const server = require('../server/Api.js');
client.on('ready', () => {
    console.log('I am ready!');
});
// Create an event listener for messages
client.on('message', (message) => {
    // If the message is "ping"
    if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('pong');
    }
    if (message.content === 'what is my avatar') {
        // Send the user's avatar URL
        message.reply(message.author.avatarURL);
    }
    if (message.author.id !== '306474787180511233') {
        fun.getMessage(message);
        pr0gramm.getMessage(message);
        apiE621.getMessage(message);
        love.getMessage(message);
        server.getMessage(message);
        getHelp(message);
    }
});
// Create a new webhook
//const hook = new Discord.WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);
// Send a message using the webhook
//hook.send('I am now alive!');
client.login(process.env.TOKEN);
function getHelp(message) {
    if (message.content === '/help') {
        var help = "```Pr0 <tag> : image de pr0gramm\n";
        help += "Pr0-vid <tag> : mp4 de pr0gramm\n";
        help += "Pr0-all <tag> : image ou mp4 de pr0gramm\n";
        help += "Gay : Parce que vous voulez savoir si c'est gay\n";
        help += "/furry <tag> : deviner ?\n";
        help += "\n";
        help += "/addName <name> : ajoute un mot Clé\n";
        help += "/addM <name> <sentence> : ajoute une phrase à votre mot clé ;)\n";
        help += "<name> : utilisez votre mot clé !\n";
        help += "/love <name1> <name2> : calculateur d'amour ! <3\n";
        help += "```";
        message.channel.send(help);
    }
}
