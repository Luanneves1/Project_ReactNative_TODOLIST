import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';

const ItemCompra = ({ id, nome, quantidade, concluido, onPressDeletar, onPressConcluir, onEditarQuantidade }) => {
  // Estado para controlar a edição da quantidade
  const [quantidadeEdit, setQuantidadeEdit] = useState(quantidade.toString());
  // Estado para controlar se o modo de edição está ativado
  const [editing, setEditing] = useState(false);

  // Função para ativar o modo de edição
  const handleEditar = () => {
    setEditing(true);
  };

  // Função para salvar a edição da quantidade
  const handleSalvar = () => {
    // Verifica se a quantidade editada é um número válido
    const novaQuantidade = parseInt(quantidadeEdit);
    if (!isNaN(novaQuantidade)) {
      // Chama a função de callback para editar a quantidade apenas se for um número válido
      onEditarQuantidade(id, novaQuantidade);
    } else {
      // Se a quantidade editada não for um número válido, mantém a quantidade atual
      setQuantidadeEdit(quantidade.toString());
    }
    // Desativa o modo de edição
    setEditing(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.item}>
        {/* Botão para marcar como concluído */}
        <TouchableOpacity onPress={onPressConcluir} style={styles.botaoAssistido}>
          <View style={[styles.circulo, { backgroundColor: concluido ? '#28a745' : '#ccc' }]} />
        </TouchableOpacity>
        {/* Informações do item */}
        <View style={styles.informacoesItem}>
          <Text style={styles.nomeItem}>{nome}</Text>
          {/* Se estiver editando, mostra o campo de input para a quantidade */}
          {editing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.inputQuantidade}
                value={quantidadeEdit}
                onChangeText={setQuantidadeEdit}
                keyboardType="numeric"
              />
            </View>
          ) : (
            // Se não estiver editando, mostra a quantidade normalmente
            <Text>Quantidade: {quantidade}</Text>
          )}
        </View>
        {/* Botão de salvar se estiver editando, ou botão de editar se não estiver */}
        {editing ? (
          <TouchableOpacity onPress={handleSalvar} style={styles.botaoSalvar}>
            <Text style={styles.botaoSalvarTexto}>Salvar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEditar} style={styles.botaoEditar}>
            <Text style={styles.botaoEditarTexto}>Editar</Text>
          </TouchableOpacity>
        )}
        {/* Botão de deletar */}
        <TouchableOpacity onPress={onPressDeletar} style={styles.botaoDeletar}>
          <Text style={styles.botaoDeletarTexto}>✕</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  informacoesItem: {
    flex: 1,
    marginLeft: 10,
  },
  nomeItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  botaoAssistido: {
    padding: 8,
    borderRadius: 20,
  },
  circulo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  botaoEditar: {
    backgroundColor: '#ffc107',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  botaoEditarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botaoSalvar: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  botaoSalvarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
    fontSize: 14,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputQuantidade: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
    marginRight: 5,
    width: 60,
  },
});

export default ItemCompra;
