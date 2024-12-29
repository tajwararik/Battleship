export class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
  }
}
