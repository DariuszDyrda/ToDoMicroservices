const express = require('express');
const router = express.Router();
const auth = require('./auth')
const io = require('../services/socket').getio();
const TodosService = require('../services/TodosService')

router.get('/todos', auth.required, async (req, res) => {
    let username = req.user.username;
    let result = await TodosService.getTodos(username);
    return res.json(result);
})

router.post('/todos', auth.required, async (req, res) => {
   let username = req.user.username;
   let result = null;
   try {
    result = await TodosService.postTodo(username, req.body);
   } catch(e) {
    return res.json(e);
   }
   res.json(result);
   setTimeout(()=> {
    io.to(username).emit('change');
   }, 500)
})

router.put('/todos/:id', auth.required, async (req, res) => {
    let id = req.params.id;
    let username = req.user.username;
    let result = await TodosService.putTodo(id, username, req.body);
    res.json(result);
    io.to(username).emit('change');
})

router.delete('/todos/:id', auth.required, async (req, res) => {
    let id = req.params.id;
    let username = req.user.username;
    let result = null;
    try {
        result = await TodosService.deleteTodo(id, username);
    } catch(e) {
        return res.json(e);
    }
    res.json(result);
    io.to(username).emit('change');
})

module.exports = router;