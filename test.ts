import { Board } from './Board'
import { Side } from './Constants'
import { Move } from './Move' 

let b: Board = new Board;
b.update(new Move(Side.O, 1, 2));
b.update(new Move(Side.O, 0, 2));
b.update(new Move(Side.O, 1, 1));
b.update(new Move(Side.O, 2, 2));


//console.log(b.IsValidMove(new Move(Side.O, 2.0, 2.4)));

b.display();
console.log(b.checkWinner(new Move(Side.O, 2, 2)));
