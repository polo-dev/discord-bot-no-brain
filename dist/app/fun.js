const jsonfile = require('jsonfile');
const file = 'dist/data/wtf.json';
module.exports = {
    getMessage: function (message, client) {
        var data = jsonfile.readFileSync(file);
        var splitMessage = message.content.split(" ");
        var msg = message.content.toLowerCase();
        if (message.content === 'ping') {
            message.channel.send('pong');
        }
        else if (message.content === 'what is my avatar') {
            // Send the user's avatar URL
            message.reply(message.author.avatarURL);
        }
        else if (msg.includes('gay')) {
            this.getGay(message);
        }
        if (splitMessage[0].toLowerCase() === '/avatar') {
            const User = client.fetchUser(splitMessage[1]);
            User.then((u) => {
                message.channel.send(u.avatarURL);
            }).catch((e) => {
                console.error;
                message.channel.send('oups, j\'ai pas trouvé :/');
            });
        }
    },
    getGay: function (message) {
        let random = Math.floor(Math.random() * 100) + 1;
        console.log("getGey function score : " + random);
        if (random === 50) {
            message.reply("DING DING DING !!! Mais c'est beaucoup trop gay");
        }
        else {
            if (random > 50) {
                message.reply("Oui, c'est totalement gay ! ");
            }
            else {
                message.reply("Non, c'est pas trop gay ! ");
            }
        }
    },
    addName: function (message, name, data, splitMessage) {
        if (!data.hasOwnProperty(name)) {
            splitMessage.splice(0, 2);
            data.name.push(name.toLowerCase());
            data[name.toLowerCase()] = [];
            jsonfile.writeFile(file, data, { spaces: 4 }, function (err) {
                if (err)
                    console.error(err);
                else
                    console.log(name + " ajouté ;) ");
                message.channel.send(name + " ajouté ;)");
            });
        }
        else {
            message.channel.send("Il existe déjà votre " + name + " :'( ");
        }
    },
    addMessageName: function (message, name, data, splitMessage) {
        splitMessage.splice(0, 2);
        data[name].push(splitMessage.join(" "));
        console.log('string ajouté: ' + splitMessage.join(" "));
        jsonfile.writeFile(file, data, { spaces: 4 }, function (err) {
            if (err)
                console.error(err);
            else
                message.channel.send("Message ajouté ;)");
        });
    },
    getMessageName: function (message, name, data) {
        var arrayStrings = data[name];
        var random = Math.floor(Math.random() * arrayStrings.length);
        console.log("get message : " + arrayStrings[random]);
        message.channel.send(arrayStrings[random]);
    }
};
