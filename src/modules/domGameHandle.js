import { Game } from "./game.js";
import { Ship } from "./ships.js";

const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#computer-board");

const game = new Game();

const ships = [new Ship(1), new Ship(2), new Ship(3), new Ship(4), new Ship(5)];

const playerShipsCoordinate = [
  { x: 2, y: 1, direction: "horizontal" },
  { x: 0, y: 7, direction: "horizontal" },
  { x: 2, y: 5, direction: "vertical" },
  { x: 5, y: 0, direction: "vertical" },
  { x: 8, y: 4, direction: "horizontal" },
];

const computerShipsCoordinate = [
  { x: 3, y: 9, direction: "horizontal" },
  { x: 9, y: 6, direction: "horizontal" },
  { x: 6, y: 5, direction: "horizontal" },
  { x: 6, y: 0, direction: "vertical" },
  { x: 0, y: 3, direction: "vertical" },
];

const boardCells = game.player.board.board.length;

export function createPlayerBoard() {
  for (let i = 0; i < boardCells; i++) {
    for (let j = 0; j < boardCells; j++) {
      const div = document.createElement("div");
      div.classList.add("grid");
      playerBoard.append(div);
    }
  }
}

export function createComputerBoard() {
  for (let i = 0; i < boardCells; i++) {
    for (let j = 0; j < boardCells; j++) {
      const div = document.createElement("div");
      div.classList.add("grid");
      computerBoard.append(div);
    }
  }
}
