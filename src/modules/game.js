import { Player } from "./player.js";

export class Game {
  constructor() {
    this.player = new Player("Player");
    this.computer = new Player("Computer", true);
    this.currentPlayer = "player";
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === "player" ? "computer" : "player";
  }
}
