var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    task: String,
    completed: Boolean
})

var Todo = mongoose.model('todo',TodoSchema);

module.exports = Todo;