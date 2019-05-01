const express = require('express');

const app = express();

const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const io = require('./services/socket').init(server);


const dbURL = process.env.mongoURL ? process.env.mongoURL : 'mongodb://localhost:27017/myapp';
var db = mongoose.connection;

db.on('connecting', () => {
	console.log('connecting to MongoDB...');
});

db.on('error', (error) => {
	console.error(`Error in MongoDb connection: ${error}`);
	mongoose.disconnect();
});
db.on('connected', () => {
	console.log('MongoDB connected!');
});
db.once('open', () => {
	console.log('MongoDB connection opened!');
});
db.on('reconnected', () => {
	console.log('MongoDB reconnected');
});
db.on('disconnected', () => {
	console.log('MongoDB disconnected!');
	mongoose.connect(dbURL, { server: { auto_reconnect: true }, useNewUrlParser: true });
});
mongoose.connect(dbURL, { server: { auto_reconnect: true }, useNewUrlParser: true });

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(morgan('tiny'));
app.use(passport.initialize());
app.use(require('./routes/route'));
app.use(require('./routes/user'));

io.on('connection', (client) => {
	let room = null;
	client.on('room', (username) => {
		room = username;
		console.log('Room join order');
		client.join(room, () => {
			console.log('Joined a room');
		});
	});

	client.on('change', () => {
		io.sockets.broadcast.to(room).emit('change');
	});
});

server.listen(process.env.PORT || 8080, () => {
	console.log('The server has started!');
});


module.exports = app;
