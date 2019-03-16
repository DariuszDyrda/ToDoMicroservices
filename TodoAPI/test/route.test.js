let mongoose = require("mongoose");
let Todo = require('../models/todo');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Todos', () => {
    beforeEach((done) => { //Before each test we empty the database
        Todo.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET todos', () => {
      it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/todos')
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
        .post('/api/todos')
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
        .post('/api/todos')
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
        .post('/api/todos')
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
  // describe("/DELETE todos", () => {
  //   beforeEach((done) => {
  //       let todo = {task: "New todo"};
  //       chai.request(server)
  //         .post('/api/todos')
  //         .send(todo)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('task').eql('New todo');
  //           res.body.should.have.property('completed').eql(false);
  //           done();
  //         });

  //         chai.request(server)
  //         .get('/api/todos')
  //         .end((err, res) => {
  //               res.should.have.status(200);
  //               res.body.should.be.a('array');
  //               res.body.length.should.be.eql(0);
  //           done();
  //         });


  //   })
  //   it('it should DELETE the book with given id', (done) => {
  //     chai.request(server)
  //         .delete('/api/todos/'+)
  //         .end((err, res) => {
  //               res.should.have.status(200);
  //               res.body.should.be.a('array');
  //               res.body.length.should.be.eql(0);
  //           done();
  //         });
  //   });
  // })

});