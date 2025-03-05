import { Player } from "./player.js";

export class Game {
  constructor() {
    this.player = new Player("Player");
    this.computer = new Player("Computer");
    this.currentPlayer = "player";
  }

  switchTurn() {
    // Changing the current player
    this.currentPlayer =
      this.currentPlayer === "player" ? "computer" : "player";
  }

  checkGameOver() {
    if (this.player.board.allShipsSunk() || this.computer.board.allShipsSunk())
      return true;
  }
}
