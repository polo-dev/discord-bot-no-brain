var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var KeywordModel = require('../model/Keyword');
var SentenceModel = require('../model/Sentence');
module.exports = {
    getKeywords: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            var keys = yield KeywordModel.find({}, { "keyword": true })
                .exec((err, keys) => {
                if (err) {
                    console.log(err);
                    message.send.channel('mince alors, y a eu une erreur ;(');
                }
            });
            var akeys = [];
            keys.map(function (k) {
                akeys.push(k.keyword);
            });
            return akeys;
        });
    },
    getKeyword: function (message, key) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = KeywordModel.findOne({ 'keyword': key }).exec();
            console.log(query);
            query.then(function (res) {
                if (res && res.keyword) {
                    return res;
                }
            });
        });
    },
    createKeyword: function (message, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyword = new KeywordModel;
            keyword.keyword = key;
            var promise = keyword.save();
            promise.then(function (res) {
                console.log('keys created : ' + res);
                message.reply("Mot clé ajoutés : " + res.keyword);
            }, function (err) {
                console.log(err);
                message.reply("Une erreur est survenu, un doublon peut être ?");
            });
        });
    },
    deleteKeyword: function (message, key) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = KeywordModel.findOne({ 'keyword': key }, function (err) {
                if (err) {
                    console.log(err);
                    return err;
                }
            });
            var promise = query.exec();
            promise.then(function (q) {
                if (q && q.keyword) {
                    KeywordModel.remove({ 'keyword': key }).exec();
                    console.log(key + " supprimé");
                    message.reply(`Mot clé : ${key} supprimé !`);
                }
                else {
                    message.reply("Le mot clé n'existe pas !");
                }
            }, function (err) {
                if (err)
                    console.log(err);
            });
        });
    }
};
