import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('newGame init a new grid', () => {
    const game = TicTacToe.newGame();
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
});

test('newGame init two players', () => {
    const game = TicTacToe.newGame();
    expect(game.players).toEqual([{mark: 'X', score: 0}, {mark: 'O', score: 0}]);
});

test('newGame player X starts first', () => {
    const game = TicTacToe.newGame();
    expect(game.players[game.turn].mark).toEqual('X');
});
