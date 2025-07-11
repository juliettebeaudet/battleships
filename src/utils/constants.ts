export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const gridSize = 10;

// Defining the ships we need to place on the board
export const ships = [
  { name: "battleship", size: 5 },
  { name: "destroyer1", size: 4 },
  { name: "destroyer2", size: 4 },
];

// mocked ship configuration used during development
// export const computedShips = [
//   { name: "battleship", coordinates: ["A1", "A2", "A3", "A4", "A5"] },
//   { name: "destroyer1", coordinates: ["C1", "C2", "C3", "C4"] },
//   { name: "destroyer2", coordinates: ["J1", "J2", "J3", "J4"] },
// ];
