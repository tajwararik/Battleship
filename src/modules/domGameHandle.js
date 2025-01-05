import { Game } from "./game.js";

const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#computer-board");

const game = new Game();

const boardCells = game.player.board.board.length;

export function createPlayerBoard() {
  for (let i = 0; i < boardCells; i++) {
    for (let j = 0; j < boardCells; j++) {
      const div = document.createElement("div");
      div.classList.add("grid");
      div.setAttribute("id", `${[i, j]}`);
      playerBoard.append(div);
    }
  }
}

export function createComputerBoard() {
  for (let i = 0; i < boardCells; i++) {
    for (let j = 0; j < boardCells; j++) {
      const div = document.createElement("div");
      div.classList.add("grid");
      div.setAttribute("id", `${[i, j]}`);
      computerBoard.append(div);
    }
  }
}
