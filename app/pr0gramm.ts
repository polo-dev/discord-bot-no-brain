const pr0 = require('pr0gramm-api');
require('dotenv').config()

const api = pr0.Pr0grammAPI.createWithCookies();
async function main() {

    let loginResponse = await api.user.login(process.env.Pr0_NAME, process.env.Pr0_PWD);
    if(!loginResponse.success) {
        console.log("Could not log in :(");
        if(loginResponse.ban !== null) {
            console.log("You are banned. Reason:");
            console.log(loginResponse.ban.reason);
            return;
        }
    }
}
main();

module.exports = {
  getMessage: async function (message: any)
  {
    var msg = message.content.toLowerCase();
    let image = '';

    if(message.content.substring(0,4).toLowerCase() === 'pr0 ')
    {
      let tag = message.content.substring(4);
      image = await this.getImage(tag);
    }
    else if(message.content.substring(0,8).toLowerCase() === 'pr0-vid ')
    {
      let tag = message.content.substring(8);
      image = await this.getVideo(tag)
    }
    else if (message.content.substring(0,8).toLowerCase() === 'pr0-all ')
    {
        let tag = message.content.substring(8);
        image = await this.getVideoAndImage(tag);
    }

    if(image !== '')
    {
      message.channel.send(image);
    }
  },



  getItems: async function(tag: string) {
    let mainItems = await api.items.getItems({
        promoted: true,
        flags: pr0.ItemFlags.All,
        tags: [tag]
    });
    return mainItems;
  },

  getImage: async function(tag: string) {

    let mainItems = await this.getItems(tag);
    if(typeof mainItems.items === 'undefined' || mainItems.items.length === 0) {
      return "Soz, j'ai rien pour toi ;(";
    }
    let random, i = 0;
    do {
      random = Math.floor(Math.random() * mainItems.items.length);
      console.log(random);
      i++;
    }
    while (mainItems.items[random].image.substr(-3) ===  "mp4" || mainItems.items.length < i);
    //console.dir(mainItems.items[random]);
    console.log(mainItems.items[random].image);
    return 'http://vid.pr0gramm.com/' + mainItems.items[random].image;
  },

  getVideo:async function(tag: string) {

    let mainItems = await this.getItems(tag);
    if(typeof mainItems.items === 'undefined' || mainItems.items.length === 0) {
      return "Soz, j'ai rien pour toi ;(";
    }

    let random, i = 0;
    do {
      random = Math.floor(Math.random() * mainItems.items.length);
      i++;
    }
    while (mainItems.items[random].image.substr(-3) !==  "mp4" || mainItems.items.length < i);

    return 'http://vid.pr0gramm.com/' + mainItems.items[random].image;
  },

  getVideoAndImage:async function(tag: string) {
    let mainItems = await this.getItems(tag);

    if(typeof mainItems.items === 'undefined' || mainItems.items.length === 0) {
      return "Soz, j'ai rien pour toi ;(";
    }

    let random = Math.floor(Math.random() * mainItems.items.length);
    return 'http://vid.pr0gramm.com/' + mainItems.items[random].image;
  }

}
