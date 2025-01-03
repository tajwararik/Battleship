import { GameBoard } from "./gameBoard.js";

export class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.board = new GameBoard();
    this.previousAttacks = [];
  }

  attack(opponentBoard, x, y) {
    if (
      this.previousAttacks.some(([first, second]) => x === first && y === second)
    )
      throw Error("This position has already been attacked");
    else {
      this.previousAttacks.push([x, y]);
      return opponentBoard.receiveAttack(x, y);
    }
  }

  randomAttack(opponentBoard) {
    let x, y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      this.previousAttacks.some(([first, second]) => x === first && y === second)
    );

    this.previousAttacks.push([x, y]);
    return opponentBoard.receiveAttack(x, y);
  }
}
