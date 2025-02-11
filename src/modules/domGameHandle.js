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

function placeShips(ships, boards, coordinates) {
  ships.forEach((ship, index) => {
    const { x, y, direction } = coordinates[index];

    boards.placeShips(ship, x, y, direction);
  });
}

placeShips(ships, game.player.board, playerShipsCoordinate);
placeShips(ships, game.computer.board, computerShipsCoordinate);

const boardCells = game.player.board.board.length;

export function createPlayerBoard() {
  for (let i = 0; i < boardCells; i++) {
    for (let j = 0; j < boardCells; j++) {
      const div = document.createElement("div");
      div.setAttribute("id", `[${i}, ${j}]`);
      div.classList.add("grid");
      if (game.player.board.board[i][j] instanceof Ship)
        div.classList.add("ship");
      playerBoard.append(div);
    }
  }
}

export function createComputerBoard() {
  for (let i = 0; i < boardCells; i++) {
    for (let j = 0; j < boardCells; j++) {
      const div = document.createElement("div");
      div.setAttribute("id", `[${i}, ${j}]`);
      div.classList.add("grid");
      if (game.computer.board.board[i][j] instanceof Ship)
        div.classList.add("ship");
      div.addEventListener("click", playerAttack);
      computerBoard.append(div);
    }
  }
}

function playerAttack() {
  if (game.currentPlayer !== "player") return;

  if (this.classList.contains("ship")) {
    const [x, y] = JSON.parse(this.getAttribute("id"));
    game.player.attack(game.computer.board, x, y);
    this.classList.add("attacked");

    this.removeEventListener("click", playerAttack);
  } else {
    this.classList.add("missed");

    this.removeEventListener("click", playerAttack);

    game.switchTurn();
    setTimeout(computerAttack, 1000);
  }
}

function computerAttack() {
  if (game.currentPlayer !== "computer") return;

  game.computer.randomAttack(game.player.board);
  const [coordinates] = game.computer.previousAttacks.slice(-1);
  const [x, y] = coordinates;
  updatePlayerBoardUI(x, y);
}

function updatePlayerBoardUI(x, y) {
  const nodes = playerBoard.querySelectorAll(".grid");
  nodes.forEach((node) => {
    const [first, second] = JSON.parse(node.id);
    if (x === first && y === second) {
      if (node.classList.contains("ship")) {
        node.classList.add("attacked");
        setTimeout(computerAttack, 1000);
      } else {
        node.classList.add("missed");
        game.switchTurn();
      }
    }
  });
}
