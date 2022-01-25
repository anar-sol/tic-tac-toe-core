import { expect } from '@jest/globals';
import TicTacToe from '../TicTacToe.js';
import TicTacToeAI from '../TicTacToeAI.js';

test('generateGameTree 1', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1); // X
    game.playMove(0, 0); // O
    game.playMove(2, 0); // X
    game.playMove(1, 0); // O
    game.playMove(0, 1); // X
    game.playMove(1, 2); // O
    const ai = TicTacToeAI.newAI(game, 0);

    const gameTree = ai.tree;
    expect(gameTree.rootNode.getRecursiveNodeData(data => data.roundEnd).length).toBe(4);
});

test('generateGameTree 2', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1); // X
    game.playMove(0, 0); // O
    game.playMove(2, 0); // X
    game.playMove(1, 0); // O
    game.playMove(0, 1); // X
    game.playMove(1, 2); // O
    game.playMove(2, 2); // X
    const ai = TicTacToeAI.newAI(game, 0);

    const gameTree = ai.tree;
    expect(gameTree.rootNode.getRecursiveNodeData(data => data.roundEnd).length).toBe(2);
});

test('generateGameTree 3', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1); // X
    game.playMove(0, 0); // O
    game.playMove(2, 0); // X
    game.playMove(1, 0); // O
    game.playMove(0, 1); // X
    game.playMove(1, 2); // O
    game.playMove(0, 2); // X
    const ai = TicTacToeAI.newAI(game, 0);

    const gameTree = ai.tree;
    expect(gameTree.rootNode.getRecursiveNodeData(data => data.roundEnd).length).toBe(1);
});

test('findCurrentState 1', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1); // X
    game.playMove(0, 0); // O
    game.playMove(2, 0); // X
    game.playMove(1, 0); // O
    game.playMove(0, 1); // X
    game.playMove(1, 2); // O
    game.playMove(0, 2); // X
    const ai = TicTacToeAI.newAI(game, 0);
    const currState = ai.findCurrentState();

    expect(currState.turn).toEqual(game.turn);
    expect(currState.grid).toEqual(game.grid);
});

test('findCurrentState 2', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1); // X
    game.playMove(0, 0); // O
    game.playMove(2, 0); // X
    game.playMove(1, 0); // O
    game.playMove(0, 1); // X
    const ai = TicTacToeAI.newAI(game, 0);
    game.playMove(1, 2); // O
    game.playMove(0, 2); // X

    const currState = ai.findCurrentState();

    expect(currState.turn).toEqual(game.turn);
    expect(currState.grid).toEqual(game.grid);
});


test('findBestNextState 1', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1); // X
    game.playMove(0, 0); // O
    game.playMove(2, 0); // X
    game.playMove(0, 1); // O
    game.playMove(1, 0); // X
    game.playMove(1, 2); // O
    const ai = TicTacToeAI.newAI(game, 1);
    const nextState = ai.findBestNextState();
    game.playMove(2, 1);

    expect(nextState.turn).toEqual(game.turn);
    expect(nextState.grid).toEqual(game.grid);
});

test('findNextMove 1', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1); // X
    game.playMove(0, 0); // O
    game.playMove(2, 0); // X
    game.playMove(0, 1); // O
    game.playMove(1, 0); // X
    game.playMove(1, 2); // O
    const ai = TicTacToeAI.newAI(game, 0);
    const nextMove = ai.findNextMove();

    expect(nextMove).toEqual({row: 0, col: 2});
});

test('findNextMove 2', () => {
    const game = TicTacToe.newGame();
    game.playMove(1, 1); // X
    game.playMove(0, 0); // O
    game.playMove(2, 0); // X
    game.playMove(0, 1); // O
    game.playMove(1, 0); // X
    game.playMove(1, 2); // O
    game.playMove(2, 2); // X
    const ai = TicTacToeAI.newAI(game, 1);
    const nextMove = ai.findNextMove();

    expect(nextMove).toEqual({row: 0, col: 2});
});
