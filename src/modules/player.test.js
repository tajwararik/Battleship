import { Player } from "./player.js";
import { Ship } from "./ships.js";

describe("Player class tests", () => {
  let player, computer, ship;

  beforeEach(() => {
    player = new Player("Player");
    computer = new Player("Computer");
    ship = new Ship(3);
    computer.board.placeShips(ship, 0, 0, "horizontal");
    player.board.placeShips(ship, 0, 0, "vertical");
  });

  test("Player attacks computer's board", () => {
    expect(player.attack(computer.board, 0, 0)).toBe("Hit");
    expect(ship.hits).toBe(1);
  });

  test("Player attacks on same location", () => {
    player.attack(computer.board, 0, 0);

    expect(() => player.attack(computer.board, 0, 0)).toThrow(
      "This position has already been attacked"
    );
  });

  test("Computer makes a valid attack on player's board", () => {
    const result = computer.randomAttack(player.board);

    expect(["Hit", "Miss"]).toContain(result);
    expect(computer.previousAttacks.length).toBe(1);
  });

  test("Computer doesn't make a duplicate attack", () => {
    for (let i = 0; i < 100; i++) {
      computer.randomAttack(player.board);
    }

    // Creating a Set from previousAttacks array
    const uniqueAttacks = new Set(
      computer.previousAttacks.map(([x, y]) => `${x}, ${y}`)
    );

    // Checking if both has the same length
    expect(uniqueAttacks.size).toBe(computer.previousAttacks.length);
  });
});
