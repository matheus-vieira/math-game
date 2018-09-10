const guid = require('../utils/guid.js');
let counter = 1;

module.exports = class Player {
    constructor(socket) {
        this.socket = socket;
        this.id = guid();
        this.wins = 0;
        this.lost = 0;
        this.name = "New Player " + counter++;
    }

    addWin() {
        console.log('win for player', this.id);
        this.wins++;
        this.sendScore();
    }

    addLost() {
        console.log('lost for player', this.id);
        this.lost++;
        this.sendScore();
    }

    onNameChanged(data) {
        console.log('changing player name');
        console.log('new name', data.name);
        this.name = data.name;
        this.sendScore();
    }

    sendScore() {
        console.log('send score');
        this.socket.emit('score', this.getData());
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
            wins: this.wins,
            lost: this.lost,
            score: this.wins - this.lost
        };
    }

};