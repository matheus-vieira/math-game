const guid = require('../utils/guid.js');

module.exports = class Player {
    constructor(socket) {
        this.socket = socket;
        this.id = guid();
        this.wins = 0;
        this.lost = 0;
        this.name = "New Player";
    }

    win() {
        console.log('win for player', this.id);
        this.wins++;
        this.sendScore();
    }

    lost() {
        console.log('win for player', this.id);
        this.lost++;
        this.sendScore();
    }

    sendScore() {
        console.log('send score');
        this.socket.emit('score', {
            wins: this.wins,
            lost: this.lost,
            score: this.wins - this.lost
        });
    }

    getData() {
        return {
            id: this.id,
            name: this.name
        };
    }

};