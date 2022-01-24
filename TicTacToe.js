import Utils from "./Utils.js";

class Player {
    constructor(mark, score) {
        this.mark = mark;
        this.score = score;
    }

    static create(mark, score = 0) {
        return new Player(mark, score);
    }

    static copy(player) {
        return new Player(player.mark, player.score);
    }

    incrementScore() {
        this.score += 1;
    }
}

class Alignment {
    constructor(id, mark) {
        this.id = id;
        this.mark = mark;
    }
}

export default class TicTacToe {
    static MAGIC_SQUARE = [
        [8, 1, 6],
        [3, 5, 7],
        [4, 9, 2]
    ];

    constructor(from = {}) {
        this.callBacks = from.callBacks;
        if (from.players) {
            this.players = [Player.copy(from.players[0]), Player.copy(from.players[1])];
        } else {
            this.players = [Player.create('X'), Player.create('O')];
        }
        if (from.roundEnd) {
            this.roundEnd = from.roundEnd;
        } else {
            this.roundEnd = false;
        }
        if (from.grid) {
            this.grid = Utils.copyGrid(from.grid);
        } else {
            this.grid = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
        }
        if (from.first) {
            this.first = from.first;
        } else {
            this.first = 0;
        }
        if (from.turn !== undefined) {
            this.turn = from.turn;
        } else {
            this.turn = this.first;
            this.first = (this.first + 1) % this.players.length;
        }
    }

    static newGame(onTurnX = null, onTurnO = null) {
        return new TicTacToe({
            callBacks: [onTurnX, onTurnO]
        });
    }

    static copy(game) {
        return new TicTacToe(game);
    }

    static get MAGIC_SQUARE() {
        return TicTacToe.MAGIC_SQUARE;
    }

    newRound() {
        this.roundEnd = false;
        this.grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.turn = this.first;
        this.first = (this.first + 1) % this.players.length;
    }

    next() {
        if (this.callBacks[this.turn] !== null) this.callBacks[this.turn](this);
    }

    passTurn() {
        this.turn = (this.turn + 1) % this.players.length;
    }

    mark(row, col, mark) {
        if (row >= 0 && row < this.grid.length && col >= 0 && col < this.grid.length) {
            if (this.grid[row][col] === '') {
                this.grid[row][col] = mark;
            } else {
                throw new Error(`cell (${row},${col}) is already marked`);
            }
        } else {
            throw new Error(`cell (${row},${col}) is out of bounds`);
        }
    }

    checkAlignment() {
        return this.#isHorizontallyAligned() ||
            this.#isVerticallyAligned() ||
            this.#isDiagonallyAligned();
    }

    isFull() {
        let marks = 0;
        for (const row of this.grid) {
            for (const cell of row) {
                if (cell !== '') {
                    marks++;
                }
            }
        }
        return marks === 9;
    }

    playMove(row, col) {
        if (!this.roundEnd) {
            const currPlayer = this.players[this.turn];
            this.mark(row, col, currPlayer.mark);
            const align = this.checkAlignment();
            if (align !== null) {
                currPlayer.incrementScore();
                this.roundEnd = true;
            } else if (this.isFull()) {
                this.roundEnd = true;
            } else {
                this.passTurn();
            }
        }
    }

    #isHorizontallyAligned() {
        for (let row = 0; row < 3; row++) {
            let sum = 0;
            for (let col = 0; col < 3; col++) {
                let cell = this.grid[row][col];
                let magicCell = TicTacToe.MAGIC_SQUARE[row][col];
                if (cell !== '') {
                    sum += cell === 'X'? magicCell: magicCell * 2;
                }
            }
            if (sum === 15) return new Alignment(row, 'X');
            if (sum === 30) return new Alignment(row, 'O');
        }
        return null;
    }

    #isVerticallyAligned() {
        for (let col = 0; col < 3; col++) {
            let sum = 0;
            for (let row = 0; row < 3; row++) {
                let cell = this.grid[row][col];
                let magicCell = TicTacToe.MAGIC_SQUARE[row][col];
                if (cell !== '') {
                    sum += cell === 'X'? magicCell: magicCell * 2;
                }
            }
            if (sum === 15) return new Alignment(col + 3, 'X');
            if (sum === 30) return new Alignment(col + 3, 'O');
        }
        return null;
    }

    #isDiagonallyAligned() {
        const grid = this.grid;

        let sum = 0;
        let row, col;
        for (row = col = 0; row < 3; row++, col++) {
            let cell = this.grid[row][col];
            let magicCell = TicTacToe.MAGIC_SQUARE[row][col];
            if (cell !== '') {
                sum += cell === 'X'? magicCell: magicCell * 2;
            }
        }
        if (sum === 15) return new Alignment(6, 'X');
        if (sum === 30) return new Alignment(6, 'O');

        sum = 0;
        for (row = 0, col = 2; row < 3; row++, col--) {
            let cell = this.grid[row][col];
            let magicCell = TicTacToe.MAGIC_SQUARE[row][col];
            if (cell !== '') {
                sum += cell === 'X'? magicCell: magicCell * 2;
            }
        }
        if (sum === 15) return new Alignment(7, 'X');
        if (sum === 30) return new Alignment(7, 'O');

        return null;
    }
}
