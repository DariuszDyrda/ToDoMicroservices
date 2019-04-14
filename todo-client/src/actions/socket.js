const io = require('socket.io-client');

export function connectToSocketServer() {
    return io();
}