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

    startNewGame() {
        this.board.display();
        let player: string = this.currentPlayer == this.playerX ? "X" : "O";
        let hint: string = `Player ${player}'s turn. Pick a square.\n(row, col): `;
        this.askForMove(hint);
    }

    /**
     * Given the hint for input, ask the player for the next move.
     * Handle the entered move accordingly.
     * @param hint 
     */
    private askForMove(hint: string) {
        this.rl.question(hint, (answer: string) => {
            let x: number = Number(answer.charAt(0));
            let y: number = Number(answer.charAt(2));
            let currentMove: Move = new Move(this.currentPlayer.side, x, y);

            if (this.board.isValidMove(currentMove)) {
                this.board.update(currentMove);

                let boardStatus: Constants.BoardStatus = this.board.checkWinner(currentMove);
                if (boardStatus == Constants.BoardStatus.Unfinished) {
                    this.currentPlayer = this.currentPlayer == this.playerO ? this.playerX : this.playerO;
                    let player: string = this.currentPlayer == this.playerX ? "X" : "O";
                    this.board.display();
                    this.askForMove(`Player ${player}'s turn. Pick a square.\n(row, col): `);
                }
                else {
                    let result: string;

                    if (boardStatus == Constants.BoardStatus.XWin) {
                        result = "X wins!";
                        this.playerX.numOfWins++;
                    }
                    else if (boardStatus == Constants.BoardStatus.OWin) {
                        result = "O wins!";
                        this.playerO.numOfWins++;
                    }
                    else {
                        result = "Draw.";
                    }

                    this.printResult(result);
                }
            }
            else {
                this.board.display();
                this.askForMove(`Invalid move: ${answer}. Pick a square.\n(row, col): `);
            }
        });
    }

    /**
     * When a game is finished, print out the result and ask for further action.
     * @param {string} result - the result of a game
     */
    private printResult(result: string) {
        result += `\nCurrent number of wins:\nPlayer X: ${this.playerX.numOfWins}, Player O: ${this.playerO.numOfWins}\nPlay again?\nAnswer(yes or no):`;
        this.board.display();

        this.rl.question(result, (answer: string) => {
            if (answer == "yes") {
                this.board.reset();
                this.startNewGame();
            }
            else if (answer == "no") {
                process.stdout.write("See you!\n");
                this.rl.close();
            }
        });
    }
}
