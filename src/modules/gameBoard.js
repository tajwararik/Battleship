import { Ship } from "./ships";

export class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));

    this.successfulAttacks = [];
    this.missedAttacks = [];
  }

  placeShips(ship, x, y, direction) {
    if (direction === "horizontal") {
      if (y + ship.length >= 10) throw Error("Ship out of bounds");

      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i]) throw Error("Overlap detected");

        this.board[x][y + i] = ship;
      }
    } else if (direction === "vertical") {
      if (x + ship.length >= 10) throw Error("Ship out of bounds");

      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y]) throw Error("Overlap detected");

        this.board[x + i][y] = ship;
      }
    }
  }

  receiveAttack(x, y) {
    const target = this.board[x][y];

    if (
      this.missedAttacks.some(
        ([first, second]) => x === first && y === second
      ) ||
      this.successfulAttacks.some(
        ([first, second]) => x === first && y === second
      )
    )
      throw Error("Already has been attacked");
    else if (target === null) {
      this.missedAttacks.push([x, y]);
      return "Miss";
    } else if (target instanceof Ship) {
      target.hit();
      this.successfulAttacks.push([x, y]);
      return "Hit";
    }
  }
}
