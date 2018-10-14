const jsonfile = require('jsonfile');
const file = 'dist/data/wtf.json';
var request = require('request');

module.exports = {
  getMessage: function (message: any, client: any)
  {
    var data = jsonfile.readFileSync(file)
    var splitMessage = message.content.split(" ")
    var msg = message.content.toLowerCase()

    if (message.content === 'ping')
    {
      message.channel.send('pong');
    }
    else if (message.content === 'what is my avatar')
    {
      // Send the user's avatar URL
      message.reply(message.author.avatarURL);
    }
    else if(msg.includes('gay'))
    {
      this.getGay(message);
    }
    if (msg.includes('inspirobot'))
    {
      this.getInspiroBotQuote(message);
    }
    if(splitMessage[0].toLowerCase() === '/avatar') {
      const User = client.fetchUser(splitMessage[1])
      User.then((u) => {
          message.channel.send(u.avatarURL)
      }).catch((e) => {
        console.error
        message.channel.send('oups, j\'ai pas trouvé :/')
      });
    } else if (splitMessage[0].toLowerCase() === '/horoscope') {
      this.getHoroscope(message, splitMessage[1]);
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
  addName: function (message: any, name: string, data: any, splitMessage: any)
  {
    if(!data.hasOwnProperty(name)) {
      splitMessage.splice(0, 2)
      data.name.push(name.toLowerCase())
      data[name.toLowerCase()] = []
      jsonfile.writeFile(file, data, {spaces: 4}, function (err: any) {
        if(err)
          console.error(err)
        else
          console.log(name + " ajouté ;) ")
          message.channel.send(name + " ajouté ;)")
      })
    } else {
      message.channel.send("Il existe déjà votre " + name + " :'( ")
    }
  },
  addMessageName: function (message: any, name: string, data: any, splitMessage: any)
  {
    splitMessage.splice(0, 2)
    data[name].push(splitMessage.join(" "))
    console.log('string ajouté: ' + splitMessage.join(" "))
    jsonfile.writeFile(file, data, {spaces: 4}, function (err: any) {
      if(err)
        console.error(err)
      else
        message.channel.send("Message ajouté ;)")
    })
  },
  getMessageName: function (message: any, name: string, data: any)
  {
    var arrayStrings = data[name]
    var random = Math.floor(Math.random() * arrayStrings.length)
    console.log("get message : " + arrayStrings[random])
    message.channel.send(arrayStrings[random])
  },
  getInspiroBotQuote: function (message: any)
  {
    request('http://inspirobot.me/api?generate=true', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        message.channel.send(body);
      }
      else {
        message.channel.send('Une erreur est survenue :/');
      }
    });
  },
  getHoroscope: function (message: any, sign: string)
  {  
    sign = sign.toLowerCase();
    let translation = {
      'bélier': 'aries',
      'taureau': 'taurus',
      'gémeaux': 'gemini',
      'cancer': 'cancer',
      'lion': 'leo',
      'vierge': 'virgo',
      'balance': 'libra',
      'scorpion': 'scorpio',
      'sagittaire': 'sagittarius',
      'capricorne': 'capricorn',
      'verseau': 'aquarius',
      'poisson': 'pisces',
    }

    let options = {
      url: 'https://aztro.sameerkumar.website/?sign=' + translation[sign] + '&day=today',
      method: 'POST'
    };

    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
    }

    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        body = JSON.parse(body);
        message.channel.send(body.description);
        message.channel.send('Compatible avec: ' + getKeyByValue(translation, body.compatibility.toLowerCase()));
        message.channel.send('Hummeur: ' + body.mood);
        message.channel.send('Couleur: ' + body.color);
        message.channel.send('Nombre porte bonheur: ' + body.lucky_number);
        message.channel.send('Heure de chance: ' + body.lucky_time);
      } else {
        message.channel.send('Une erreur est survenue :/');
        console.log(error);
      }
    }
      request(options, callback);
  }
}
