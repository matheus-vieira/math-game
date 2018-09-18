function randomNumber(x = 10, allowZero = false) {
    let zero = 1;
    if (allowZero) zero = 0;
    return Math.floor(Math.random() * x) + zero;
}

module.exports = randomNumber;