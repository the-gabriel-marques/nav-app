import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, Platform } from 'react-native';

const comidas = [
  { id: 'hamburguer', nome: 'Hambúrguer', preco: 35, imagem: require('./assets/hamburguer.jpeg') },
  { id: 'pizza', nome: 'Pizza', preco: 50, imagem: require('./assets/pizza.jpg') },
  { id: 'hotDog', nome: 'Hot Dog', preco: 15, imagem: require('./assets/hotDog.jpg') },
];

const bebidas = [
  { id: 'refrigerante', nome: 'Refrigerante', preco: 10, imagem: require('./assets/refrigerante.jpg') },
  { id: 'suco', nome: 'Suco', preco: 8, imagem: require('./assets/suco.jpg') },
  { id: 'agua', nome: 'Água', preco: 6, imagem: require('./assets/agua.jpg') },
];

export default function App() {
  const [comidaSelecionada, setComidaSelecionada] = useState(null);
  const [bebidaSelecionada, setBebidaSelecionada] = useState(null);

  const total = (comidaSelecionada?.preco || 0) + (bebidaSelecionada?.preco || 0);

  const finalizarPedido = () => {
    if (!comidaSelecionada && !bebidaSelecionada) {
      const mensagemErro = 'Ops! Por favor, selecione pelo menos um item para fazer o pedido. 🍔🥤';
      
      if (Platform.OS === 'web') {
        window.alert(mensagemErro);
      } else {
        Alert.alert('Atenção', mensagemErro);
      }
      return; 
    }

    let resumo = '';
    
    if (comidaSelecionada) {
      resumo += `🍽️ ${comidaSelecionada.nome}: R$ ${comidaSelecionada.preco.toFixed(2).replace('.', ',')}\n`;
    }
    
    if (bebidaSelecionada) {
      resumo += `🥤 ${bebidaSelecionada.nome}: R$ ${bebidaSelecionada.preco.toFixed(2).replace('.', ',')}\n`;
    }
    
    resumo += `\n💰 Total Pago: R$ ${total.toFixed(2).replace('.', ',')}`;

    if (Platform.OS === 'web') {
      window.alert(`Pedido Confirmado! 🎉\n\n${resumo}`);
    } else {
      Alert.alert('Pedido Confirmado! 🎉', resumo);
    }
  };

  const renderizarCard = (item, stateSelecionado, setFuncao) => {
    const isSelecionado = stateSelecionado?.id === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.card, isSelecionado && styles.cardSelecionado]}
        onPress={() => setFuncao(item)}
        activeOpacity={0.7}
      >
        <Image source={item.imagem} style={styles.imagemCard} />
        <Text style={styles.nomeCard}>{item.nome}</Text>
        <Text style={styles.precoCard}>R$ {item.preco.toFixed(2).replace('.', ',')}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.app}>
      <Text style={styles.titulo}>Faça seu Pedido 🍔</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Text style={styles.label}>Escolha uma comida:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaScroll}>
          {comidas.map((item) => renderizarCard(item, comidaSelecionada, setComidaSelecionada))}
        </ScrollView>

        <Text style={styles.label}>Escolha uma bebida:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaScroll}>
          {bebidas.map((item) => renderizarCard(item, bebidaSelecionada, setBebidaSelecionada))}
        </ScrollView>

        <View style={styles.resultadoContainer}>
          <Text style={styles.textoTotal}>Total do Pedido</Text>
          <Text style={styles.valorTotal}>
            R$ {total.toFixed(2).replace('.', ',')}
          </Text>

          <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarPedido}>
            <Text style={styles.textoBotaoFinalizar}>Confirmar Pedido</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingTop: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  listaScroll: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4, 
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelecionado: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  imagemCard: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  nomeCard: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  precoCard: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: 'bold',
    marginTop: 5,
  },
  resultadoContainer: {
    backgroundColor: '#FFF', 
    margin: 20,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  textoTotal: {
    fontSize: 16,
    color: '#888',
    fontWeight: '600',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  valorTotal: {
    fontSize: 36,
    color: '#333',
    fontWeight: '900',
    marginBottom: 20,
  },
  botaoFinalizar: {
    backgroundColor: '#4ECDC4',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  textoBotaoFinalizar: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});