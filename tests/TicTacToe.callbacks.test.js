import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('turn callback is called when new game starts', done => {
    function callback(game) {
        try {
            expect(game.players[game.turn].mark).toEqual('X');
            done();
        } catch (error) {
            done(error);
        }
    }
    const game = TicTacToe.newGame(callback);
    game.next();
});

test('turn callback is called when new round is started', done => {
    function callback(game) {
        try {
            expect(game.players[game.turn].mark).toEqual('O');
            done();
        } catch (error) {
            done(error);
        }
    }
    const game = TicTacToe.newGame(null, callback);
    game.newRound();
    game.next();
});

test('turn callback is called when new turn passes', done => {
    function callback(game) {
        try {
            expect(game.players[game.turn].mark).toEqual('O');
            done();
        } catch (error) {
            done(error);
        }
    }
    const game = TicTacToe.newGame(null, callback);
    game.passTurn();
    game.next();
});
