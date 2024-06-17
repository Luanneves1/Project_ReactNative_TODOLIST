import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { addDoc, collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import database from '../../config/firebaseconfig';
import ItemCompra from '../../components/ItemCompra';

const TelaListaCompras = () => {
  // Estados para controlar o nome, quantidade, itens e exibição do formulário
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [itens, setItens] = useState([]);
  const [exibirFormulario, setExibirFormulario] = useState(false);

  // Função que é executada ao iniciar o componente para obter todos os itens
  useEffect(() => {
    obterTodosItens();
  }, []);

  // Função para obter todos os itens da coleção 'Compras' no Firestore
  const obterTodosItens = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'Compras'));
      const listaItens = [];
      querySnapshot.forEach((doc) => {
        listaItens.push({ id: doc.id, ...doc.data() });
      });
      setItens(listaItens);
    } catch (e) {
      console.error("Erro ao obter itens: ", e);
    }
  };

  // Função para adicionar um novo item à coleção 'Compras' no Firestore
  const adicionarItem = async () => {
    try {
      await addDoc(collection(database, 'Compras'), {
        nome: nome,
        quantidade: quantidade,
        concluido: false // Define o estado inicial como não concluído
      });
      setNome('');
      setQuantidade('');
      obterTodosItens();
    } catch (e) {
      console.error("Erro ao adicionar item: ", e);
    }
  };

  // Função para deletar um item da coleção 'Compras' no Firestore
  const handleDeletarItem = async (id) => {
    try {
      await deleteDoc(doc(database, 'Compras', id));
      obterTodosItens();
    } catch (e) {
      console.error("Erro ao deletar item: ", e);
    }
  };

  // Função para concluir um item da lista de compras
  const handleConcluirItem = async (id, concluido) => {
    try {
      await updateDoc(doc(database, 'Compras', id), {
        concluido: !concluido // Altera o estado de concluído
      });
      obterTodosItens(); // Atualiza a lista de itens após concluir
    } catch (error) {
      console.error("Erro ao concluir item: ", error);
    }
  };

  // Função para editar a quantidade de um item na lista de compras
  const handleEditarQuantidade = async (id, novaQuantidade) => {
    try {
      await updateDoc(doc(database, 'Compras', id), {
        quantidade: novaQuantidade
      });
      obterTodosItens(); // Atualiza a lista de itens após editar a quantidade
    } catch (error) {
      console.error("Erro ao editar quantidade do item: ", error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        {/* Botão para mostrar ou ocultar o formulário de adição de item */}
        <TouchableOpacity onPress={() => setExibirFormulario(!exibirFormulario)} style={styles.botaoAdicionar}>
          <Text style={styles.botaoAdicionarTexto}>{exibirFormulario ? 'Fechar' : 'Incluir'}</Text>
        </TouchableOpacity>
        {/* Formulário para adicionar um novo item */}
        {exibirFormulario && (
          <View style={styles.formulario}>
            <TextInput
              style={styles.input}
              placeholder="Nome do Item"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.botaoIncluir} onPress={adicionarItem}>
              <Text style={styles.botaoIncluirTexto}>Adicionar Item</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* Lista de itens de compras */}
        <FlatList
          data={itens}
          renderItem={({ item }) => (
            <ItemCompra
              id={item.id}
              nome={item.nome}
              quantidade={item.quantidade}
              concluido={item.concluido}
              onPressDeletar={() => handleDeletarItem(item.id)}
              onPressConcluir={() => handleConcluirItem(item.id, item.concluido)}
              onEditarQuantidade={handleEditarQuantidade} // Passa a função de editar quantidade
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  botaoAdicionar: {
    backgroundColor: '#007bff',
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
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  botaoIncluir: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoIncluirTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaListaCompras;
