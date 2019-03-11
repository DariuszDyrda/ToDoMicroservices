const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.mongoURL, {useNewUrlParser: true});
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api',require("./routes/route"));

app.listen(process.env.PORT || 8080, () => {
    console.log("The server has started!");
})