import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGH_SCORES_KEY = 'highScores';

export const saveHighScore = async (newScore: number) => {
    try {
      const storedScores = await AsyncStorage.getItem(HIGH_SCORES_KEY);
      const scores = storedScores ? JSON.parse(storedScores) : [];
  
      scores.push(newScore);
      scores.sort((a: number, b: number) => b - a);
  
      const topScores = scores.slice(0, 10);
      console.log('Pontuações antes de salvar:', topScores); // Verifique o que está sendo salvo
  
      await AsyncStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(topScores));
      console.log('Pontuações salvas com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar a pontuação:', error);
    }
  };
  

export const getHighScores = async (): Promise<number[]> => {
  try {
    const storedScores = await AsyncStorage.getItem(HIGH_SCORES_KEY);
    return storedScores ? JSON.parse(storedScores) : [];
  } catch (error) {
    console.error('Erro ao obter as pontuações:', error);
    return [];
  }
};
