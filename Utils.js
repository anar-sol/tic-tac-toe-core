export default class Utils {
    static #id = 1;

    static copyGrid(grid) {
        const newGrid = [];
        for (const row of grid) {
            newGrid.push([...row]);
        }
        return newGrid;
    }

    static setIds(game, parentid = null) {
        game.id = Utils.#id++;
        game.parentid = parentid;
        return game;
    }

    static logGame(game) {
        if (!game) return
        console.log(`Player ${game.players[0].mark}: ${game.players[0].score}`);
        console.log(`Player ${game.players[1].mark}: ${game.players[1].score}`);
        console.log(`Turn ${game.players[game.turn].mark}`);
        console.log(`RoundEnd ${game.roundEnd}`);
        for (const row of game.grid) {
            console.log(row);
        }
    }
}
