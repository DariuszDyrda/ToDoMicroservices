// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const Todo = require('../models/todo');
const server = require('../index');

chai.use(chaiHttp);

const testUserCredentials = {
	username: 'test_user',
	password: 'test'
};

describe('Todos', () => {
	let token = null;
	before((done) => {
		chai.request(server)
			.post('/register')
			.send(testUserCredentials)
			.end((err, res) => {
				if (err) {
					console.log(`ERROR ${err}`);
				}
				token = res.body.token;
				done();
			});
	});
	beforeEach((done) => {
		Todo.remove({}, (err) => {
			done();
		});
	});

	describe('/GET todos', () => {
		it('it should GET all the books', (done) => {
			chai.request(server)
				.get('/todos')
				.set('Authorization', `Bearer ${token}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});
	describe('/POST todos', () => {
		it('it should add new todo to DB', (done) => {
			const todo = { task: 'New todo' };
			chai.request(server)
				.post('/todos')
				.set('Authorization', `Bearer ${token}`)
				.send(todo)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('task').eql('New todo');
					res.body.should.have.property('completed').eql(false);
					done();
				});
		});
		it('it should return new todo with completed set to true', (done) => {
			const todo = { task: 'New todo', completed: true };
			chai.request(server)
				.post('/todos')
				.set('Authorization', `Bearer ${token}`)
				.send(todo)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('completed');
					res.body.completed.should.eql(true);
					done();
				});
		});
		it('it shouldnt add empty obj into the DB', (done) => {
			const todo = {};
			chai.request(server)
				.post('/todos')
				.set('Authorization', `Bearer ${token}`)
				.send(todo)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('errors');
					res.body.errors.should.have.property('task');
					res.body.errors.task.should.have.property('kind').eql('required');
					done();
				});
		});
	});
	describe('/DELETE todos', () => {
		let id = null;
		beforeEach((done) => {
			const todo = { task: 'New todo' };
			chai.request(server)
				.post('/todos')
				.set('Authorization', `Bearer ${token}`)
				.send(todo)
				.end((err, res) => {
					id = res.body._id;
					done();
				});
		});
		it('should DELETE the book with given id', (done) => {
			chai.request(server)
				.delete(`/todos/${id}`)
				.set('Authorization', `Bearer ${token}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('Object');
					res.body.should.have.property('_id');
					done();
				});
		});
		it('should return an error if item with given id is not in db', (done) => {
			const randomId = '5cc4be13654a6a00224112cd';
			chai.request(server)
				.delete(`/todos/${randomId}`)
				.set('Authorization', `Bearer ${token}`)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('Object');
					res.body.should.have.property('message');
					done();
				});
		});
	});
});
