import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { addDoc, collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore'; // Importa funções do Firestore
import database from '../../config/firebaseconfig'; // Importa a configuração do Firebase
import Tarefa from '../../components/Tarefa/Tarefa'; // Importa o componente de Tarefa
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa o seletor de data

const TelaListaTarefas = () => {
  const [tarefa, setTarefa] = useState(''); // Estado para armazenar o texto da tarefa
  const [tarefas, setTarefas] = useState([]); // Estado para armazenar a lista de tarefas
  const [exibirFormulario, setExibirFormulario] = useState(false); // Estado para controlar a exibição do formulário
  const [novaData, setNovaData] = useState(new Date()); // Estado para armazenar a nova data da tarefa
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar a exibição do seletor de data

  // Função para obter todas as tarefas do banco de dados
  const obterTodasTarefas = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'Tarefas')); // Obtém os documentos da coleção 'Tarefas'
      const tarefas = [];
      querySnapshot.forEach((doc) => {
        tarefas.push({ id: doc.id, ...doc.data() }); // Adiciona as tarefas ao array, incluindo seus IDs
      });
      setTarefas(tarefas); // Atualiza o estado com as tarefas obtidas
    } catch (e) {
      console.error("Erro ao obter tarefas: ", e); // Exibe um erro caso ocorra um problema
    }
  };

  useEffect(() => {
    obterTodasTarefas(); // Carrega as tarefas ao montar o componente
  }, []);

  // Função para adicionar uma nova tarefa ao banco de dados
  const adicionarTarefa = async () => {
    try {
      await addDoc(collection(database, 'Tarefas'), {
        tarefa: tarefa,
        data: novaData.toLocaleString(),
        concluida: false
      });
      setTarefa('');
      setNovaData(new Date());
      setExibirFormulario(false);
      obterTodasTarefas(); // Atualiza a lista de tarefas após adicionar uma nova
    } catch (e) {
      console.error("Erro ao adicionar tarefa: ", e);
    }
  };

  // Função para excluir uma tarefa do banco de dados
  const handleDeletarTarefa = async (id) => {
    try {
      await deleteDoc(doc(database, 'Tarefas', id));
      obterTodasTarefas(); // Atualiza a lista de tarefas após excluir uma
    } catch (error) {
      console.error("Erro ao deletar tarefa: ", error);
    }
  };

  // Função para marcar ou desmarcar uma tarefa como concluída
  const handleConcluirTarefa = async (id) => {
    try {
      await updateDoc(doc(database, 'Tarefas', id), {
        concluida: !tarefas.find(task => task.id === id).concluida // Inverte o status da tarefa
      });
      obterTodasTarefas(); // Atualiza a lista de tarefas após alterar o status de uma
    } catch (error) {
      console.error("Erro ao concluir tarefa: ", error);
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
            placeholder="Tarefa"
            value={tarefa}
            onChangeText={setTarefa}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.selectDateButton}>
            <Text style={styles.selectDateButtonText}>Selecionar Data</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={novaData}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setNovaData(selectedDate);
                }
              }}
            />
          )}
          <TouchableOpacity style={styles.botaoIncluir} onPress={adicionarTarefa}>
            <Text style={styles.botaoIncluirTexto}>Adicionar Tarefa</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={tarefas}
        renderItem={({ item }) => (
          <Tarefa
            id={item.id}
            tarefa={item.tarefa}
            data={item.data}
            concluida={item.concluida}
            onPressConcluir={() => handleConcluirTarefa(item.id)} // Corrigido
            onPressDeletar={() => handleDeletarTarefa(item.id)} // Corrigido
            obterTodasTarefas={obterTodasTarefas}
          />
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
  },
  botaoIncluir: {
    backgroundColor: '#007bff',
    padding: 10, // Reduzindo o tamanho do botão
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoIncluirTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectDateButton: {
    marginBottom: 10,
    backgroundColor: '#007bff',
    padding: 10, // Reduzindo o tamanho do botão
    borderRadius: 5,
    alignItems: 'center',
  },
  selectDateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaListaTarefas;
