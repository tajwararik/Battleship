import { Player } from "./player.js";

export class Game {
  constructor() {
    this.player = new Player("Player");
    this.computer = new Player("Computer", true);
  }
}
