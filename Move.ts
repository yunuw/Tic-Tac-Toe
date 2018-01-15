import { Side } from './Constants'

/**
 * Record the position of the move with the corresponding player.
 */
export class Move {
    side: Side;
    row: number;
    col: number;

    constructor(side: Side, x: number, y: number) {
        this.side = side;
        this.row = x;
        this.col = y;
    }
}

