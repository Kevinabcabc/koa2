var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var BlockSchema = new Schema({
  peers: String,
  blocks: String,
  createAt: {
      type: Date,
      default: Date.now()
  },
  updateAt: {
      type: Date,
      dafault: Date.now()
  }
})

var Block = mongoose.model('Block', BlockSchema)
module.exports = Block