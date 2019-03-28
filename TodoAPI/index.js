const MODE = "prod";

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('./config/passport')

if(MODE !== "test") {
    mongoose.connect(process.env.mongoURL, {useNewUrlParser: true});
} else {
    mongoose.connect("mongodb://localhost:27017/todo-test");
}
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(morgan('tiny'));
app.use(passport.initialize());
app.use('/api', require("./routes/route"));
app.use('/api', require("./routes/user"));

app.listen(process.env.PORT || 8080, () => {
    console.log("The server has started!");
})

module.exports = app;