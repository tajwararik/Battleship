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
