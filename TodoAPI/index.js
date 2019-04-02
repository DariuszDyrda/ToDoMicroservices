const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('./config/passport')

const dbURL = process.env.mongoURL ? process.env.mongoURL : "mongodb://localhost:27017/todo-test";
var db = mongoose.connection;

db.on('connecting', function() {
  console.log('connecting to MongoDB...');
});

db.on('error', function(error) {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', function() {
  console.log('MongoDB connected!');
});
db.once('open', function() {
  console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});
db.on('disconnected', function() {
  console.log('MongoDB disconnected!');
  mongoose.connect(dbURL, {server:{auto_reconnect:true}, useNewUrlParser: true});
});
mongoose.connect(dbURL, {server:{auto_reconnect:true}, useNewUrlParser: true});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(morgan('tiny'));
app.use(passport.initialize());
app.use(require("./routes/route"));
app.use(require("./routes/user"));

app.listen(process.env.PORT || 8080, () => {
    console.log("The server has started!");
})

module.exports = app;