import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const Tetris = ({ setScore }: { setScore: (score: number) => void }) => {
  const [gameGrid, setGameGrid] = useState(Array(20).fill(Array(10).fill(0)));
  const [score, setScoreState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScoreState((prev) => {
        const newScore = prev + 10;
        setScore(newScore);
        return newScore;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <View style={styles.grid}>{gameGrid.map((row, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((cell: number, cellIndex: number) => (
        <View key={cellIndex} style={[styles.cell, { backgroundColor: cell ? '#ff4b14' : '#222' }]} />
      ))}
    </View>
  ))}</View>;
};

const styles = StyleSheet.create({
  grid: { width: 200, height: 400, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row' },
  cell: { width: 20, height: 20, borderWidth: 1, borderColor: '#444' }
});

export default Tetris;