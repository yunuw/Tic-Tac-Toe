import { Player } from './Player'
import { Move } from './Move'
import * as Constants from './Constants'

export class Board {
    readonly boardSize = Constants.BoardSize;
    board: Constants.Side[][];

    /**
     * Construct an empty board.
     */
    constructor() {
        this.board = [];

        for (var row: number = 0; row < this.boardSize; row++) {
            this.board[row] = [];
            for (var col: number = 0; col < this.boardSize; col++) {
                this.board[row][col] = Constants.Side.None;
            }
        }
    }

    /**
     * Reset the board to empty when start a new game.
     */
    reset() {
        for (var row: number = 0; row < this.boardSize; row++) {
            for (var col: number = 0; col < this.boardSize; col++) {
                this.board[row][col] = Constants.Side.None;
            }
        }
    }

    /**
     * Update the board given the move.
     * @param {Move} move - The latest move made by the corresponding player.
     */
    update(move: Move) {
        this.board[move.row][move.col] = move.side;
    }

    /**
     * Check whether a move is valid.
     * @param {Move} move - The latest move made by the corresponding player.
     */
    isValidMove(move: Move): boolean {
        if (move.row >= this.boardSize || move.col >= this.boardSize
            || this.board[move.row][move.col] !== Constants.Side.None) {
            return false;
        }

        return true;
    }

    /**
     * Display the board with the moves made by the players
     */
    display() {
        // TODO: change display according to board size
        process.stdout.write("   0   1   2  \n");

        for (var row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (col === 0) {
                    process.stdout.write(String(row));
                    process.stdout.write("  ");
                }

                if (this.board[row][col] === Constants.Side.O) {
                    process.stdout.write("O");
                }
                else if (this.board[row][col] === Constants.Side.X) {
                    process.stdout.write("X");
                }
                else {
                    process.stdout.write(" ");
                }

                if (col !== this.boardSize - 1) {
                    process.stdout.write(" | ");
                }
            }

            if (row !== this.boardSize - 1) {
                process.stdout.write("\n  --- --- ---\n");
            }
        }

        process.stdout.write("\n");
    }

    /**
     * Given the latest move, return the current status of the board.
     * @param {Move} move - The latest move made by the corresponding player.
     */
    checkWinner(move: Move): Constants.BoardStatus {
        if (this.checkWinnerHorizontal(move)) {
            return this.getWinner(move);
        }

        if (this.checkWinnerVertical(move)) {
            return this.getWinner(move);
        }

        if (this.checkWinnerDiagonalL2R(move)) {
            return this.getWinner(move);
        }

        if (this.checkWinnerDiagonalR2L(move)) {
            return this.getWinner(move);
        }

        if (this.checkFullBoard()) {
            return Constants.BoardStatus.Draw;
        }

        return Constants.BoardStatus.Unfinished;
    }

    private getWinner(move: Move): Constants.BoardStatus {
        return move.side === Constants.Side.O ? Constants.BoardStatus.OWin : Constants.BoardStatus.XWin;
    }

    private checkWinnerHorizontal(move: Move): boolean {
        for (let row: number = 0; row < this.boardSize; row++) {
            if (this.board[row][move.col] !== this.board[move.row][move.col]) {
                return false;
            }
        }

        return true;
    }

    private checkWinnerVertical(move: Move): boolean {
        for (let col: number = 0; col < this.boardSize; col++) {
            if (this.board[move.row][col] !== this.board[move.row][move.col]) {
                return false;
            }
        }

        return true;
    }

    /**
     * Given the move, check if the corresponding player win on the diagonal direction from left to right.
     * @param {Move} move - The latest move made by the corresponding player.
     */
    private checkWinnerDiagonalL2R(move: Move): boolean {
        if (move.row === move.col) {
            for (let pos: number = 0; pos < this.boardSize; pos++) {
                if (this.board[pos][pos] !== this.board[move.row][move.col]) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    /**
     * Given the move, check if the corresponding player win on the diagonal direction from right to left.
     * @param {Move} move - The latest move made by the corresponding player.
     */
    private checkWinnerDiagonalR2L(move: Move): boolean {
        if (move.row + move.col === this.boardSize - 1) {
            for (let pos: number = 0; pos < this.boardSize; pos++) {
                if (this.board[pos][this.boardSize - pos] != this.board[move.row][move.col]) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    private checkFullBoard(): boolean {
        for (let row: number = 0; row < this.boardSize; row++) {
            for (let col: number = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === Constants.Side.None) {
                    return false;
                }
            }
        }

        return true;
    }
}
