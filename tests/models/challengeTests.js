require('module-alias/register');
const should = require('should');
const Challenge = require('@models/Challenge');

describe('Challenge tests', function () {
    describe('Challenge', function () {
        let challenge = new Challenge([]);
        let challengeObj = null;
        it('should create a challenge and expose 4 object keys', function () {
            challenge.createChallenge();
        });
        it('should expose an object with 4 keys "operandA", "operandB", "operation" and "answer"', function () {
            challengeObj = challenge.getChallenge();
            challengeObj.should.have.keys('operandA', 'operandB', 'operation', 'answer');
        });
        describe('Operands', function () {
            const validation = x => x.should.be.Number().and.be.within(1, 10);
            it('should the first operand be a number and between 1-10', function () {
                validation(challenge.operandA);
            });
            it('should the second operand be a number and between 1-10', function () {
                validation(challenge.operandB);
            });
        });
        describe('Operation', function () {
            it('should be an object with 2 keys "sign" and "method"', function () {
                challenge.operation
                    .should.be.Object()
                    .and.have.keys('sign', 'method');
            });
            it('should sign key be a string with 1 char', function () {
                challenge.operation.sign
                    .should.be.a.String()
                    .and.have.length(1);
            });
            it('should method key be a function', function () {
                challenge.operation.method
                    .should.be.a.Function();
            });
        });
        it('should answer be a number', function () {
            challenge.answer.should.be.Number();
        });
        it('should correctAnswer be a bool', function () {
            challenge.correctAnswer.should.be.Boolean();
        });
    });
});