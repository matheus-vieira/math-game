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
        this.createChallenge();
    }

    connection(socket) {
        console.log('socket connection');
        let id = this.addPlayer(socket);
        socket.on('disconnect', () => this.disconnect(id));
        this.playerListChanged();
    }

    disconnect(id) {
        console.log("disconnection id: " + id);
        var index = this.players.findIndex(p => p.id === id);
        this.players.splice(index, 1);
        this.playerListChanged();
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

    playerListChanged() {
        console.log("start player list changed length: " + this.players.length);
        this.io.emit('playersChanged', { players: this.players.map(p => p.getData()) });
        console.log("end player list chaged");
    }

    createChallenge() {
        console.log('Creating Challenge');
        this.challenge = new Challenge(this.players);
    }
};