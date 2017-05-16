var KeywordModel = require('../model/Keyword');
var SentenceModel = require('../model/Sentence');


module.exports = {

  getKeywords: async function (message) {
    KeywordModel.find()
    .exec((err, keys) => {
      if (err) { console.log(err);message.send.channel('mince alors, y a eu une erreur ;('); }
      console.log(keys);
      message.reply(keys);
    });
  },
  getKeyword: async function(message, key) {
    var query = KeywordModel.findOne({ 'keyword': key }).exec();
    console.log(query);
    query.then(function(res) {
      if(res && res.keyword) {
        return res;
      }
    })
  },

  createKeyword: async function (message, key) {
    const keyword = new KeywordModel
    keyword.keyword = key
    var promise = keyword.save()
    promise.then(function(res) {
      console.log('keys created : ' + res);
      message.reply("Mot clé ajoutés : " + res.keyword);
    }, function (err) {
      console.log(err);
      message.reply("Une erreur est survenu, un doublon peut être ?");
    })
  },
  deleteKeyword: async function (message, key) {
    var query = KeywordModel.findOne({ 'keyword': key }, function (err) {
      if (err) {
        console.log(err);
        return err;
      }
    });
    var promise = query.exec();
    promise.then(function(q) {
      if(q && q.keyword) {
        KeywordModel.remove({ 'keyword': key }).exec();
        console.log(key + " supprimé")
        message.reply(`Mot clé : ${key} supprimé !`)
      } else {
        message.reply("Le mot clé n'existe pas !")
      }
    }, function(err) {
      if(err) console.log(err)
    })
  }
}
