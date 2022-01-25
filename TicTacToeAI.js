import Utils from "./Utils.js";
import TicTacToe from './TicTacToe.js';
import TreeUtil from 'tree-util';

export default class TicTacToeAI {
    static #config = { id: 'id', parentid: 'parentid' };
    static #dataConfig = { referenceid: 'referenceid', collectionname: 'items' };

    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.tree = this.generateGameTree(game);
    }

    static newAI(game, player) {
        return new TicTacToeAI(game, player);
    }

    findCurrentState() {
        const currState = this.tree.rootNode.getRecursiveNodeData((state) => {
            return (state.turn === this.game.turn &&
                this.#areGridsEqual(state.grid, this.game.grid))
        });
        if (currState !== null) return currState[0];
        return null;
    }

    findBestNextState() {
        const currState = this.findCurrentState();
        const currNode = this.tree.getNodeById(currState.referenceid);
        console.log('***************************************');
        console.log(currNode);
        let maxWeightedNode = null;
        if (currNode) {
            console.log('************ in if')
            maxWeightedNode = currNode.children[0];

            for (const node of currNode.children) {
                if (node.items[0].weight > maxWeightedNode.items[0].weight) {
                    maxWeightedNode = node;
                }
            }
        }
        console.log(maxWeightedNode.items[0]);
        return maxWeightedNode.items[0];
    }

    findNextMove() {
        if (this.findCurrentState().turn === this.player) {
            const nextState = this.findBestNextState();
            return this.#findGridsDiff(this.game.grid, nextState.grid);
        }
        return null;
    }

    generateGameTree(game) {
        const root = Utils.setIds({});
        const tree = TreeUtil.buildTrees([root], TicTacToeAI.#config)[0];
        game = TicTacToe.copy(game);
        game.referenceid = root.id;
        tree.addData([game], TicTacToeAI.#dataConfig);
        return this.#generateNextNodes(tree.rootNode, tree);
    }

    #findGridsDiff(grid1, grid2) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (grid1[row][col] !== grid2[row][col])
                    return {row: row, col: col};
            }
        }
        return null;
    }

    #areGridsEqual(grid1, grid2) {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (grid1[row][col] !== grid2[row][col]) return false;
            }
        }
        return true;
    }

    #maxNodes(nodes) {
        let maxWeight = Number.NEGATIVE_INFINITY;
        for (const node of nodes) {
            const currWeight = node.items[0].weight;
            if (currWeight > maxWeight) {
                maxWeight = currWeight;
            }
        }
        return maxWeight;
    }

    #evaluateLeaf(state) {
        if (state.roundEnd) {
            let weight = 0;
            const align = state.checkAlignment();
            if (align !== null) {
                if (align.mark === this.game.players[this.player].mark) {
                    weight = 10;
                } else {
                    weight = -10;
                }
            }
            state.weight = weight;
        }
    }

    #generateNextNodes(node, tree) {
        const state = node.items[0];
        const nextStates = this.#getNextStates(state);
        const nextNodes = [];
        for (const nextState of nextStates) {
            const nextNode = Utils.setIds({}, node.id);
            tree.createNode(nextNode, TicTacToeAI.#config);

            nextState.referenceid = nextNode.id;
            tree.addData([nextState], TicTacToeAI.#dataConfig);
            nextNodes.push(nextNode);
        }

        for (const child of node.children) {
            this.#generateNextNodes(child, tree);
        }

        if (state.weight === undefined) {
            state.weight = this.#maxNodes(node.children);
        }

        return tree;
    }

    #getNextStates(state) {
        const nextStates = [];

        if (!state.roundEnd) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (state.grid[row][col] === '') {
                        let nextState = TicTacToe.copy(state);
                        nextState.playMove(row, col);
                        nextStates.push(nextState);
                    }
                }
            }
        } else {
            this.#evaluateLeaf(state);
        }

        return nextStates;
    }
}
