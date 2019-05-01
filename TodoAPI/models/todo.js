var mongoose = require('mongoose');

var { Schema } = mongoose;
var TodoSchema = null;

function isNotEmpty() {
	if (typeof this.task !== 'string' || this.task === '') {
		return true;
	}
	return false;
}

TodoSchema = new Schema({
	task: { type: String, required: isNotEmpty },
	completed: { type: Boolean, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'user' }
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;
