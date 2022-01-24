import Utils from "./Utils.js";
import TicTacToe from './TicTacToe.js';
import TreeUtil from 'tree-util';

export default class TicTacToeAI {

    static generateGameTree(game) {
        game = TicTacToe.copy(game);
        game = Utils.setIds(game);

        const config = { id: 'id', parentid: 'parentid' };
        const states = TicTacToeAI.#getStates([game]);
        return TreeUtil.buildTrees(states, config)[0];
    }

    static #getStates(states) {
        let res = [];
        for (const state of states) {
            const nextStates = TicTacToeAI.#getNextStates(state);
            res = res.concat(TicTacToeAI.#getStates(nextStates));
        }
        return states.concat(res);
    }

    static #getNextStates(state) {
        const states = [];

        if (state.roundEnd) return states;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (state.grid[row][col] === '') {
                    let nextState = TicTacToe.copy(state);
                    nextState.playMove(row, col);
                    nextState = Utils.setIds(nextState, state.id);
                    states.push(nextState);
                }
            }
        }

        return states;
    }
}
