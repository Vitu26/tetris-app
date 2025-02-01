export type Block = { x: number; y: number; shape: number[][]; color: string };

export const createEmptyGrid = (rows = 20, cols = 10): any[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ value: 0, color: null }))
  );
};

export const generateRandomBlock = (): Block => {
  const shapes = [
    [[1, 1, 1, 1]], // Linha
    [[1, 1], [1, 1]], // Quadrado
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // Z
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
  ];
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan'];

  const shapeIndex = Math.floor(Math.random() * shapes.length);
  const color = colors[shapeIndex];

  return {
    x: Math.floor(10 / 2) - 1, // Centraliza horizontalmente
    y: -shapes[shapeIndex].length, // Começa acima da grade
    shape: shapes[shapeIndex],
    color,
  };
};


export const isCollision = (grid: any[][], block: Block): boolean => {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] !== 0) {
        const x = block.x + col;
        const y = block.y + row;

        // Ignora colisões acima da grade
        if (y < 0) continue;

        // Verifica colisões dentro da grade
        if (y >= grid.length || x < 0 || x >= grid[0].length || grid[y][x].value !== 0) {
          return true;
        }
      }
    }
  }
  return false;
};





export const placeBlock = (grid: any[][], block: Block): any[][] => {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] !== 0) {
        const x = block.x + col;
        const y = block.y + row;
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
          newGrid[y][x] = { value: 1, color: block.color }; // Salva a cor e marca como ocupado
        }
      }
    }
  }
  return newGrid;
};



export const clearFullRows = (grid: any[][]): { newGrid: any[][]; clearedRows: number } => {
  const rowsToKeep = grid.filter((row) => row.some((cell) => cell.value === 0));
  const clearedRows = grid.length - rowsToKeep.length;
  const newGrid = Array.from({ length: clearedRows }, () =>
    Array.from({ length: grid[0].length }, () => ({ value: 0, color: null }))
  ).concat(rowsToKeep);

  return { newGrid, clearedRows };
};

