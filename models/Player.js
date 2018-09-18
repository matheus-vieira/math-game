const guid = require('../utils/guid.js');
let counter = 1;

module.exports = class Player {
    constructor(socket) {
        this.socket = socket;
        this.id = guid();
        this.wins = 0;
        this.lost = 0;
        this.name = "New Player " + counter++;

        if (this.socket)
            this.socket.emit('addPlayer', this.getData());
    }

    setScore(addWin) {
        if (addWin) this.wins++;
        else this.lost++;

        this.sendScore();
    }

    onNameChanged(data) {
        if (!data || !data.name) return;
        this.setName(data.name);
    }

    setName(newName) {
        this.name = newName;
        this.sendScore();
    }

    sendScore() {
        if (this.socket)
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