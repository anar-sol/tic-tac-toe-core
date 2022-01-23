import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('newRound sets endRound to false', () => {
    const game = TicTacToe.newGame();

    game.newRound();
    expect(game.roundEnd).toBeFalsy();
});

test('newRound changes first player', () => {
    const game = TicTacToe.newGame();
    const first = game.players[game.turn];

    game.newRound();
    expect(game.players[game.turn]).not.toEqual(first);
});

test('newRound (after passTurn) changes first player', () => {
    const game = TicTacToe.newGame();
    const first = game.players[game.turn];
    
    game.passTurn();
    game.newRound();
    expect(game.players[game.turn]).not.toEqual(first);
});

test('newRound reset grid', () => {
    const game = TicTacToe.newGame();
    game.game = [
        ['', 'X', ''],
        ['', 'O', ''],
        ['', 'X', 'O'],
    ];

    game.newRound();
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
});
