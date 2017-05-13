"use strict";

const Furry = require("e621");
const e621 = new Furry();

module.exports = {
  getMessage: function (message: any)
  {
    var splitMessage = message.content.toLowerCase().split(" ");

    if(splitMessage[0] === '/furry')
    {
      this.getFurry(message, splitMessage[1]);
    }
  },
  getFurry: async function(message: any, tag: string)
  {
    let image = await e621.getFurry(200, tag, "furry") //max 320
    let random = Math.floor(Math.random() * image.length) + 1
    if(image[random])
    {
      console.log("random e621 : " + random + " " + image[random]['file_url'])
      message.channel.send(image[random]['file_url'])
    }
    else
    {
      message.channel.send("Ben alors ? Y a plus de furry pour toi ? :( ")
    }
  }
}
