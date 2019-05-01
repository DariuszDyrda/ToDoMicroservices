/* eslint-disable no-underscore-dangle */
const Todo = require('../models/todo');
const User = require('../models/user');

const TodosService = {
	getTodos(username) {
		return new Promise((resolve, reject) => {
			User.findOne({
				username
			}).populate('todos').exec((err, user) => {
				if (err) {
					reject(err);
				}
				resolve(user.todos);
			});
		});
	},
	postTodo(username, body) {
		return new Promise((resolve, reject) => {
			User.findOne({
				username
			}, (error, user) => {
				var newTodo = new Todo({
					task: body.task,
					completed: body.completed || false,
					user: user._id
				});
				newTodo.save((err) => {
					if (err) {
						reject(err);
					}
					else {
						user.todos.push(newTodo._id);
						user.save((e) => {
							if (e) {
								reject(e);
							}
						});
						resolve(newTodo);
					}
				});
			});
		});
	},
	putTodo(id, user, body) {
		return new Promise((resolve, reject) => {
			Todo.findById(id).populate('user').exec((err, todo) => {
				if (err || user !== todo.user.username) {
					reject(err);
				}
				else {
					if (body.task) {
						todo.task = body.task;
					}
					if (body.completed) {
						todo.completed = body.completed;
					}
					todo.save();
					const {
						username,
						_id: userId
					} = todo.user;
					const {
						task,
						completed,
						_id
					} = todo;

					const result = {
						_id,
						task,
						completed,
						user: {
							username,
							_id: userId
						}
					};

					resolve(result);
				}
			});
		});
	},
	deleteTodo(id, user) {
		return new Promise((resolve, reject) => {
			const query = Todo.findByIdAndRemove(id);
			query.populate('user').exec((err, todo) => {
				if (err) {
					reject(err);
					return;
				}
				if (!todo) {
					const error = Error('This item doesnt exist');
					reject(error);
					return;
				}
				if (user !== todo.user.username) {
					const error = new Error("You don't have access to these instance");
					reject(error);
				}
				else {
					const {
						username,
						_id: userId
					} = todo.user;
					const {
						task,
						completed,
						_id
					} = todo;

					const result = {
						_id,
						task,
						completed,
						user: {
							username,
							_id: userId
						}
					};
					resolve(result);
				}
			});
		});
	}
};

module.exports = TodosService;
