import TicTacToe from './TicTacToe.js';

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class TicTacToeRand {
    static playRandomMove(game) {
        let row, col;
        do {
            row = rand(0, 2);
            col = rand(0, 2);
        } while (game.grid[row][col] !== '');
        game.playMove(row, col);
    }
}
