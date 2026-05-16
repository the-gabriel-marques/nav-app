import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert, Platform } from 'react-native';
import { salvarPedido, obterHistoricoPedidos } from '../database';

const comidas = [
  { id: 'hamburguer', nome: 'Hambúrguer', preco: 35, imagem: require('../assets/hamburguer.jpeg') },
  { id: 'pizza', nome: 'Pizza', preco: 50, imagem: require('../assets/pizza.jpg') },
  { id: 'hotDog', nome: 'Hot Dog', preco: 15, imagem: require('../assets/hotDog.jpg') },
];

const bebidas = [
  { id: 'refrigerante', nome: 'Refrigerante', preco: 10, imagem: require('../assets/refrigerante.jpg') },
  { id: 'suco', nome: 'Suco', preco: 8, imagem: require('../assets/suco.jpg') },
  { id: 'agua', nome: 'Água', preco: 6, imagem: require('../assets/agua.jpg') },
];

export default function FastFoodScreen({ route }) {
  const userId = route.params?.user?.id;
  const [comidaSelecionada, setComidaSelecionada] = useState(null);
  const [bebidaSelecionada, setBebidaSelecionada] = useState(null);
  const [historico, setHistorico] = useState([]);

  const total = (comidaSelecionada?.preco || 0) + (bebidaSelecionada?.preco || 0);

  useEffect(() => {
    if (userId) {
      obterHistoricoPedidos(userId).then(setHistorico);
    }
  }, [userId]);

  const finalizarPedido = async () => {
    if (!comidaSelecionada && !bebidaSelecionada) {
      const mensagemErro = 'Ops! Por favor, selecione pelo menos um item para fazer o pedido. 🍔🥤';
      
      if (Platform.OS === 'web') {
        window.alert(mensagemErro);
      } else {
        Alert.alert('Atenção', mensagemErro);
      }
      return; 
    }

    let itensArray = [];
    let resumo = '';
    
    if (comidaSelecionada) {
      resumo += `🍽️ ${comidaSelecionada.nome}: R$ ${comidaSelecionada.preco.toFixed(2).replace('.', ',')}\n`;
      itensArray.push(comidaSelecionada.nome);
    }
    
    if (bebidaSelecionada) {
      resumo += `🥤 ${bebidaSelecionada.nome}: R$ ${bebidaSelecionada.preco.toFixed(2).replace('.', ',')}\n`;
      itensArray.push(bebidaSelecionada.nome);
    }
    
    resumo += `\n💰 Total Pago: R$ ${total.toFixed(2).replace('.', ',')}`;

    if (userId) {
      const itensStr = itensArray.join(', ');
      await salvarPedido(userId, itensStr, total);
      const dadosAtualizados = await obterHistoricoPedidos(userId);
      setHistorico(dadosAtualizados);
    }

    if (Platform.OS === 'web') {
      window.alert(`Pedido Confirmado! 🎉\n\n${resumo}`);
    } else {
      Alert.alert('Pedido Confirmado! 🎉', resumo);
    }

    setComidaSelecionada(null);
    setBebidaSelecionada(null);
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

        <View style={styles.historicoContainer}>
          <Text style={styles.tituloHistorico}>Histórico de Pedidos</Text>
          {historico.map((item) => (
            <View key={item.id.toString()} style={styles.cardHistorico}>
              <View style={styles.infoHistorico}>
                <Text style={styles.itensHistorico}>{item.itens}</Text>
                <Text style={styles.dataHistorico}>{item.data}</Text>
              </View>
              <Text style={styles.totalHistorico}>R$ {item.total.toFixed(2).replace('.', ',')}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 15,
    marginTop: 10,
    color: '#555',
  },
  listaScroll: {
    paddingLeft: 15,
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
    alignItems: 'center',
    width: 130,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardSelecionado: {
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#E6F0FF',
  },
  imagemCard: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginBottom: 8,
  },
  nomeCard: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  precoCard: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 4,
  },
  resultadoContainer: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textoTotal: {
    fontSize: 14,
    color: '#666',
  },
  valorTotal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  botaoFinalizar: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  textoBotaoFinalizar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historicoContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  tituloHistorico: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cardHistorico: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoHistorico: {
    flex: 1,
    paddingRight: 10,
  },
  itensHistorico: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  dataHistorico: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  totalHistorico: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});