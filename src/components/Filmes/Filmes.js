import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Filmes = ({ onAdicionarFilme }) => {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');

  const handleAdicionarFilme = () => {
    // Verifica se todos os campos estão preenchidos antes de adicionar o filme
    if (nome.trim() === '' || genero.trim() === '' || ano.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Cria um objeto com os dados do novo filme
    const novoFilme = {
      nome,
      genero,
      ano: parseInt(ano), // Converte para número inteiro
      assistido: false, // Define como não assistido por padrão
    };

    // Chama a função de callback para adicionar o filme
    onAdicionarFilme(novoFilme);

    // Limpa os campos após adicionar o filme
    setNome('');
    setGenero('');
    setAno('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Filme</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Filme"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={genero}
        onChangeText={setGenero}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano de Lançamento"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAdicionarFilme}>
        <Text style={styles.buttonText}>Adicionar Filme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
    width: '70%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Filmes;
