import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { addDoc, collection, getDocs, deleteDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import database from '../../config/firebaseconfig';

const TelaListaFilmes = () => {
  // Estado para armazenar o título do filme
  const [titulo, setTitulo] = useState('');
  // Estado para armazenar o gênero do filme
  const [genero, setGenero] = useState('');
  // Estado para armazenar o ano do filme
  const [ano, setAno] = useState('');
  // Estado para controlar a exibição do formulário de adição de filme
  const [exibirFormulario, setExibirFormulario] = useState(false);
  // Estado para armazenar a lista de filmes
  const [filmes, setFilmes] = useState([]);

  // Efeito para carregar os filmes ao montar o componente
  useEffect(() => {
    const obterFilmes = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, 'Filmes'));
        const filmes = [];
        querySnapshot.forEach((doc) => {
          filmes.push({ id: doc.id, ...doc.data() });
        });
        setFilmes(filmes);
      } catch (error) {
        console.error("Erro ao obter filmes: ", error);
      }
    };

    obterFilmes();
  }, []);

  // Função para adicionar um novo filme
  const handleAdicionarFilme = async () => {
    try {
      await addDoc(collection(database, 'Filmes'), {
        titulo,
        genero,
        ano
      });
      setTitulo('');
      setGenero('');
      setAno('');
      setExibirFormulario(false); // Fecha o formulário após adicionar o filme
      atualizarListaFilmes();
    } catch (error) {
      console.error("Erro ao adicionar filme: ", error);
    }
  };

  // Função para deletar um filme
  const handleDeletarFilme = async (id) => {
    try {
      await deleteDoc(doc(database, 'Filmes', id));
      atualizarListaFilmes();
    } catch (error) {
      console.error("Erro ao deletar filme: ", error);
    }
  };

  // Função para marcar um filme como assistido
  const handleMarcarAssistido = async (id) => {
    try {
      const filmeRef = doc(database, 'Filmes', id);
      const filmeSnap = await getDoc(filmeRef);
      if (filmeSnap.exists()) {
        const filmeData = filmeSnap.data();
        await updateDoc(filmeRef, {
          ...filmeData,
          assistido: !filmeData.assistido
        });
        atualizarListaFilmes();
      }
    } catch (error) {
      console.error("Erro ao marcar como assistido: ", error);
    }
  };

  // Função para atualizar a lista de filmes
  const atualizarListaFilmes = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'Filmes'));
      const filmesAtualizados = [];
      querySnapshot.forEach((doc) => {
        filmesAtualizados.push({ id: doc.id, ...doc.data() });
      });
      setFilmes(filmesAtualizados);
    } catch (error) {
      console.error("Erro ao atualizar lista de filmes: ", error);
    }
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setExibirFormulario(!exibirFormulario)} style={styles.botaoAdicionar}>
        <Text style={styles.botaoAdicionarTexto}>{exibirFormulario ? 'Fechar' : 'Incluir'}</Text>
      </TouchableOpacity>
      {exibirFormulario && (
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Gênero"
            value={genero}
            onChangeText={setGenero}
          />
          <TextInput
            style={styles.input}
            placeholder="Ano"
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.botaoIncluir} onPress={handleAdicionarFilme}>
            <Text style={styles.botaoIncluirTexto}>Incluir Filme</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={filmes}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.informacoesFilme}>
              <TouchableOpacity onPress={() => handleMarcarAssistido(item.id)} style={styles.botaoAssistido}>
                <View style={[styles.circulo, { backgroundColor: item.assistido ? '#28a745' : '#ccc' }]} />
              </TouchableOpacity>
              <View>
                <Text style={styles.tituloFilme}>{item.titulo}</Text>
                <Text>{item.genero}</Text>
                <Text>Ano: {item.ano}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleDeletarFilme(item.id)} style={styles.botaoDeletar}>
              <Text style={styles.botaoDeletarTexto}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  botaoAdicionar: {
    backgroundColor: '#007bff', // Cor azul
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formulario: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  botaoIncluir: {
    backgroundColor: '#007bff', // Cor azul
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoIncluirTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  informacoesFilme: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tituloFilme: {
    flex: 0, // Para ocupar todo o espaço disponível na linha
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden', // Para esconder qualquer texto que ultrapasse o limite da tela
  },
  botaoDeletar: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoDeletarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14, // Reduzi o tamanho da fonte
  },
  botaoAssistido: {
    padding: 15, // Aumentei o padding
    borderRadius: 50,
  },
  circulo: {
    width: 30, // Aumentei o tamanho do círculo
    height: 30, // Aumentei o tamanho do círculo
    borderRadius: 15,
  },
});

export default TelaListaFilmes;
