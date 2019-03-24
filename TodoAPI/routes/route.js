const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/todo');
const User = require('../models/user')
const auth = require('./auth')

router.get('/todos', auth.required, (req, res) => {
    User.findOne({username: req.user.username}).populate('todos').exec((err, user) => {
        if(err) {
            return res.json(err);
        } 
        return res.json(user.todos);
    })
})

router.post('/todos', auth.required, (req, res) => {
    User.findOne({username: req.user.username}, (err, user) => {
        var newTodo = new Todo({task: req.body.task, completed: req.body.completed || false, user: user._id});
        newTodo.save((err) => {
            if(err) {
                return res.json(err)
            } else {
                user.todos.push(newTodo._id)
                user.save((err) => {
                    if(err) {
                        res.json(err);
                    }
                })
                return res.json(newTodo);
            }
        })
    })
})

router.put('/todos/:id', auth.required, (req, res) => {
    Todo.findById(req.params.id).populate('user').exec((err, todo) => {
        if(err || req.user.username !== todo.user.username) {
            res.json({message: "Error occured"});
        }
        else {
            if(req.body.task) {
                todo.task = req.body.task;
            }
            if(req.body.completed) {
                todo.completed = req.body.completed;
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

            res.json(result);
        }
    });
})

router.delete('/todos/:id', auth.required, (req, res) => {
    Todo.findByIdAndRemove(req.params.id).populate('user').exec((err, todo) => {
        if(err || req.user.username !== todo.user.username) {
            let error = err ? err : new Error("You don't have access to these instance");
            return res.json(error);
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

            res.json(result);
        }
    });
})

module.exports = router;