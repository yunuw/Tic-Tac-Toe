import { Player } from './Player'
import { Move } from './Move'
import * as Constants from './Constants'
import { Board } from './Board'
import * as readline from 'readline'

export class Game {
    board: Board;
    playerX: Player;
    playerO: Player;
    currentPlayer: Player;
    rl: readline.ReadLine;
    readonly InputSize: number = 3;

    /**
     * Set the board and players ready for a new game.
     */
    constructor() {
        this.board = new Board();
        this.playerX = new Player(Constants.Side.X, 0);
        this.playerO = new Player(Constants.Side.O, 0);
        this.currentPlayer = this.playerX;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    /**
     * Start a new game.
     */
    startNewGame() {
        this.board.display();
        let player: string = this.currentPlayer === this.playerX ? "X" : "O";
        let hint: string = `Player ${player}'s turn. Pick a square.\n(row, col): `;
        this.askForMove(hint);
    }

    /**
     * Given the hint for input, ask the player for the next move.
     * Handle the entered move accordingly.
     * @param hint 
     */
    private askForMove(hint: string) {
        this.rl.question(hint, (input: string) => {
            let row: number = Number(input[0]);
            let col: number = Number(input[2]);
            let currentMove: Move = new Move(this.currentPlayer.side, row, col);

            if (this.isValidInput(input) && this.board.isValidMove(currentMove)) {
                this.board.update(currentMove);
                let boardStatus: Constants.BoardStatus = this.board.checkWinner(currentMove);

                if (boardStatus === Constants.BoardStatus.Unfinished) {
                    this.board.display();
                    this.currentPlayer = this.currentPlayer === this.playerO ? this.playerX : this.playerO;
                    let player: string = this.currentPlayer === this.playerX ? "X" : "O";
                    this.askForMove(`Player ${player}'s turn. Pick a square.\n(row, col): `);
                }
                else {
                    this.printResult(boardStatus);
                    this.askForPlayAgain();
                }
            }
            else {
                this.board.display();
                this.askForMove(`Invalid move: ${input}. Pick a square.\n(row, col): `);
            }
        });
    }

    /**
     * When a game is finished, print out the result and ask for further action.
     * @param {Constants.BoardStatus} boardStatus - the result of a game
     */
    private printResult(boardStatus: Constants.BoardStatus) {
        let result: string;

        if (boardStatus === Constants.BoardStatus.XWin) {
            result = "X wins!";
            this.playerX.numOfWins++;
        }
        else if (boardStatus === Constants.BoardStatus.OWin) {
            result = "O wins!";
            this.playerO.numOfWins++;
        }
        else {
            result = "Draw.";
        }

        result += `\nLatest number of wins:\n`
            + `Player X: ${this.playerX.numOfWins}, Player O: ${this.playerO.numOfWins}\n`;
        this.board.display();
        process.stdout.write(result);
    }

    /**
     * Ask the user whether they want to play again. 
     * If yes, start a new game, otherwise, end the game.
     */
    private askForPlayAgain() {
        let hint: string = `Want to play again?\nAnswer(yes or no):`;

        this.rl.question(hint, (answer: string) => {
            if (answer === "yes") {
                this.board.reset();
                this.startNewGame();
            }
            else if (answer === "no") {
                process.stdout.write("Thank you! See you next time!\n");
                this.rl.close();
            }
            else {
                this.askForPlayAgain();
            }
        });
    }

    /**
     * Given the input, check whether it's of the right format.
     * Note: If it is an empty character, Number() will convert it into 0, thus we need to check whether it's empty. 
     * @param {string} input - the input of current player.
     */
    private isValidInput(input: string): boolean {
        if (input.length !== this.InputSize
            || input[0] === " " || input[2] === " " || input[1] !== ","
            || isNaN(Number(input[0])) || isNaN(Number(input[2]))) {
            return false;
        }

        return true;
    }
}
