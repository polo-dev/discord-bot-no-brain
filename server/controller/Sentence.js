const SentenceModel = require('../model/Sentence');
const KeywordModel = require('../model/Keyword');


module.exports = {
  addSentence: function(message, keyword, sentence) {
    sentence.splice(0,2);
    sentence = sentence.join(" ");
    console.log(sentence);

    var query = KeywordModel.findOne({ 'keyword': keyword }).exec();

    query.then(function(res) {
      if(res && res.keyword) {
        var aSentence = new SentenceModel();
        aSentence.sentence = sentence;
        aSentence._keyword = res._id;
        var promise = aSentence.save();
        promise.then(function(q) {
          if(q && q.sentence) {
            console.log(`Message "${q.sentence}" est enregistré`)
            message.reply('Message enregistré !')
          } else {
            console.log('une petite erreur de rien tout tout')
            message.reply('bug dans la matrix')
          }
        }, function(err) {
          console.log("il y a eu une erreur : " + err);
        })
      } else {
        console.log("erreur, pas de clé retrouvé");
        message.reply('Vous êtes sur que la clé existe :s ');
      }
    })
  }
}
