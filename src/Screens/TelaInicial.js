import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TelaInicial = ({ navigation }) => {
  const navigateToTarefas = () => {
    navigation.navigate('TelaListaTarefas');
  };

  const navigateToListaCompras = () => {
    navigation.navigate('TelaListaCompras'); // Corrigido para 'TelaListaCompras'
  };

  const navigateToFilmes = () => {
    navigation.navigate('TelaListaFilmes');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao seu App</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToTarefas}>
        <Text style={styles.buttonText}>Gerenciar Tarefas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToListaCompras}>
        <Text style={styles.buttonText}>Lista de Compras</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToFilmes}>
        <Text style={styles.buttonText}>Filmes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Cor de fundo da tela
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333', // Cor do texto
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TelaInicial;
