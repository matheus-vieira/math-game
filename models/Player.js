const guid = require('../utils/guid.js');

module.exports = class Player {
    constructor(socket) {
        this.socket = socket;
        this.id = guid();
        this.wins = 0;
        this.name = "New Player";
    }

    win() {
        console.log('win for player', this.id);
        this.wins++;
        sendScore();
    }

    lost() {
        console.log('win for player', this.id);
        this.wins--;
        sendScore();
    }

    sendScore() {
        console.log('send score');
        this.socket.emmit('score', { score : this.wins });
    }

};