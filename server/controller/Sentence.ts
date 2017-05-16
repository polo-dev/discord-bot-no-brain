var SentenceModel = require('../model/Sentence');
var KeywordModel = require('../model/Keyword');


module.exports = {
  addSentence: async function(message, keyword, sentence) {
    sentence.splice(0,2);
    sentence = sentence.join(" ");
    console.log(sentence);

    var query = await KeywordModel.findOne({ 'keyword': keyword }).exec();

    if(query && query.keyword) {
      var aSentence = new SentenceModel();
      aSentence.sentence = sentence;
      aSentence._keyword = query._id;
      var res = await aSentence.save();
      if(res && res.sentence) {
        console.log(`Message "${res.sentence}" est enregistré`)
        message.reply('Message enregistré !')
      } else {
        console.log('une petite erreur de rien tout tout')
        message.reply('bug dans la matrix')
      }
    } else {
      console.log('Pas de mots clès : ' + keyword)
      message.reply('Pas de mots clès : ' + keyword)
    }
  },
  getSentenceByKey: async function (message, keyword) {
    var query = await KeywordModel.findOne({
      'keyword': keyword
    }).exec();

    if(query && query.keyword) {
      var sentences = await SentenceModel.find({
        '_keyword': query._id
      }, function (err, sentences) {
        var sentenceMap = []
        sentences.forEach(function(sentence) {
          sentenceMap.push(sentence);
        })
        if(sentences && sentences[0]) {
          var random = Math.floor(Math.random() * sentenceMap.length)
          console.log("get message : " + sentenceMap[random])
          message.reply(sentenceMap[random].sentence)
        }
      })
    }
  }
}
