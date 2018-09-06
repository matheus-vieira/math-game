const Player = require('../../models/Player');
const Challenge = require('../../models/Challenge');

module.exports = class GameController {
    constructor(io) {
        this.players = [];
        this.io = io;
        this.challenge = null;
        this.interval = null;

        this.configureSocket(io);
    }

    configureSocket(io) {
        this.io.sockets.on('connection', (socket) => this.connection(socket));
        this.sendChallenge();
    }

    connection(socket) {
        console.log('socket connection');
        let id = this.addPlayer(socket);
        socket.on('disconnect', () => this.disconnect(id));
    }

    disconnect(id) {
        console.log("disconnection id: " + id);
        var index = this.players.findIndex(p => p.id === id);
        this.players.splice(index, 1);
    }

    addPlayer(socket) {
        if (this.players.length > 9) {
            socket.emit('roomfull', {
                msg: 'This room is fill, please return later'
            });
            return;
        }
        let player = new Player(socket);
        this.players.push(player);
        console.log("added a player: " + player.id);
        return player.id;
    }

    sendChallenge() {
        if (!this.interval)
            this.interval = setInterval(() => this.newRound(), 5000);
    }

    newRound() {
        console.log('newRound');
        if (this.challenge && this.challenge.inProgress)
            return;

        console.log('Creating Challenge');
        this.challenge = new Challenge([...this.players]);
    }
};