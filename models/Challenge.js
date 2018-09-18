const randomNumber = require('../utils/randomNumber.js');

const operators = [
    { sign: '+', method: (a, b) => a + b },
    { sign: '-', method: (a, b) => a - b },
    { sign: '*', method: (a, b) => a * b },
    { sign: '/', method: (a, b) => b > 0 ? a / b : 0 }
];

let processing = true;

module.exports = class Challenge {
    constructor(players, io) {
        this.players = players;
        this.io = io;

        this.operandA = null;
        this.operandB = null;
        this.operation = null;
        this.correctAnswer = null;
        this.answer = null;

        this.process();
    }

    getAnswer() {
        return this.getOperation().method(this.operandA, this.operandB);
    }

    getOperation() {
        return operators[randomNumber(4, true)];
    }

    clearChallenge() {
        this.operandA = '';
        this.operandB = '';
        this.operation = '';
        this.answer = '';
        this.correctAnswer = '';
    }

    createChallenge() {
        this.operandA = randomNumber();
        this.operandB = randomNumber();
        this.operation = this.getOperation();
        this.answer = this.getAnswer();
        let answer = this.operation.method(this.operandA, this.operandB);
        this.correctAnswer = answer === this.answer;
    }

    getChallenge() {
        return {
            operandA: this.operandA,
            operandB: this.operandB,
            operation: this.operation.sign,
            answer: this.answer
        };
    }

    sendChallenge() {
        const challenge = this.getChallenge();
        this.players
            .slice(0, 10)
            // shuffle the list to change the list order to avoid the olders gets the challenge before
            .sort(() => 0.5 - Math.random())
            .forEach(player => this.sendChallengeTo(player, challenge));
    }

    sendChallengeTo(player, challenge) {
        if (processing) return;

        // if has any listener remove them
        // if not remove will be add more and more listeners.
        player.socket.removeAllListeners('answer');

        // if the call is from sendChallenge method use the challenge param
        player.socket.emit('newChallenge', challenge || this.getChallenge());
        player.socket.on('answer', d => this.onAnswer(d, player));
    }

    onAnswer(data, player) {
        if (processing) return;

        player.setScore(data.answer === this.correctAnswer);

        this.process();
    }

    process() {
        processing = true;
        let timeToNextChallenge = 5000;

        if (this.io)
            this.io.emit('nextChallenge', { players: this.players.map(p => p.getData()) });

        setTimeout(() => {
            processing = false;
            this.nextChallenge();
        }, timeToNextChallenge);
    }
    
    nextChallenge() {
        this.createChallenge();
        this.sendChallenge();
    }
};