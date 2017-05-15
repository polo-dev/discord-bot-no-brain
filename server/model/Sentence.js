const mongoose = require('mongoose');
const {Schema} = mongoose;

const SentenceSchema = new Schema({
  '_keyword': {
    'ref': 'Keyword',
    'type': Schema.Types.ObjectId
  },
  'sentence': String
});

module.exports = mongoose.model('Sentence', SentenceSchema);
