import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a chave para armazenar as pontuações no AsyncStorage
const HIGH_SCORES_KEY = 'highScores';

/**
 * Salva uma nova pontuação nos scores salvos localmente.
 * @param newScore - A nova pontuação a ser salva.
 */
export const saveHighScore = async (newScore: number) => {
  try {
    // Obtém as pontuações armazenadas no AsyncStorage
    const storedScores = await AsyncStorage.getItem(HIGH_SCORES_KEY);
    
    // Converte os scores armazenados para um array, ou inicializa um array vazio caso não existam scores
    const scores = storedScores ? JSON.parse(storedScores) : [];

    // Adiciona a nova pontuação ao array de scores
    scores.push(newScore);

    // Ordena o array em ordem decrescente (maior pontuação primeiro)
    scores.sort((a: number, b: number) => b - a);

    // Mantém apenas os 10 maiores scores no array
    const topScores = scores.slice(0, 10);

    // Loga as pontuações que serão salvas (útil para debug)
    console.log('Pontuações antes de salvar:', topScores);

    // Armazena os scores atualizados no AsyncStorage
    await AsyncStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(topScores));

    // Confirmação no console de que as pontuações foram salvas com sucesso
    console.log('Pontuações salvas com sucesso.');
  } catch (error) {
    // Loga um erro caso algo falhe durante o processo
    console.error('Erro ao salvar a pontuação:', error);
  }
};

/**
 * Obtém as pontuações salvas localmente.
 * @returns Uma Promise que resolve em um array de números representando as pontuações.
 */
export const getHighScores = async (): Promise<number[]> => {
  try {
    // Recupera os scores armazenados no AsyncStorage
    const storedScores = await AsyncStorage.getItem(HIGH_SCORES_KEY);

    // Converte os scores armazenados para um array, ou retorna um array vazio caso não existam scores
    return storedScores ? JSON.parse(storedScores) : [];
  } catch (error) {
    // Loga um erro caso algo falhe durante a leitura dos scores
    console.error('Erro ao obter as pontuações:', error);

    // Retorna um array vazio como fallback para evitar quebra de funcionalidade
    return [];
  }
};
