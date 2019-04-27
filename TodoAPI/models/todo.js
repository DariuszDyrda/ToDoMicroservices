var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    task: {type: String, required: isNotEmpty},
    completed: {type: Boolean, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
})

function isNotEmpty() {
    if(typeof this.task !== 'string' || this.task === "") {
        return true;
    }
    return false;
}

var Todo = mongoose.model('todo',TodoSchema);

module.exports = Todo;