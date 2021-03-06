const unirest = require('unirest');



module.exports = {

  getMessage: function (message: any)
  {
    var splitMessage = message.content.toLowerCase().split(" ");

    if(splitMessage[0] === '/love')
    {
      this.getLove(message, splitMessage);
    }
  },
  getLove: async function (message: any, splitMessage: any)
  {
    if(splitMessage[1] != null && splitMessage[2] != null && splitMessage[2].length > 1) {
      unirest.get("https://love-calculator.p.mashape.com/getPercentage?fname="+ splitMessage[1]+"&sname="+ splitMessage[2])
      .header("X-Mashape-Key", "fxIESVbeZTmshvpXwY2vK1WXyIiVp1CPiSFjsn7GtGq5Dh5uWj")
      .header("Accept", "application/json")
      .end(function (result) {
        console.log(result.status, result.headers, result.body);
        if(result.status == 200) {
          var heart = '';
          var pourcentage = result.body.percentage;
          switch(true) {
              case (pourcentage < 50):
                heart = ' :broken_heart: ';
                break;
              case (pourcentage >= 50 && pourcentage < 75):
                heart = ' :heart: ';
                break;
              case (pourcentage >= 75):
                heart = ' :heartpulse: ';
                break;
          }
          message.reply(heart + pourcentage + " pourcentage, entre " + splitMessage[1] + " et "
          + splitMessage[2] + " : " + result.body.result + heart);
        } else {
          message.reply("Désolé une erreur est survenue :/");
        }

      });
    } else {
      message.reply("Il me faut 2 noms :s ");
    }

  }

}
