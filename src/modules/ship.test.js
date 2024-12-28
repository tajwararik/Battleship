import { Ship } from "./ships.js";

describe("Ship class tests", () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test("hit() increments the hits property", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("isSunk() return false if all the parts are not hit", () => {
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  });

  test("isSunk() return true if all the parts are hit", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });

  test("Ship of length 1 is sunk after 1 hit", () => {
    const singleLengthShip = new Ship(1);
    singleLengthShip.hit();
    expect(singleLengthShip.isSunk()).toBe(true);
  });
});
