const Player = require('../../models/Player');
const Challenge = require('../../models/Challenge');

module.exports = class GameController {
    constructor(io) {
        this.players = [];
        this.io = io;
        this.challenge = null;
        this.interval = null;
        this.challenge = new Challenge(this.players, io);

        this.configureSocket(io);
    }

    configureSocket(io) {
        this.io.sockets.on('connection', (socket) => this.connection(socket));
    }

    connection(socket) {
        let player;
        socket.on('disconnect', () => this.disconnect(player));

        if (this.players.length > 9) {
            socket.emit('roomfull', { msg: 'This room is full, please return later' });
            socket.disconnect();
            return;
        }

        socket.on('nameChanged', (data) =>  this.onNameChanged(player, data));

        player = this.addPlayer(socket);
        this.playerListChanged();
    }

    onNameChanged(player, data) {
        if (!player) return;
        player.onNameChanged(data);
        this.playerListChanged();
    }

    disconnect(player) {
        if (!player) return;
        var index = this.players.findIndex(p => p.id === player.id);
        this.players.splice(index, 1);
        this.playerListChanged();
    }

    addPlayer(socket) {

        let player = new Player(socket);
        this.players.push(player);
        // console.log("added a player: " + player.id);
        this.challenge.sendChallengeTo(player);

        return player;
    }

    playerListChanged() {
        // console.log("start player list changed length: " + this.players.length);
        this.io.emit('playersChanged', { players: this.players.map(p => p.getData()) });
        // console.log("end player list chaged");
    }
};