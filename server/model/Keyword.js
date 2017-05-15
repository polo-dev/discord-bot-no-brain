const mongoose = require('mongoose');
const {Schema} = mongoose;

const keywordSchema = new Schema({
  'keyword': {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('Keyword', keywordSchema);
