import { Player } from './Player'
import { Move } from './Move'
import * as Constants from './Constants'

export class Board {
    board: Constants.Side[][];

    /**
     * Construct an empty board.
     */
    constructor() {
        this.board = [];

        for (var r: number = 0; r < 3; r++) {
            this.board[r] = [];
            for (var c: number = 0; c < 3; c++) {
                this.board[r][c] = Constants.Side.None;
            }
        }
    }

    /**
     * Empty the board when to start a new game.
     */
    reset() {
        for (var r: number = 0; r < 3; r++) {
            for (var c: number = 0; c < 3; c++) {
                this.board[r][c] = Constants.Side.None;
            }
        }
    }

    /**
     * Add the move to the board after checking its validity.
     * @param {Move} move - The latest move made by the corresponding player.
     */
    update(move: Move) {
        this.board[move.row][move.col] = move.side;
    }

    /**
     * Check wether a move is valid before update the board.
     * @param {Move} move - The latest move made by the corresponding player.
     */
    isValidMove(move: Move): boolean {

        if (move.row != 0 && move.row != 1 && move.row != 2) {
            return false;
        }
        else if (move.col != 0 && move.col != 1 && move.col != 2) {
            return false;
        }
        else if (this.board[move.row][move.col] != Constants.Side.None) {
            return false;
        }
        else {
            return true;
        }
    }

    /**
     * Display the board with the moves made by the players
     */
    display() {
        process.stdout.write("   0   1   2  \n");

        for (var r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (c == 0) {
                    process.stdout.write(String(r));
                    process.stdout.write("  ");
                }

                if (this.board[r][c] == Constants.Side.O) {
                    process.stdout.write("O");
                }
                else if (this.board[r][c] == Constants.Side.X) {
                    process.stdout.write("X");
                }
                else {
                    process.stdout.write(" ");
                }

                if (c != 2) {
                    process.stdout.write(" | ");
                }
            }

            if (r != 2) {
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
        let x = move.row;
        let y = move.col;
        let win: boolean = true;

        for (let r: number = 0; r < 3; r++) {
            if (this.board[r][y] != this.board[x][y]) {
                win = false;
            }
        }

        if (win == true) {
            return move.side == Constants.Side.O ? Constants.BoardStatus.OWin : Constants.BoardStatus.XWin;
        }

        win = true;

        for (let c: number = 0; c < 3; c++) {
            if (this.board[x][c] != this.board[x][y]) {
                win = false;
            }
        }

        if (win == true) {
            return move.side == Constants.Side.O ? Constants.BoardStatus.OWin : Constants.BoardStatus.XWin;
        }

        let draw: boolean = true;

        for (let r: number = 0; r < 3; r++) {
            for (let c: number = 0; c < 3; c++) {
                if (this.board[r][c] == Constants.Side.None) {
                    draw = false;
                }
            }
        }

        if (draw == true) {
            return Constants.BoardStatus.Draw;
        }

        return Constants.BoardStatus.Unfinished;
    }
}