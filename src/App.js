// Importações necessárias
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './Screens/TelaInicial';
import TelaListaTarefas from './Screens/TelaListaTarefas/TelaListaTarefas';
import TelaListaCompras from './Screens/compras/TelaListaCompras';
import TelaListaFilmes from './Screens/TelaListaFilmes/TelaListaFilmes'; // Importe a tela de filmes

// Criação do navegador de pilha
const Stack = createStackNavigator();

// Componente principal da aplicação
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        {/* Definição da tela inicial com o título 'Dia a Dia' */}
        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Dia a Dia' }} />
        {/* Definição da tela de lista de tarefas com o título 'Home' */}
        <Stack.Screen name="TelaListaTarefas" component={TelaListaTarefas} options={{ title: 'Home' }} />
        {/* Definição da tela de lista de compras com o título 'Lista de Compras' */}
        <Stack.Screen name="TelaListaCompras" component={TelaListaCompras} options={{ title: 'Lista de Compras' }} />
        {/* Definição da tela de lista de filmes com o título 'Filmes' */}
        <Stack.Screen name="TelaListaFilmes" component={TelaListaFilmes} options={{ title: 'Filmes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
