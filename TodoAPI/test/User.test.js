let mongoose = require("mongoose");
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

describe("Verify password", () => {
    beforeEach((done) => { //Before each test we empty the database
        let user = new User({username: 'Darek'});
        user.save((err) => {
            if(err) {
                console.log(err);
            } else {
                done();
            }
        });       
    });
    it("creates a new user", () => {
        let user = new User({username: 'Darek'});
        user.should.be.a('object');
        user.should.have.property('username').eql('Darek');
    }),
    it("sets the password of user", (done) => {
        User.find({}, function(err, users) {
            if(err) {
                console.log(err);
            } else {
                console.log(users);
                let user = users[0];
                user.setPassword('12345');
                user.should.have.property('hash');
                user.should.have.property('salt');
                done();
            }
        })
    })
})