import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { salvarIMC, obterHistoricoIMC } from '../database';

export default function CalculatorScreen({ route }) {
  const userId = route.params?.user?.id;
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultadoIMC, setResultadoIMC] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    if (userId) {
      obterHistoricoIMC(userId).then(setHistorico);
    }
  }, [userId]);

  const calcularIMC = async () => {
    const p = parseFloat(peso.replace(',', '.'));
    const a = parseFloat(altura.replace(',', '.'));

    if (!p || !a || a <= 0) {
      Alert.alert('Erro', 'Insira valores válidos para peso e altura.');
      return;
    }

    const imc = parseFloat((p / (a * a)).toFixed(2));
    setResultadoIMC(imc);

    let classe = '';
    if (imc < 18.5) classe = 'Abaixo do peso';
    else if (imc < 25) classe = 'Peso normal';
    else if (imc < 30) classe = 'Sobrepeso';
    else classe = 'Obesidade';

    setClassificacao(classe);

    if (userId) {
      await salvarIMC(userId, p, a, imc, classe);
      const dadosAtualizados = await obterHistoricoIMC(userId);
      setHistorico(dadosAtualizados);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculadora de IMC</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Peso (kg). Ex: 75"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Altura (m). Ex: 1.78"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular e Salvar</Text>
        </TouchableOpacity>

        {resultadoIMC && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>IMC: {resultadoIMC}</Text>
            <Text style={styles.classText}>{classificacao}</Text>
          </View>
        )}
      </View>

      <Text style={styles.historyTitle}>Histórico de Cálculos</Text>
      
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <View>
              <Text style={styles.historyDetails}>{item.peso}kg | {item.altura}m</Text>
              <Text style={styles.historyDate}>{item.data}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.historyValue}>IMC: {item.imc}</Text>
              <Text style={styles.historyStatus}>{item.resultado}</Text>
            </View>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E24',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  button: {
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 15,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  classText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  historyDetails: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  historyValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  historyStatus: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
    marginTop: 2,
  },
});