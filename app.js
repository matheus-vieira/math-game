const express = require('express');
let app = express();
let server = require('http').Server(app);

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/client/index.html`);
});
app.use('/client', express.static(`${__dirname}/client`));


const srv = server.listen(2000);

// console.log('Server started.');

const SOCKET_LIST = {};

const GameController = require('./server/controller/GameController');
let io = require('socket.io')(server, {});
const gameController = new GameController(io);

// export the server so it can be easily called for testing
exports.server = srv;

/**
 * 
 * ,
 * File Communication (Express)
 *  Client asks server for a file (Ex.: image1.png)
 * 
 * */
/**
 * Package Communication
 *   Client sends data to the server (Ex.: Input)
 *   Server sends data to the client (Ex.: Input)
 */