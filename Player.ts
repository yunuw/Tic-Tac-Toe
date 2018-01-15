import { Side } from './Constants'

/**
 * Record the side and the total number of wins for the player.
 */
export class Player {
    side: Side;
    numOfWins: number;

    constructor(side: Side, numOfWins: number) {
        this.side = side;
        this.numOfWins = numOfWins;
    }
}