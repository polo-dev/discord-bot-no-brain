const jsonfile = require('jsonfile');
const file = 'dist/data/wtf.json';
module.exports = {
    getMessage: function (message) {
        var msg = message.content.toLowerCase();
        if (message.author.id !== '306474787180511233') {
            if (msg.includes('gay')) {
                this.getGay(message);
            }
            if (msg.substring(0, 4) === "add ") {
                this.addPaul(message);
            }
            if (msg.includes('paul')) {
                this.getPaul(message);
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
    addPaul: function (message) {
        var data = jsonfile.readFileSync(file);
        let string = message.content.substring(4);
        data['wtf'].push(string);
        console.log(data.wtf);
        jsonfile.writeFile(file, data, { space: 4 }, function (err) {
            if (err)
                console.error(err);
        });
    },
    getPaul: function (message) {
        var data = jsonfile.readFileSync(file);
        var random = Math.floor(Math.random() * data.wtf.length);
        console.log(data.wtf[random]);
        message.channel.send(data.wtf[random]);
    }
};
