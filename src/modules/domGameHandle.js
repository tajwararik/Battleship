import { Game } from "./game.js";
import { Ship } from "./ships.js";

const playerBoard = document.querySelector("#player-board");
const computerBoard = document.querySelector("#computer-board");
const displayMessage = document.querySelector(".display-message");
const resetButton = document.querySelector(".btn > button");

const game = new Game();

// Creating ships for player and computer
let playerShips = [1, 2, 3, 4, 5].map((i) => new Ship(i));
let computerShips = [1, 2, 3, 4, 5].map((i) => new Ship(i));

// Default coordinates for player's ships
const playerShipsCoordinate = [
  { x: 2, y: 1, direction: "horizontal" },
  { x: 0, y: 7, direction: "horizontal" },
  { x: 2, y: 5, direction: "vertical" },
  { x: 5, y: 0, direction: "vertical" },
  { x: 8, y: 4, direction: "horizontal" },
];

// Default coordinates for computer's ships
const computerShipsCoordinate = [
  { x: 3, y: 9, direction: "horizontal" },
  { x: 9, y: 6, direction: "horizontal" },
  { x: 6, y: 5, direction: "horizontal" },
  { x: 6, y: 0, direction: "vertical" },
  { x: 0, y: 3, direction: "vertical" },
];

// PLacing ships on the board for both
function shipsPlacements(ships, board, coordinates) {
  ships.forEach((ship, index) => {
    const { x, y, direction } = coordinates[index];

    board.placeShips(ship, x, y, direction);
  });
}

shipsPlacements(playerShips, game.player.board, playerShipsCoordinate);
shipsPlacements(computerShips, game.computer.board, computerShipsCoordinate);

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

  if (game.checkGameOver()) return;

  if (this.classList.contains("ship")) {
    const [x, y] = JSON.parse(this.getAttribute("id"));
    game.player.attack(game.computer.board, x, y);
    this.classList.add("attacked");

    this.removeEventListener("click", playerAttack);

    if (game.checkGameOver()) {
      displayMessage.textContent = `${game.currentPlayer} won!!!`;
      return;
    }
  } else {
    this.classList.add("missed");

    this.removeEventListener("click", playerAttack);

    game.switchTurn();
    handleDisplayMessage();
    setTimeout(computerAttack, 1000);
  }
}

function computerAttack() {
  if (game.currentPlayer !== "computer") return;

  if (game.checkGameOver()) {
    displayMessage.textContent = `${game.currentPlayer} won!!!`;
    return;
  }

  game.computer.randomAttack(game.player.board);
  // Getting the last value of previousAttacks array
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
        // Ship found, attack again
        setTimeout(computerAttack, 1000);
      } else {
        node.classList.add("missed");
        game.switchTurn();
        setTimeout(handleDisplayMessage, 300);
      }
    }
  });
}

export function handleDisplayMessage() {
  displayMessage.textContent = `${game.currentPlayer}'s turn!`;
}

resetButton.addEventListener("click", () => {
  clearBoards();

  game.player.board.board = Array(10)
    .fill()
    .map(() => Array(10).fill(null));

  game.computer.board.board = Array(10)
    .fill()
    .map(() => Array(10).fill(null));

  playerShips = [1, 2, 3, 4, 5].map((i) => new Ship(i));
  computerShips = [1, 2, 3, 4, 5].map((i) => new Ship(i));

  changeShipsCoordinate();

  shipsPlacements(playerShips, game.player.board, playerShipsCoordinate);
  shipsPlacements(computerShips, game.computer.board, computerShipsCoordinate);

  game.currentPlayer = "player";

  createPlayerBoard();
  createComputerBoard();
  handleDisplayMessage();
});

function clearBoards() {
  // Clearing the boards
  while (playerBoard.firstChild && computerBoard.firstChild) {
    playerBoard.removeChild(playerBoard.firstChild);
    computerBoard.removeChild(computerBoard.firstChild);
  }

  // Emptying all stored values
  game.player.board.board = [];
  game.computer.board.board = [];

  game.player.previousAttacks = [];
  game.player.board.successfulAttacks = [];
  game.player.board.missedAttacks = [];

  game.computer.previousAttacks = [];
  game.computer.board.successfulAttacks = [];
  game.computer.board.missedAttacks = [];
}

function changeShipsCoordinate() {
  // Creating board for testing generated coordinates
  const playerBoard = Array(10)
    .fill()
    .map(() => Array(10).fill(null));

  const computerBoard = Array(10)
    .fill()
    .map(() => Array(10).fill(null));

  playerShipsCoordinate.forEach((_, index, array) => {
    let x, y, direction, isValid;

    do {
      isValid = true;
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      direction = Math.random() > 0.5 ? "horizontal" : "vertical";

      if (direction === "horizontal" && y + playerShips[index].length > 10)
        isValid = false;
      else if (direction === "vertical" && x + playerShips[index].length > 10)
        isValid = false;

      if (isValid) {
        for (let i = 0; i < playerShips[index].length; i++) {
          if (
            (direction === "horizontal" && playerBoard[x][y + i]) ||
            (direction === "vertical" && playerBoard[x + i][y])
          ) {
            isValid = false;
            break;
          }
        }
      }
    } while (!isValid);

    // Placing ships on the player's testing board
    for (let i = 0; i < playerShips[index].length; i++) {
      if (direction === "horizontal")
        playerBoard[x][y + i] = playerShips[index];
      else playerBoard[x + i][y] = playerShips[index];

      // Creating new coordinates
      array[index].x = x;
      array[index].y = y;
      array[index].direction = direction;
    }
  });

  computerShipsCoordinate.forEach((_, index, array) => {
    let x, y, direction, isValid;

    do {
      isValid = true;
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      direction = Math.random() > 0.5 ? "horizontal" : "vertical";

      if (direction === "horizontal" && y + computerShips[index].length > 10)
        isValid = false;
      else if (direction === "vertical" && x + computerShips[index].length > 10)
        isValid = false;

      if (isValid) {
        for (let i = 0; i < computerShips[index].length; i++) {
          if (
            (direction === "horizontal" && computerBoard[x][y + i]) ||
            (direction === "vertical" && computerBoard[x + i][y])
          ) {
            isValid = false;
            break;
          }
        }
      }
    } while (!isValid);

    // Placing ships on the computer's testing board
    for (let i = 0; i < computerShips[index].length; i++) {
      if (direction === "horizontal")
        computerBoard[x][y + i] = computerShips[index];
      else computerBoard[x + i][y] = computerShips[index];

      // Creating new coordinates
      array[index].x = x;
      array[index].y = y;
      array[index].direction = direction;
    }
  });
}
