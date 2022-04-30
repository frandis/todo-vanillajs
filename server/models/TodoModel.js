const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: new Date() },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('todo', TodoSchema);
