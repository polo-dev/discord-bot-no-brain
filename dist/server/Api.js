var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
var mongoose = require('mongoose');
const KeywordController = require('./controller/Keyword');
const SentenceController = require('./controller/Sentence');
module.exports = {
    getMessage: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            var splitMessage = message.content.toLowerCase().split(" ");
            var keys = yield KeywordController.getKeywords();
            var msg = message.content.toLowerCase();
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
                case '/test1':
                    KeywordController.getKeywords(message);
                    break;
                default:
                    for (var i = 0; i < keys.length; i++) {
                        if (msg.includes(keys[i])) {
                            SentenceController.getSentenceByKey(message, keys[i]);
                        }
                    }
                    break;
            }
        });
    }
};
mongoose.connect(`mongodb://${process.env.MLAB_DBUSER}:${process.env.MLAB_DBPASSWORD}@${process.env.MLAB_DBURL}`);
