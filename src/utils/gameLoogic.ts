// Define o tipo Block para representar um bloco no jogo
export type Block = { 
  x: number;         // Posição horizontal do bloco na grade
  y: number;         // Posição vertical do bloco na grade
  shape: number[][]; // Formato do bloco representado como uma matriz 2D
  color: string;     // Cor do bloco
};

// Cria uma grade vazia com as dimensões especificadas (por padrão, 20 linhas x 10 colunas)
export const createEmptyGrid = (rows = 20, cols = 10): any[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ value: 0, color: null }))
  ); 
  // Cada célula é inicializada com `value: 0` (vazia) e `color: null` (sem cor).
};

// Gera um bloco aleatório a partir de formas e cores predefinidas
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
  const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan']; // Cores para cada formato

  const shapeIndex = Math.floor(Math.random() * shapes.length); // Seleciona um formato aleatório
  const color = colors[shapeIndex]; // Escolhe a cor correspondente ao formato

  return {
    x: Math.floor(10 / 2) - 1, // Centraliza o bloco horizontalmente na grade
    y: -shapes[shapeIndex].length, // Posiciona o bloco acima da grade
    shape: shapes[shapeIndex], // Formato selecionado
    color, // Cor selecionada
  };
};

// Verifica se há colisão entre um bloco e a grade
export const isCollision = (grid: any[][], block: Block): boolean => {
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] !== 0) { // Células do bloco com valor 1 são verificadas
        const x = block.x + col; // Calcula a posição horizontal na grade
        const y = block.y + row; // Calcula a posição vertical na grade

        // Ignora colisões que ocorrem acima da grade
        if (y < 0) continue;

        // Verifica colisões dentro dos limites da grade
        if (y >= grid.length || x < 0 || x >= grid[0].length || grid[y][x].value !== 0) {
          return true; // Há colisão
        }
      }
    }
  }
  return false; // Sem colisão detectada
};

// Posiciona um bloco na grade ao colidir ou alcançar o fundo
export const placeBlock = (grid: any[][], block: Block): any[][] => {
  const newGrid = grid.map((row) => row.map((cell) => ({ ...cell }))); // Faz uma cópia da grade
  for (let row = 0; row < block.shape.length; row++) {
    for (let col = 0; col < block.shape[row].length; col++) {
      if (block.shape[row][col] !== 0) { // Adiciona células do bloco à grade
        const x = block.x + col;
        const y = block.y + row;
        if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
          newGrid[y][x] = { value: 1, color: block.color }; // Marca a célula como ocupada
        }
      }
    }
  }
  return newGrid; // Retorna a nova grade com o bloco posicionado
};

// Remove linhas completamente preenchidas e retorna a nova grade e o número de linhas limpas
export const clearFullRows = (grid: any[][]): { newGrid: any[][]; clearedRows: number } => {
  const rowsToKeep = grid.filter((row) => row.some((cell) => cell.value === 0)); 
  // Mantém apenas as linhas que possuem células vazias

  const clearedRows = grid.length - rowsToKeep.length; // Calcula quantas linhas foram removidas

  const newGrid = Array.from({ length: clearedRows }, () =>
    Array.from({ length: grid[0].length }, () => ({ value: 0, color: null }))
  ).concat(rowsToKeep); 
  // Adiciona linhas vazias no topo para preencher a grade novamente

  return { newGrid, clearedRows }; // Retorna a nova grade e o número de linhas limpas
};
