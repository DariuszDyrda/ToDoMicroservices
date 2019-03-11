const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/todo');

router.get('/todos', (req, res) => {
    Todo.find({}, (err, todos) => {
        if(err) {
            res.json({message: "Error"})
        } else {
            res.json(todos);
        }
    })
})

router.post('/todos', (req, res) => {
    var newTodo = new Todo({task: req.body.task, completed: false});
    newTodo.save((err) => {
        if(err) {
            res.json({message: "Couldn't save"});
        } else {
            res.json(newTodo);
        }
    })
})

router.post('/todos/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if(err) {
            res.json({message: "Error occured"});
        } else {
            res.json(todo);
        }
    });
})

router.put('/todos/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            res.json({message: "Error occured"});
        } else {
            if(req.body.task) {
                todo.task = req.body.task;
            }
            if(req.body.completed) {
                todo.completed = req.body.completed;
            }
            todo.save();
            res.json(todo);
        }
    });
})

module.exports = router;