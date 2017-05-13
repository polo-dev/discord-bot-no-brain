const jsonfile = require('jsonfile');
const file = 'dist/data/wtf.json';
module.exports = {
    getMessage: function (message) {
        var data = jsonfile.readFileSync(file);
        var splitMessage = message.content.split(" ");
        var msg = message.content.toLowerCase();
        if (message.author.id !== '306474787180511233') {
            if (msg.includes('gay')) {
                this.getGay(message);
            }
            if (splitMessage[0] === "/add") {
                for (var i = 0; i < data.name.length; i++) {
                    if (splitMessage[1] === data.name[i]) {
                        this.addMessageName(message, data.name[i], data, splitMessage);
                    }
                }
            }
            else {
                for (var i = 0; i < data.name.length; i++) {
                    if (msg.includes(data.name[i])) {
                        this.getMessageName(message, data.name[i], data);
                    }
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
    addMessageName: function (message, name, data, splitMessage) {
        splitMessage.splice(0, 2);
        data[name].push(splitMessage.join(" "));
        console.log('string ajouté: ' + splitMessage.join(" "));
        jsonfile.writeFile(file, data, { space: 4 }, function (err) {
            if (err)
                console.error(err);
            else
                message.channel.send("Message ajouté ;)");
        });
    },
    getMessageName: function (message, name, data) {
        var arrayStrings = data[name];
        var random = Math.floor(Math.random() * arrayStrings.length);
        message.channel.send(arrayStrings[random]);
    }
};
