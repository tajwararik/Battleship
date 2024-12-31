import { GameBoard } from "./gameBoard.js";
import { Ship } from "./ships.js";

describe("Game board class tests", () => {
  let gameBoard;

  beforeEach(() => {
    gameBoard = new GameBoard();
  });

  test("Checking if game board exists", () => {
    expect(gameBoard.board).toBeDefined();
  });

  test("Checking if the board has 10 rows", () => {
    expect(gameBoard.board.length).toBe(10);
  });

  test("Checking if the board has 10 columns", () => {
    gameBoard.board.forEach((x) => expect(x.length).toBe(10));
  });

  test("Checking if all values of the board is null", () => {
    gameBoard.board.forEach((x) => {
      x.forEach((y) => expect(y).toBeNull());
    });
  });
});

describe("Ship placement tests", () => {
  let gameBoard, ship;

  beforeEach(() => {
    gameBoard = new GameBoard();
    ship = new Ship(3);
  });

  test("Horizontally placement tests", () => {
    gameBoard.placeShips(ship, 0, 0, "horizontal");

    expect(gameBoard.board[0][0]).toBe(ship);
    expect(gameBoard.board[0][1]).toBe(ship);
    expect(gameBoard.board[0][2]).toBe(ship);
  });

  test("Vertically placement tests", () => {
    gameBoard.placeShips(ship, 0, 0, "vertical");

    expect(gameBoard.board[0][0]).toBe(ship);
    expect(gameBoard.board[1][0]).toBe(ship);
    expect(gameBoard.board[2][0]).toBe(ship);
  });

  test("Ship's horizontal bound test", () => {
    expect(() => gameBoard.placeShips(ship, 0, 8, "horizontal")).toThrow(
      "Ship out of bounds"
    );
  });

  test("Ship's vertical bound test", () => {
    expect(() => gameBoard.placeShips(ship, 8, 0, "vertical")).toThrow(
      "Ship out of bounds"
    );
  });

  test("Overlap detecting test", () => {
    gameBoard.placeShips(ship, 0, 0, "horizontal");
    const ship2 = new Ship(2);

    expect(() => gameBoard.placeShips(ship2, 0, 2, "horizontal")).toThrow(
      "Overlap detected"
    );
  });
});
