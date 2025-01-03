import { Player } from "./player.js";
import { Ship } from "./ships.js";

describe("Player class tests", () => {
  let playerOne, computer, ship;

  beforeEach(() => {
    playerOne = new Player("Player One");
    computer = new Player("Computer", true);
    ship = new Ship(3);
    computer.board.placeShips(ship, 0, 0, "horizontal");
    playerOne.board.placeShips(ship, 0, 0, "vertical");
  });

  test("Player one attacks computer's board", () => {
    expect(playerOne.attack(computer.board, 0, 0)).toBe("Hit");
    expect(ship.hits).toBe(1);
  });

  test("Player one attacks on same location", () => {
    playerOne.attack(computer.board, 0, 0);

    expect(() => playerOne.attack(computer.board, 0, 0)).toThrow(
      "This position has already been attacked"
    );
  });

  test("Computer makes a valid attack on player's board", () => {
    const result = computer.randomAttack(playerOne.board);

    expect(["Hit", "Miss"]).toContain(result);
    expect(computer.previousAttacks.length).toBe(1);
  });

  test("Computer doesn't make a duplicate attack", () => {
    for (let i = 0; i < 100; i++) {
      computer.randomAttack(playerOne.board);
    }

    const uniqueAttacks = new Set(
      computer.previousAttacks.map(([x, y]) => `${x}, ${y}`)
    );

    expect(uniqueAttacks.size).toBe(computer.previousAttacks.length);
  });
});
