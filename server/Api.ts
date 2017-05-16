require('dotenv').config();
var mongoose = require('mongoose');
const KeywordController = require('./controller/Keyword');
const SentenceController = require('./controller/Sentence');

module.exports = {
  getMessage: async function(message) {
    var splitMessage = message.content.toLowerCase().split(" ");
    var keys = await KeywordController.getKeywords()
    var msg = message.content.toLowerCase()

    switch (splitMessage[0]) {
      case '/addkey':
          KeywordController.createKeyword(message, splitMessage[1])
        break;
      case '/delkey':
          KeywordController.deleteKeyword(message, splitMessage[1])
        break;
      case '/addmessage':
          SentenceController.addSentence(message, splitMessage[1], splitMessage)
        break;
      case '/test':
          SentenceController.getSentenceByKey(message, splitMessage[1])
        break;
      case '/test1':
          KeywordController.getKeywords(message)
        break;
      default:
        for (var i = 0; i < keys.length; i++)
        {
          if (msg.includes(keys[i]))
          {
            SentenceController.getSentenceByKey(message, keys[i])
          }
        }
        break;
    }
  }
};

mongoose.connect(`mongodb://${process.env.MLAB_DBUSER}:${process.env.MLAB_DBPASSWORD}@${process.env.MLAB_DBURL}`);
