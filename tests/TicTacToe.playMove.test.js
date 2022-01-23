import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('playMove: mark a cell and pass turn and so on', () => {
    const game = TicTacToe.newGame();
    const player1 = game.players[game.turn];
    const player2 = game.players[(game.turn + 1) % game.players.length];

    game.playMove(1, 1);
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', player1.mark, ''],
        ['', '', '']
    ]);
    expect(game.players[game.turn]).toEqual(player2);

    game.playMove(2, 2);
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', player1.mark, ''],
        ['', '', player2.mark]
    ]);
    expect(game.players[game.turn]).toEqual(player1);
});

test('playMove: can\'t play a move on an already marked cell', () => {
    const game = TicTacToe.newGame();
    const player1 = game.players[game.turn];
    game.playMove(1, 1);
    expect(() => game.playMove(1, 1)).toThrow('cell (1,1) is already marked');
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', player1.mark, ''],
        ['', '', '']
    ]);
});

test('playMove: when aligned increment the current player score', () => {
    const game = TicTacToe.newGame();
    const player1 = game.players[game.turn];
    const player2 = game.players[(game.turn + 1) % game.players.length];

    game.playMove(1, 1); // player 1
    game.playMove(1, 0);
    game.playMove(0, 0); // player 1
    game.playMove(2, 1);
    game.playMove(2, 2); // player 1
    expect(player1.score).toEqual(1);
    expect(player2.score).toEqual(0);
});

test('playMove: when aligned ends the round', () => {
    const game = TicTacToe.newGame();
    const player1 = game.players[game.turn];

    game.playMove(1, 1); // player 1
    game.playMove(1, 0);
    game.playMove(0, 0); // player 1
    game.playMove(2, 1);
    game.playMove(2, 2); // player 1
    // there's an alignment, end the round
    expect(game.roundEnd).toBeTruthy();
    expect(game.grid).toEqual([
        ['X', '', ''],
        ['O', 'X', ''],
        ['', 'O', 'X']
    ]);
    expect(game.players[game.turn]).toEqual(player1);
});

test('playMove: when roundEnd is true, does nothing', () => {
    const game = TicTacToe.newGame();
    const player1 = game.players[game.turn];

    game.roundEnd = true;

    game.playMove(1, 1);
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
    expect(game.players[game.turn]).toEqual(player1);
});

test('playMove: when the grid is full ends the round', () => {
    const game = TicTacToe.newGame();
    const player1 = game.players[game.turn];

    game.playMove(1, 1); // player 1
    game.playMove(0, 0);
    game.playMove(2, 2); // player 1
    game.playMove(2, 0);
    game.playMove(1, 0); // player 1
    game.playMove(1, 2);
    game.playMove(0, 1); // player 1
    game.playMove(2, 1);
    game.playMove(0, 2); // player 1

    // there's an alignment, end the round
    expect(game.roundEnd).toBeTruthy();
    expect(game.grid).toEqual([
        ['O', 'X', 'X'],
        ['X', 'X', 'O'],
        ['O', 'O', 'X']
    ]);
    expect(game.players[game.turn]).toEqual(player1);
});

