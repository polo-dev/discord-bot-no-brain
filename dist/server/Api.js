require('dotenv').config();
var mongoose = require('mongoose');
const KeywordController = require('./controller/Keyword');
const SentenceController = require('./controller/Sentence');
module.exports = {
    getMessage: function (message) {
        var splitMessage = message.content.toLowerCase().split(" ");
        switch (splitMessage[0]) {
            case '/addkey':
                KeywordController.createKeyword(message, splitMessage[1]);
                break;
            case '/delkey':
                KeywordController.deleteKeyword(message, splitMessage[1]);
                break;
            case '/addmessage':
                SentenceController.addSentence(message, splitMessage[1], splitMessage);
                break;
            case '/test':
                SentenceController.getSentenceByKey(message, splitMessage[1]);
                break;
        }
    }
};
mongoose.connect(`mongodb://${process.env.MLAB_DBUSER}:${process.env.MLAB_DBPASSWORD}@${process.env.MLAB_DBURL}`);
