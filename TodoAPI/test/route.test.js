let Todo = require('../models/todo');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

const testUserCredentials = {
  username: 'test_user',
  password: 'test'
}

describe('Todos', () => {
  let token = null;
  before((done) => {
    chai.request(server)
      .post('/register')
      .send(testUserCredentials)
      .end((err, res) => {
        if(err) {
          console.log("ERROR "+ err);
        }
        token = res.body.token;
        done();
      });
      
  })
    beforeEach((done) => { //Before each test we empty the database
      Todo.remove({}, (err) => {
        done();
      })
    });
/*
  * Test the /GET route
  */
  describe('/GET todos', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/todos')
            .set('Authorization', 'Bearer ' + token)
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
      let todo = {task: "New todo"};
      chai.request(server)
        .post('/todos')
        .set('Authorization', 'Bearer ' + token)
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('task').eql('New todo');
          res.body.should.have.property('completed').eql(false);
          done();
        })
    });
    it('it should return new todo with completed set to true', (done) => {
      let todo = {task: "New todo", completed: true};
      chai.request(server)
        .post('/todos')
        .set('Authorization', 'Bearer ' + token)
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('completed');
          res.body.completed.should.eql(true);
          done();
        })
    })
    it('it shouldnt add empty obj into the DB', (done) => {
      let todo = {};
      chai.request(server)
        .post('/todos')
        .set('Authorization', 'Bearer ' + token)
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('task');
          res.body.errors.task.should.have.property('kind').eql('required');
          done();
        })
    })
  })
  describe("/DELETE todos", () => {
    let id = null;
    beforeEach((done) => {
        let todo = {task: "New todo"};
        chai.request(server)
          .post('/todos')
          .set('Authorization', 'Bearer ' + token)
          .send(todo)
          .end((err, res) => {
            id = res.body._id;
            done();
          });
    })
    it('it should DELETE the book with given id', (done) => {
      chai.request(server)
          .delete('/todos/'+id)
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.have.property('_id')
            done();
          });
    });
  })

});