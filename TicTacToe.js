class Player {
    constructor(mark) {
        this.mark = mark;
        this.score = 0;
    }

    incrementScore() {
        this.score += 1;
    }

    toString() {
        return `Player {mark: ${this.mark}, score: ${this.score}}`;
    }
}

class Alignment {
    constructor(id, mark) {
        this.id = id;
        this.mark = mark;
    }
}

export default class TicTacToe {
    constructor() {
        this.magicSquare = [
            [8, 1, 6],
            [3, 5, 7],
            [4, 9, 2]
        ];
        this.first = 0;
        this.#initGrid();
        this.#initPlayers();
        this.#initTurn();
    }

    #initGrid() {
        this.grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    #initPlayers() {
        this.players = [
            new Player('X'),
            new Player('O')
        ];
    }

    #initTurn() {
        this.turn = this.first;
        this.first = (this.first + 1) % this.players.length;
    }

    static newGame() {
        return new TicTacToe();
    }

    newRound() {
        this.#initGrid();
        this.#initTurn();
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

    #isHorizontallyAligned() {
        for (let row = 0; row < 3; row++) {
            let sum = 0;
            for (let col = 0; col < 3; col++) {
                let cell = this.grid[row][col];
                let magicCell = this.magicSquare[row][col];
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
                let magicCell = this.magicSquare[row][col];
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
            let magicCell = this.magicSquare[row][col];
            if (cell !== '') {
                sum += cell === 'X'? magicCell: magicCell * 2;
            }
        }
        if (sum === 15) return new Alignment(6, 'X');
        if (sum === 30) return new Alignment(6, 'O');

        sum = 0;
        for (row = 0, col = 2; row < 3; row++, col--) {
            let cell = this.grid[row][col];
            let magicCell = this.magicSquare[row][col];
            if (cell !== '') {
                sum += cell === 'X'? magicCell: magicCell * 2;
            }
        }
        if (sum === 15) return new Alignment(7, 'X');
        if (sum === 30) return new Alignment(7, 'O');

        return null;
    }

    playMove(row, col) {
        const currPlayer = this.players[this.turn];
        this.mark(row, col, currPlayer.mark);
        const align = this.checkAlignment();
        if (align !== null && align.mark === currPlayer.mark) {
            currPlayer.score += 1;
            this.newRound();
        } else if (this.isFull()) {
            this.newRound();
        } else {
            this.passTurn();
        }
    }

    log() {
        for (const player of this.players) {
            console.log(player.toString());
        }
        console.log(`Turn ${this.turn}`);
        for (const row of this.grid) {
            console.log(row);
        }
    }
    /*
        toString() {
            return this.grid.toString();
        }
    */
}
