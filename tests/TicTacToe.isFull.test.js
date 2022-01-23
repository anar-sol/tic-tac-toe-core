import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('isFull returns false for an empty grid', () => {
    const game = TicTacToe.newGame();
    expect(game.isFull()).toEqual(false);
});

test('isFull returns false when the grid contains 3 marks', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['X', 'O', 'X'],
        ['', '', ''],
        ['', '', '']
    ];
    expect(game.isFull()).toEqual(false);
});

test('isFull returns true when the grid contains 9 marks', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['X', 'O', 'X'],
        ['X', 'O', 'X'],
        ['O', 'X', 'O']
    ];
    expect(game.isFull()).toEqual(true);
});
