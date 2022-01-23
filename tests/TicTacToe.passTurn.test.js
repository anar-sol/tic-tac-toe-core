import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';

test('passTurn passes turn from player 1 to player 2', () => {
    const game = TicTacToe.newGame();
    const player1 = game.players[game.turn];
    game.passTurn();
    expect(game.players[game.turn]).not.toEqual(player1);
});

test('passTurn passes turn from player 1 to player 2 then to player 2 again', () => {
    const game = TicTacToe.newGame();
    const player1 = game.players[game.turn];
    game.passTurn();
    game.passTurn();
    expect(game.players[game.turn]).toEqual(player1);
});
