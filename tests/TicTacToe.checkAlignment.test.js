import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('checkAlignment with an empty grid return null', () => {
    const game = TicTacToe.newGame();
    expect(game.checkAlignment()).toBeNull();
});

test('checkAlignment with the 2nd row filled with Xs and Os returns null', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', ''],
        ['X', 'X', 'O'],
        ['', '', '']
    ];
    expect(game.checkAlignment()).toBeNull();
});

test('checkAlignment with the 1st row filled with X returns X', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['X', 'X', 'X'],
        ['', '', ''],
        ['', '', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 0, mark: 'X'});
});

test('checkAlignment with the 2nd row filled with X returns X', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', ''],
        ['X', 'X', 'X'],
        ['', '', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 1, mark: 'X'});
});

test('checkAlignment with the 3rd row filled with X returns X', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', ''],
        ['', '', ''],
        ['X', 'X', 'X']
    ];
    expect(game.checkAlignment()).toEqual({id: 2, mark: 'X'});
});

test('checkAlignment with the 1st row filled with O returns O', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['O', 'O', 'O'],
        ['', '', ''],
        ['', '', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 0, mark: 'O'});
});

test('checkAlignment with the 2nd row filled with O returns O', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', ''],
        ['O', 'O', 'O'],
        ['', '', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 1, mark: 'O'});
});

test('checkAlignment with the 3rd row filled with O returns O', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', ''],
        ['', '', ''],
        ['O', 'O', 'O']
    ];
    expect(game.checkAlignment()).toEqual({id: 2, mark: 'O'});
});

test('checkAlignment with the 1st col filled with X returns X', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['X', '', ''],
        ['X', '', ''],
        ['X', '', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 3, mark: 'X'});
});

test('checkAlignment with the 2nd col filled with X returns X', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', 'X', ''],
        ['', 'X', ''],
        ['', 'X', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 4, mark: 'X'});
});

test('checkAlignment with the 3rd col filled with X returns X', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', 'X'],
        ['', '', 'X'],
        ['', '', 'X']
    ];
    expect(game.checkAlignment()).toEqual({id: 5, mark: 'X'});
});

test('checkAlignment with the 1st col filled with O returns O', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['O', '', ''],
        ['O', '', ''],
        ['O', '', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 3, mark: 'O'});
});

test('checkAlignment with the 2nd col filled with O returns O', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', 'O', ''],
        ['', 'O', ''],
        ['', 'O', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 4, mark: 'O'});
});

test('checkAlignment with the 3rd col filled with O returns O', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', 'O'],
        ['', '', 'O'],
        ['', '', 'O']
    ];
    expect(game.checkAlignment()).toEqual({id: 5, mark: 'O'});
});

test('checkAlignment with the 1st diagonal filled with O returns O', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['O', '', ''],
        ['', 'O', ''],
        ['', '', 'O']
    ];
    expect(game.checkAlignment()).toEqual({id: 6, mark: 'O'});
});

test('checkAlignment with the 1st diagonal filled with X returns X', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['X', '', ''],
        ['', 'X', ''],
        ['', '', 'X']
    ];
    expect(game.checkAlignment()).toEqual({id: 6, mark: 'X'});
});

test('checkAlignment with the 2nd diagonal filled with O returns O', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', 'O'],
        ['', 'O', ''],
        ['O', '', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 7, mark: 'O'});
});

test('checkAlignment with the 2nd diagonal filled with X returns X', () => {
    const game = TicTacToe.newGame();
    game.grid = [
        ['', '', 'X'],
        ['', 'X', ''],
        ['X', '', '']
    ];
    expect(game.checkAlignment()).toEqual({id: 7, mark: 'X'});
});
