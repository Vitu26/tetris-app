import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ScoreContextProps {
  highScore: number;
  lastScore: number;
  saveScore: (score: number) => void;
}

const ScoreContext = createContext<ScoreContextProps | undefined>(undefined);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highScore, setHighScore] = useState<number>(0);
  const [lastScore, setLastScore] = useState<number>(0);

  useEffect(() => {
    const loadScores = async () => {
      const savedHighScore = await AsyncStorage.getItem('highScore');
      const savedLastScore = await AsyncStorage.getItem('lastScore');
      if (savedHighScore) setHighScore(Number(savedHighScore));
      if (savedLastScore) setLastScore(Number(savedLastScore));
    };
    loadScores();
  }, []);

  const saveScore = async (score: number) => {
    setLastScore(score);
    await AsyncStorage.setItem('lastScore', score.toString());
    if (score > highScore) {
      setHighScore(score);
      await AsyncStorage.setItem('highScore', score.toString());
    }
  };

  return (
    <ScoreContext.Provider value={{ highScore, lastScore, saveScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};