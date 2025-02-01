import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getHighScores } from '../utils/storageUtils';
import { styles } from '../styles/RecordStyles';


export const RecordsScreen = ({ navigation }: any) => {
  const [highScores, setHighScores] = useState<number[]>([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      const scores = await getHighScores();
      setHighScores(scores);
    };
    fetchHighScores();
  }, []);

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Recordes</Text>
      <View style={styles.recordsContainer}>
        {highScores.length > 0 ? (
          highScores.map((score, index) => (
            <View key={index} style={styles.recordItem}>
              <Text style={styles.recordText}>
                {index + 1}. {score} pontos
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noRecords}>Sem recordes ainda</Text>
        )}
      </View>
    </LinearGradient>
  );
};
