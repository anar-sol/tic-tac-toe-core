import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';
import Utils from '../Utils.js';

test('setIds returns a state a default id', () => {
    const game = TicTacToe.newGame();
    const state = Utils.setIds(game);

    expect(state.id).not.toBeNaN();
});

test('setIds returns a state null parentId', () => {
    const game = TicTacToe.newGame();
    const state = Utils.setIds(game);

    expect(state.parentid).toBeNull();
});

test('setIds returns a state parentId', () => {
    const game = TicTacToe.newGame();
    const state = Utils.setIds(game, 1);

    expect(state.parentid).toBe(1);
});

test('copyGrid returns a copy of the passed grid', () => {
    const grid = [
        ['X', 'O', ''],
        ['', 'X', ''],
        ['X', '', 'X'],
    ];
    const copy = Utils.copyGrid(grid);

    expect(copy).toEqual(grid);
    expect(copy).not.toBe(grid);
});
