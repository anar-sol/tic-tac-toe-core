import { expect } from '@jest/globals';
import TicTacToe from './TicTacToe.js';


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

test('incrementScore add 1 to player current score', () => {
    const game = TicTacToe.newGame();
    const player = game.players[game.turn];
    const currScore = player.score;
    player.incrementScore();

    expect(player.score).toEqual(currScore + 1);
});

test('newRound sets endRound to false', () => {
    const game = TicTacToe.newGame();

    game.newRound();
    expect(game.roundEnd).toBeFalsy();
});

test('newRound changes first player', () => {
    const game = TicTacToe.newGame();
    const first = game.players[game.turn];

    game.newRound();
    expect(game.players[game.turn]).not.toEqual(first);
});

test('newRound (after passTurn) changes first player', () => {
    const game = TicTacToe.newGame();
    const first = game.players[game.turn];
    
    game.passTurn();
    game.newRound();
    expect(game.players[game.turn]).not.toEqual(first);
});

test('newRound reset grid', () => {
    const game = TicTacToe.newGame();
    game.game = [
        ['', 'X', ''],
        ['', 'O', ''],
        ['', 'X', 'O'],
    ];

    game.newRound();
    expect(game.grid).toEqual([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
});

test('turn callback is called when new game starts', done => {
    function callback(game) {
        try {
            expect(game.players[game.turn].mark).toEqual('X');
            done();
        } catch (error) {
            done(error);
        }
    }
    const game = TicTacToe.newGame(callback);
    game.next();
});

test('turn callback is called when new round is started', done => {
    function callback(game) {
        try {
            expect(game.players[game.turn].mark).toEqual('O');
            done();
        } catch (error) {
            done(error);
        }
    }
    const game = TicTacToe.newGame(null, callback);
    game.newRound();
    game.next();
});

test('turn callback is called when new turn passes', done => {
    function callback(game) {
        try {
            expect(game.players[game.turn].mark).toEqual('O');
            done();
        } catch (error) {
            done(error);
        }
    }
    const game = TicTacToe.newGame(null, callback);
    game.passTurn();
    game.next();
});

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
