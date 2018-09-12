require('module-alias/register');
const should = require('should');
const Challenge = require('@models/Challenge');

describe('Challenge tests', function () {
    describe('Challenge', function () {
        it('should operands be a number', function () {
            let challenge = new Challenge([]);
            challenge.createChallenge();
            challenge.operandA.should.be.Number();
            challenge.operandB.should.be.Number();
        });
        it('should operation be an object', function () {
            let challenge = new Challenge([]);
            challenge.createChallenge();
            challenge.operation.should.be.Object();
        });
        it('should answer be a number', function () {
            let challenge = new Challenge([]);
            challenge.createChallenge();
            challenge.answer.should.be.Number();
        });
        it('should correctAnswer be a bool', function () {
            let challenge = new Challenge([]);
            challenge.createChallenge();
            challenge.correctAnswer.should.be.Boolean();
        });
    });
});