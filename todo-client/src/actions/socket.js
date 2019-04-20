const io = require('socket.io-client');

export function connectToSocketServer(username) {
    let socket = io();
    console.log("socket creator")
    socket.on('connect', function() {
        console.log("Socket client connected")
        socket.emit('room', username);
    })
    return socket;
}