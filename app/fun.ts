const jsonfile = require('jsonfile');
const file = 'dist/data/wtf.json';

module.exports = {
  getMessage: function (message: any)
  {
    var data = jsonfile.readFileSync(file);
    var splitMessage = message.content.split(" ");

    var msg = message.content.toLowerCase();

    if(msg.includes('gay'))
    {
      this.getGay(message);
    }
    if (splitMessage[0] === "/add")
    {
      for (var i = 0; i < data.name.length; i++)
      {
        if (splitMessage[1] === data.name[i])
        {
          this.addMessageName(message, data.name[i], data, splitMessage);
        }
      }
    }
    else
    {
      for (var i = 0; i < data.name.length; i++)
      {
        if (msg.includes(data.name[i]))
        {
          this.getMessageName(message, data.name[i], data);
        }
      }
    }
  },
  getGay: function (message: any)
  {
    let random = Math.floor(Math.random() * 100) + 1;
    console.log("getGey function score : " + random);
    if(random === 50)
    {
      message.reply("DING DING DING !!! Mais c'est beaucoup trop gay");
    }
    else
    {
      if(random > 50)
      {
         message.reply("Oui, c'est totalement gay ! ");
      }
      else
      {
        message.reply("Non, c'est pas trop gay ! ");
      }
    }
  },
  addMessageName: function (message: any, name: string, data: any, splitMessage: any)
  {
    splitMessage.splice(0, 2);
    data[name].push(splitMessage.join(" "));
    console.log('string ajouté: ' + splitMessage.join(" "));
    jsonfile.writeFile(file, data, {space: 4}, function (err: any) {
      if(err)
        console.error(err)
      else
        message.channel.send("Message ajouté ;)");
    })
  },
  getMessageName: function (message: any, name: string, data: any)
  {
    var arrayStrings = data[name];
    console.log(arrayStrings);
    var random = Math.floor(Math.random() * arrayStrings.length);
    message.channel.send(arrayStrings[random]);
  }
}
