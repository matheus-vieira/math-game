const operators = [
    { sign: "+", method: (a, b) => a + b },
    { sign: "-", method: (a, b) => a - b },
    { sign: "*", method: (a, b) => a * b },
    { sign: "/", method: (a, b) => b > 0 ? a / b : 0 }
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

        this.nextChallenge();
    }

    getAnswer() {
        // console.log('get answer');
        let op = this.getOperation();
        return op.method(this.operandA, this.operandB);
    }

    getOperation() {
        // console.log('get Operation');
        return operators[this.randomNumber(4, true)];
    }

    randomNumber(x = 10, allowZero = false) {
        // console.log('random number', x, allowZero);
        let zero = 1;
        if (allowZero) zero = 0;
        return Math.floor(Math.random() * x) + zero;
    }

    clearChallenge() {
        // console.log('clear challenge');
        this.operandA = '';
        this.operandB = '';
        this.operation = '';
        this.answer = '';
        this.correctAnswer = '';
    }

    createChallenge() {
        // console.log('create challenge');
        this.operandA = this.randomNumber(); // 5
        this.operandB = this.randomNumber(); // 10
        this.operation = this.getOperation(); // *
        this.answer = this.getAnswer();
        this.correctAnswer = this.operation.method(this.operandA, this.operandB) === this.answer;
    }

    getChallenge() {
        // console.log('get challenge');
        return {
            operandA: this.operandA,
            operandB: this.operandB,
            operation: this.operation.sign,
            answer: this.answer
        };
    }

    sendChallenge() {
        const challenge = this.getChallenge();
        // console.log('sending challenge to ' + this.players.length + ' player(s)');
        this.players
            .slice(0, 10)
            // shuffle the list to change the list order to avoid the olders gets the challenge before
            .sort(() => 0.5 - Math.random())
            .forEach(player => this.sendChallengeTo(player, challenge));
    }

    sendChallengeTo(player, challenge) {
        if (processing) return;
        // console.log("sending challenge to player: " + player.id);

        // if has any listener remove them
        player.socket.removeAllListeners('answer');

        // console.log('emmiting newChallenge event');
        player.socket.emit('newChallenge', challenge || this.getChallenge());
        // console.log('registering event answer');
        player.socket.on('answer', d => this.onAnswer(d, player));
        // console.log("send challenge to player: " + player.id);
    }

    onAnswer(data, player) {
        if (processing) return;

        if (data.answer !== this.correctAnswer) {
            player.addLost();
            return;
        }
        
        player.addWin();
        this.nextChallenge();
    }
    
    nextChallenge() {
        let timeToNextChallenge = 5000;
        // console.log('nextChallenge in ' + timeToNextChanllenge);
        processing = true;
        if (this.io)
            this.io.emit('nextChallenge', { players: this.players.map(p => p.getData()) });
        setTimeout(() => {
            processing = false;
            this.createChallenge();
            this.sendChallenge();
        }, timeToNextChallenge);
    }
};