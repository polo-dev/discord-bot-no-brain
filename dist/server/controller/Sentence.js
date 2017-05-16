var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var SentenceModel = require('../model/Sentence');
var KeywordModel = require('../model/Keyword');
module.exports = {
    addSentence: function (message, keyword, sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            sentence.splice(0, 2);
            sentence = sentence.join(" ");
            console.log(sentence);
            var query = yield KeywordModel.findOne({ 'keyword': keyword }).exec();
            if (query && query.keyword) {
                var aSentence = new SentenceModel();
                aSentence.sentence = sentence;
                aSentence._keyword = query._id;
                var res = yield aSentence.save();
                if (res && res.sentence) {
                    console.log(`Message "${res.sentence}" est enregistré`);
                    message.reply('Message enregistré !');
                }
                else {
                    console.log('une petite erreur de rien tout tout');
                    message.reply('bug dans la matrix');
                }
            }
            else {
                console.log('Pas de mots clès : ' + keyword);
                message.reply('Pas de mots clès : ' + keyword);
            }
        });
    },
    getSentenceByKey: function (message, keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = yield KeywordModel.findOne({
                'keyword': keyword
            }).exec();
            if (query && query.keyword) {
                var sentences = yield SentenceModel.find({
                    '_keyword': query._id
                }, function (err, sentences) {
                    var sentenceMap = [];
                    sentences.forEach(function (sentence) {
                        sentenceMap.push(sentence);
                    });
                    if (sentences && sentences[0]) {
                        var random = Math.floor(Math.random() * sentenceMap.length);
                        console.log("get message : " + sentenceMap[random]);
                        message.reply(sentenceMap[random].sentence);
                    }
                });
            }
        });
    }
};
