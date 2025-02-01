import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getHighScores } from '../utils/storageUtils';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  recordsContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  recordItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 5,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  recordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  noRecords: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
