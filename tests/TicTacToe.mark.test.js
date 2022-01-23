import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('mark the (0,0) cell with X', () => {
    const game = TicTacToe.newGame();
    game.mark(0, 0, 'X');
    expect(game.grid).toEqual([
        ['X', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
});

test('mark the (0,2) cell with X', () => {
    const game = TicTacToe.newGame();
    game.mark(0, 2, 'X');
    expect(game.grid).toEqual([
        ['', '', 'X'],
        ['', '', ''],
        ['', '', '']
    ]);
});

test('mark the (2,0) cell with O', () => {
    const game = TicTacToe.newGame();
    game.mark(2, 0, 'O');
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', '', ''],
        ['O', '', '']
    ]);
});

test('mark the (2,2) cell with O', () => {
    const game = TicTacToe.newGame();
    game.mark(2, 2, 'O');
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', '', ''],
        ['', '', 'O']
    ]);
});

test('mark the (1,1) cell with O', () => {
    const game = TicTacToe.newGame();
    game.mark(1, 1, 'O');
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', 'O', ''],
        ['', '', '']
    ]);
});

test('mark (1,1) cell with X then (1,0) cell with O', () => {
    const game = TicTacToe.newGame();
    game.mark(1, 1, 'X');
    game.mark(1, 0, 'O');
    expect(game.grid).toEqual([
        ['', '', ''],
        ['O', 'X', ''],
        ['', '', '']
    ]);
});

test('mark (1,2) cell twice throws an exception', () => {
    const game = TicTacToe.newGame();
    game.mark(1, 2, 'O');
    expect(() => game.mark(1, 2, 'X')).toThrow('cell (1,2) is already marked');
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', '', 'O'],
        ['', '', '']
    ]);
});

test('mark (-1,-1) cell throws an exception', () => {
    const game = TicTacToe.newGame();
    expect(() => game.mark(-1, -1, 'X')).toThrow('cell (-1,-1) is out of bounds');
});

test('mark (3,3) cell throws an exception', () => {
    const game = TicTacToe.newGame();
    expect(() => game.mark(3, 3, 'X')).toThrow('cell (3,3) is out of bounds');
});

test('mark (3,0) cell throws an exception', () => {
    const game = TicTacToe.newGame();
    expect(() => game.mark(3, 0, 'X')).toThrow('cell (3,0) is out of bounds');
});

test('mark (0,3) cell throws an exception', () => {
    const game = TicTacToe.newGame();
    expect(() => game.mark(0, 3, 'X')).toThrow('cell (0,3) is out of bounds');
});
