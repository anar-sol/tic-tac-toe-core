import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('copy copies the grid', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['O', '', ''],
        ['', 'X', ''],
        ['', '', ''],
    ];
    const gameCopy = TicTacToe.copy(game);

    expect(game.grid).toEqual(gameCopy.grid);
});

test('copy copies the players', () => {
    const game = TicTacToe.newGame();
    game.players[0] = {mark: 'X', score: 5};
    const gameCopy = TicTacToe.copy(game);

    expect(game.players).toEqual(gameCopy.players);
});

test('copy copies roundEnd', () => {
    const game = TicTacToe.newGame();
    game.roundEnd = true;
    const gameCopy = TicTacToe.copy(game);

    expect(game.roundEnd).toEqual(gameCopy.roundEnd);
});

test('copy copies turn', () => {
    const game = TicTacToe.newGame();
    const gameCopy = TicTacToe.copy(game);

    expect(game.turn).toEqual(gameCopy.turn);
});

test('copy, after playMove, copies turn', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1);
    const gameCopy = TicTacToe.copy(game);

    expect(game.turn).toEqual(gameCopy.turn);
});
