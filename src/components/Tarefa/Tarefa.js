import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore'; // Importa funções do Firestore
import database from '../../config/firebaseconfig'; // Importa a configuração do Firebase

const Tarefa = ({ id, tarefa, data, concluida, onPressConcluir, onPressDeletar, obterTodasTarefas }) => {
  const [editando, setEditando] = useState(false); // Estado para controlar se a tarefa está sendo editada
  const [novaTarefa, setNovaTarefa] = useState(tarefa); // Estado para armazenar o texto da nova tarefa

  // Função para marcar ou desmarcar uma tarefa como concluída
  const handleConcluir = async () => {
    try {
      await updateDoc(doc(database, 'Tarefas', id), {
        concluida: !concluida
      });
      onPressConcluir(); // Atualiza a lista de tarefas após concluir uma
    } catch (error) {
      console.error("Erro ao concluir tarefa: ", error);
    }
  };

  // Função para iniciar a edição da tarefa
  const handleEditar = async () => {
    setEditando(true); // Altera o estado para iniciar a edição
  };

  // Função para salvar a edição da tarefa
  const handleSalvar = async () => {
    try {
      await updateDoc(doc(database, 'Tarefas', id), {
        tarefa: novaTarefa
      });
      setEditando(false); // Finaliza a edição
      await obterTodasTarefas(); // Atualiza a lista de tarefas após salvar a edição
    } catch (error) {
      console.error("Erro ao salvar edição: ", error);
    }
  };

  // Função para deletar a tarefa
  const handleDeletar = async () => {
    try {
      onPressDeletar(id); // Chama a função de deletar passando o ID da tarefa
    } catch (error) {
      console.error("Erro ao deletar tarefa: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleConcluir}>
        <View style={[styles.concluidaIndicator, { backgroundColor: concluida ? '#28a745' : '#ccc' }]} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        {editando ? (
          <TextInput
            value={novaTarefa}
            onChangeText={setNovaTarefa}
            autoFocus
            onBlur={handleSalvar} // Salva a edição ao sair do campo de texto
            style={styles.input}
          />
        ) : (
          <Text style={styles.tarefaText}>{tarefa}</Text>
        )}
        <Text style={styles.dataInclusao }>Tarefa em: {data}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {editando ? (
          <TouchableOpacity onPress={handleSalvar}>
            <Text style={styles.botaoSalvar}>Salvar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEditar}>
            <Text style={styles.botaoEditar}>Editar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleDeletar}>
          <Text style={styles.botaoDeletar}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos para os componentes visuais
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  concluidaIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  tarefaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  botaoEditar: {
    marginRight: 10,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#ffc107',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  botaoSalvar: {
    color: '#fff',
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  botaoDeletar: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dataInclusao: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default Tarefa;
