import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';


test('incrementScore add 1 to player current score', () => {
    const game = TicTacToe.newGame();
    const player = game.players[game.turn];
    const currScore = player.score;
    player.incrementScore();

    expect(player.score).toEqual(currScore + 1);
});
