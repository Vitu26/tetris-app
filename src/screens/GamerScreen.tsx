import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { Block, clearFullRows, createEmptyGrid, generateRandomBlock, isCollision, placeBlock } from '../utils/gameLoogic';
import { saveHighScore } from '../utils/storageUtils';

export const GameScreen = ({ navigation }: any) => {
  const [grid, setGrid] = useState(createEmptyGrid(20, 10));
  const [score, setScore] = useState<number>(0);
  const [currentBlock, setCurrentBlock] = useState<Block | null>(generateRandomBlock());
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);

  const [themeSound, setThemeSound] = useState<Audio.Sound | null>(null);
  const [scoreSound, setScoreSound] = useState<Audio.Sound | null>(null);
  const [gameOverSound, setGameOverSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSounds = async () => {
      try {
        const theme = new Audio.Sound();
        const score = new Audio.Sound();
        const gameOver = new Audio.Sound();

        await theme.loadAsync(require('../../assets/sounds/tetris_theme.mp3'));
        await score.loadAsync(require('../../assets/sounds/score-sound.mp3'));
        await gameOver.loadAsync(require('../../assets/sounds/game-over.mp3'));

        setThemeSound(theme);
        setScoreSound(score);
        setGameOverSound(gameOver);

        await theme.playAsync(); // Toca o som tema ao iniciar o jogo
        theme.setIsLoopingAsync(true); // Loop para o som tema
      } catch (error) {
        console.error('Erro ao carregar os sons:', error);
      }
    };

    loadSounds();

    return () => {
      themeSound?.unloadAsync();
      scoreSound?.unloadAsync();
      gameOverSound?.unloadAsync();
    };
  }, []);

  const moveBlock = (dx: number) => {
    if (!currentBlock) return;
    const movedBlock = { ...currentBlock, x: currentBlock.x + dx };
    if (!isCollision(grid, movedBlock)) setCurrentBlock(movedBlock);
  };

  const rotateBlock = () => {
    if (!currentBlock) return;
    const rotatedShape = currentBlock.shape[0].map((_: number, index: number) =>
      currentBlock.shape.map((row: number[]) => row[index]).reverse()
    );
    const rotatedBlock = { ...currentBlock, shape: rotatedShape };
    if (!isCollision(grid, rotatedBlock)) setCurrentBlock(rotatedBlock);
  };

  const dropBlock = async () => {
    if (!currentBlock) return;

    const movedBlock = { ...currentBlock, y: currentBlock.y + 1 };

    if (!isCollision(grid, movedBlock)) {
      setCurrentBlock(movedBlock);
    } else {
      if (currentBlock.y < 0) {
        saveHighScore(score);
        setIsGameOver(true);
        themeSound?.stopAsync(); // Para o som tema
        await gameOverSound?.replayAsync();
      } else {
        const updatedGrid = placeBlock(grid, currentBlock);
        const { newGrid, clearedRows } = clearFullRows(updatedGrid);

        setGrid(newGrid);
        setScore(score + clearedRows * 10);

        if (clearedRows > 0) {
          setSpeed((prev) => Math.max(100, prev - 50));
          await scoreSound?.replayAsync();
        }

        setCurrentBlock(generateRandomBlock());
      }
    }
  };

  const resetGame = async () => {
    setGrid(createEmptyGrid(20, 10));
    setScore(0);
    setSpeed(1000);
    setCurrentBlock(generateRandomBlock());
    setIsGameOver(false);
    await themeSound?.playAsync(); // Reinicia o som tema
  };

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      dropBlock();
    }, speed);

    return () => clearInterval(interval);
  }, [grid, currentBlock, speed, isGameOver]);

  const renderGrid = () => {
    const gridWithBlock = grid.map((row) =>
      row.map((cell) => ({
        value: cell.value,
        color: cell.color || null,
      }))
    );

    if (currentBlock) {
      currentBlock.shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell !== 0) {
            const x = currentBlock.x + colIndex;
            const y = currentBlock.y + rowIndex;
            if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
              gridWithBlock[y][x] = { value: 2, color: currentBlock.color };
            }
          }
        });
      });
    }
    return gridWithBlock;
  };

  if (isGameOver) {
    return (
      <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
        <Text style={styles.gameOverText}>Game Over</Text>
        <Text style={styles.scoreText}>Sua Pontuação: {score}</Text>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Jogar Novamente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.score}>Pontuação: {score}</Text>
      <View style={styles.gridContainer}>
        {renderGrid().map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <View
                key={colIndex}
                style={[styles.cell, cell.color && { backgroundColor: cell.color }]}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={() => moveBlock(-1)}>
          <Text style={styles.controlText}>⟵</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={rotateBlock}>
          <Text style={styles.controlText}>⟲</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => moveBlock(1)}>
          <Text style={styles.controlText}>⟶</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={dropBlock}>
          <Text style={styles.controlText}>⬇</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 80, // Adicionado espaçamento
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20, // Adicionado espaçamento adicional
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 28,
    height: 28,
    margin: 2,
    backgroundColor: '#ddd',
    borderRadius: 3,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  controlButton: {
    backgroundColor: '#f0f0f0',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  gameOverText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreText: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
