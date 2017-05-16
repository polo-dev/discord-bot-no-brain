const jsonfile = require('jsonfile');
const file = 'dist/data/wtf.json';
module.exports = {
    getMessage: function (message) {
        var data = jsonfile.readFileSync(file);
        var splitMessage = message.content.split(" ");
        var msg = message.content.toLowerCase();
        if (msg.includes('gay')) {
            this.getGay(message);
        }
        if (splitMessage[0] === "/addM") {
            for (var i = 0; i < data.name.length; i++) {
                if (splitMessage[1].toLowerCase() === data.name[i]) {
                    this.addMessageName(message, data.name[i], data, splitMessage);
                }
            }
        }
        else if (splitMessage[0] === "/addName") {
            if (splitMessage[1].length < 25)
                this.addName(message, splitMessage[1], data, splitMessage);
            else
                message.reply("Le nom est trop long ! (CMB)");
        }
        else {
            for (var i = 0; i < data.name.length; i++) {
                if (msg.includes(data.name[i])) {
                    this.getMessageName(message, data.name[i], data);
                }
            }
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
