import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/HomeStyles';


export const HomeScreen = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={['#1e3c72', '#2a5298']}
      style={styles.container}
    >
      <Text style={styles.title}>TETRIS</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>Iniciar Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Records')}
      >
        <Text style={styles.buttonText}>Ver Recordes</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
