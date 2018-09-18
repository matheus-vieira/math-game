require('module-alias/register');
const should = require('should');
const Player = require('@models/Player');

describe('Player tests', function () {
    describe('Player', function () {
        let player = new Player();
        it('should get a object with player information', function () {
            let data = player.getData();
            data.should.be.an.Object();
        });
        it('should add a win', function () {
            let wins = player.wins;
            // the player has answer correctly
            player.setScore(true);
            player.wins.should.be.above(wins);
        });
        it('should add a lost', function () {
            let lost = player.lost;
            // the player has answer wrongly
            player.setScore(false);
            player.lost.should.be.above(lost);
        });
        it('should have a default name like "New Player [0-9]"', function () {
            let name = player.name;
            player.name.should.be.a.String().and.match(/New Player [0-9]/);
        });
        it('should change the player name to "Test"', function () {
            var newName = "Test";
            player.setName(newName);
            player.name.should.be.a.String().and.equal(newName);
        });
    });
});