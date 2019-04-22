const Todo = require('../models/todo');
const User = require('../models/user');
const io = require('./socket').getio();

const TodosService = {
    getTodos(username) {
        return new Promise(function(resolve, reject) {
            User.findOne({ username: username }).populate('todos').exec((err, user) => {
                if(err) {
                    reject(err);
                } 
                resolve(user.todos);
            })
        })

    },
    postTodo(username, body) {
        return new Promise(function(resolve, reject) {
            User.findOne({ username: username }, (err, user) => {
                var newTodo = new Todo({task: body.task, completed: body.completed || false, user: user._id});
                newTodo.save((err) => {
                    if(err) {
                        reject(err)
                    } else {
                        user.todos.push(newTodo._id)
                        user.save((err) => {
                            if(err) {
                                reject(err);
                            }
                        })
                        resolve(newTodo);
                    }
                })
            })
        })
    },
    putTodo(id, username, body) {
        return new Promise(function(resolve, reject) {
            Todo.findById(id).populate('user').exec((err, todo) => {
                if(err || username !== todo.user.username) {
                    reject({message: "Error occured"});
                }
                else {
                    if(body.task) {
                        todo.task = body.task;
                    }
                    if(body.completed) {
                        todo.completed = body.completed;
                    }
                    todo.save();
                    const { username, _id: userId } = todo.user;
                    const { task, completed, _id } = todo;
        
                    let result = {
                        _id,
                        task,
                        completed,
                        user: {
                            username,
                            _id: userId
                        }
                    }
        
                    resolve(result);
                }
            });
        })
    },
    deleteTodo(id, username) {
        return new Promise(function(resolve, reject) {
            Todo.findByIdAndRemove(id).populate('user').exec((err, todo) => {
                if(err || username !== todo.user.username) {
                    let error = err ? err : new Error("You don't have access to these instance");
                    reject(error);
                } else {
                    const { username, _id: userId } = todo.user;
                    const { task, completed, _id } = todo;
        
                    let result = {
                        _id,
                        task,
                        completed,
                        user: {
                            username,
                            _id: userId
                        }
                    }
                    resolve(result);
                }
            });
        })
    }
}

module.exports = TodosService;