const operators = [
    { sign: "+", method: (a, b) => a + b },
    { sign: "-", method: (a, b) => a - b },
    { sign: "*", method: (a, b) => a * b },
    { sign: "/", method: (a, b) => b > 0 ? a / b : 0 }
];

let processing = false;

module.exports = class Challenge {
    constructor(players) {
        processing = false;

        this.inProgress = true;
        // shuffle the list to change the list order
        this.players = players.sort(() => 0.5 - Math.random());

        this.operandA = null;
        this.operandB = null;
        this.operation = null;
        this.correctAnswer = null;
        this.answer = null;

        this.createChallenge();
    }

    getAnswer() {
        console.log('get answer');
        let op = this.getOperation();
        return op.sign === this.operation.sign &&
            op.method(this.operandA, this.operandB) === this.correctAnswer;
    }

    getOperation() {
        console.log('get Operation');
        return operators[this.randomNumber(4, true)];
    }

    randomNumber(x = 10, allowZero = false) {
        console.log('random number', x, allowZero);
        let zero = 1;
        if (allowZero) zero = 0;
        return Math.floor(Math.random() * x) + zero;
    }

    createChallenge() {
        console.log('create challenge');
        this.operandA = this.randomNumber(); // 5
        this.operandB = this.randomNumber(); // 10
        this.operation = this.getOperation(); // *
        this.correctAnswer = this.operation.method(this.operandA, this.operandB); // 50
        this.answer = this.getAnswer();
    }

    getChallenge() {
        console.log('get challenge');
        return {
            operandA: this.operandA,
            operandB: this.operandB,
            operation: this.operation.sign
        };
    }

    sendChallenge() {
        console.log('sending challenge to ' + this.players.length + ' player(s)');
        this.players.forEach(player => this.sendChallengeTo(player));
    }

    sendChallengeTo(player) {
        console.log("sending challenge to player: " + player.id);
        player.socket.emit('newChallenge', () => this.getChallenge);
        player.socket.on('answer', d => this.onAnswer(d, player));
        console.log("send challenge to player: " + player.id);
    }

    onAnswer(data, player) {
        console.log('onAnswer');
        console.log('data', data);
        console.log('correctAnswer', this.correctAnswer);
        console.log('answer', this.answer);
        console.log('processing', processing);
        if (data.answer !== this.answer || processing)
            return;
        
        processing = true;

        console.log('correct answer');
        player.win();

        this.players.forEach(p => p.id !== player.id && p.lost());

        this.setProgress();
    }
    
    setProgress() {
        console.log('onAnswer');
        setInterval(() => this.inProgress = false, 5000);
    }
};