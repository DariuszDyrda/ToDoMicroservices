const express = require('express');

const router = express.Router();

const errToJSON = require('error-to-json');
const auth = require('./auth');
const io = require('../services/socket').getio();
const TodosService = require('../services/TodosService');

router.get('/todos', auth.required, async (req, res) => {
	const { username } = req.user;
	const result = await TodosService.getTodos(username);
	return res.json(result);
});

router.post('/todos', auth.required, async (req, res) => {
	const { username } = req.user;
	let result = null;
	try {
		result = await TodosService.postTodo(username, req.body);
	}
	catch (e) {
		return res.json(e);
	}
	res.json(result);
	setTimeout(() => {
		io.to(username).emit('change');
	}, 500);
});

router.put('/todos/:id', auth.required, async (req, res) => {
	const { id } = req.params;
	const { username } = req.user;
	const result = await TodosService.putTodo(id, username, req.body);
	res.json(result);
	io.to(username).emit('change');
});

router.delete('/todos/:id', auth.required, async (req, res) => {
	const { id } = req.params;
	const { username } = req.user;
	let result = null;
	try {
		result = await TodosService.deleteTodo(id, username);
	}
	catch (e) {
		return res.json(errToJSON(e));
	}
	res.json(result);
	io.to(username).emit('change');
});

module.exports = router;
