require('module-alias/register');
const should = require('should');
const Player = require('@models/Player');

describe('Player tests', function () {
    describe('Get Users', function () {
        it('should get a object with player information', function () {
            player = new Player();
            let data = player.getData();
            data.should.be.an.Object();
        });
    });
});