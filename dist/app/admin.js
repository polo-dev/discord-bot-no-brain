module.exports = {
    getMessage: function (message, client) {
        var splitMessage = message.content.split(" ");
        if (splitMessage[0].toLowerCase() === '/setnickname') {
            this.setNickname(message, splitMessage, client);
        }
    },
    setNickname: function (message, splitMessage, client) {
        splitMessage.splice(0, 1);
        var nickname = splitMessage.join(" ");
        if (message.guild) {
            message.guild.member(client.user).setNickname(nickname);
            console.log('new nickname : ' + nickname);
            message.channel.send('Mon nouveau pseudo : ' + nickname + ' !');
        }
        else {
            message.channel.send('Allez dans un channel !');
        }
    }
};
