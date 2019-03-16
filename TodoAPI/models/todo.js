var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    task: {type: String, required: true},
    completed: {type: Boolean, required: true}
})

var Todo = mongoose.model('todo',TodoSchema);

module.exports = Todo;