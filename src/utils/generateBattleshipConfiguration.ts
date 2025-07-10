
type Ship = {
  name: string;
  coordinates: string[];
};
export type BattleshipConfigurationOutput = Ship[];

export const generateBattleshipConfiguration = (): BattleshipConfigurationOutput => {
  const gridSize = 10; // 10x10 board

  // Defining the ships we need to place on the board
  const ships = [
    { name: "battleship", size: 5 },
    { name: "destroyer1", size: 4 },
    { name: "destroyer2", size: 4 },
  ];

  // 2D grid to keep track of occupied cells (0 = empty, 1 = occupied)
  const grid = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => 0)
  );

  const shipList: BattleshipConfigurationOutput = []; // Storing the final result: an array of placed ships

  // Helper function to check if a ship can be placed at a given position
  function isValidPlacement(x: number, y: number, size: number, isHorizontal: boolean): boolean {
    const deltas = [-1, 0, 1]; // Used to check neighboring cells

    for (let i = 0; i < size; i++) {
      const nx = x + (isHorizontal ? i : 0);
      const ny = y + (isHorizontal ? 0 : i);

      // Checking if coordinates are out of bounds
      if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) return false;

      // Checking all surrounding cells (including diagonals)
      for (let dx of deltas) {
        for (let dy of deltas) {
          const ax = nx + dx;
          const ay = ny + dy;

          // Skipping cells that are outside the grid
          if (ax < 0 || ax >= gridSize || ay < 0 || ay >= gridSize) continue;

          // If any neighbour cell is already occupied, placement is invalid
          if (grid[ay][ax] !== 0) return false;
        }
      }
    }

    return true;
  }

  // Helper function to place one ship on the grid
  const placeShip = (name: string, size: number) => {
    let placed = false;

    // Keeping trying until a valid position is found
    while (!placed) {
      // Randomly deciding orientation: true = horizontal, false = vertical
      const isHorizontal = Math.random() < 0.5;

      // Generating random starting coordinates depending on orientation
      const x = Math.floor(Math.random() * (isHorizontal ? gridSize - size + 1 : gridSize));
      const y = Math.floor(Math.random() * (isHorizontal ? gridSize : gridSize - size + 1));

      // Checking if the ship fits without overlapping or touching another
      if (isValidPlacement(x, y, size, isHorizontal)) {
        const coordinates: string[] = [];

        // Placing the ship by marking cells on the grid and storing coordinates
        for (let i = 0; i < size; i++) {
          const nx = x + (isHorizontal ? i : 0);
          const ny = y + (isHorizontal ? 0 : i);

          grid[ny][nx] = 1; // Marking grid as occupied

          // Converting x index to letter ("A" to "J") and y index to number (1 to 10)
          const colLetter = String.fromCharCode(65 + nx);
          coordinates.push(`${colLetter}${ny + 1}`);
        }

        shipList.push({ name, coordinates });
        placed = true; // Exiting loop once ship is placed
      }
    }
  };

  // Placing all ships defined earlier
  ships.forEach(({ name, size }) => {
    placeShip(name, size);
  });

  return shipList;
};
