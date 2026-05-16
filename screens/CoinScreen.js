import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Keyboard,
  Alert,
  SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EXCHANGE_RATES = {
  BRL: 1.0,
  USD: 5.05,
  EUR: 5.45,
  GBP: 6.35,
};

const CURRENCY_FLAGS = {
  BRL: 'https://flagcdn.com/w80/br.png',
  USD: 'https://flagcdn.com/w80/us.png',
  EUR: 'https://flagcdn.com/w80/eu.png',
  GBP: 'https://flagcdn.com/w80/gb.png',
};

export default function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const formatCurrency = (value, currencyCode) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
    }).format(value);
  };

  const handleConvert = () => {
    Keyboard.dismiss();

    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor numérico válido maior que zero.');
      return;
    }

    if (fromCurrency === toCurrency) {
      Alert.alert('Aviso', 'A moeda de origem e destino não podem ser iguais.');
      return;
    }

    const valueInBase = numericAmount * EXCHANGE_RATES[fromCurrency];
    const convertedValue = valueInBase / EXCHANGE_RATES[toCurrency];

    setResult(convertedValue);

    const newHistoryItem = {
      id: Math.random().toString(),
      originalValue: formatCurrency(numericAmount, fromCurrency),
      convertedValue: formatCurrency(convertedValue, toCurrency),
      date: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const handleReset = () => {
    setAmount('');
    setResult(null);
    setFromCurrency('BRL');
    setToCurrency('USD');
    setHistory([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Conversor de Moedas</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Valor para converter:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 100"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.currencySelectorContainer}>
          <View style={styles.pickerWrapper}>
            <Image source={{ uri: CURRENCY_FLAGS[fromCurrency] }} style={styles.flagIcon} />
            <Picker
              selectedValue={fromCurrency}
              style={styles.picker}
              onValueChange={(itemValue) => setFromCurrency(itemValue)}
            >
              <Picker.Item label="Real (BRL)" value="BRL" />
              <Picker.Item label="Dólar (USD)" value="USD" />
              <Picker.Item label="Euro (EUR)" value="EUR" />
              <Picker.Item label="Libra (GBP)" value="GBP" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
            <Text style={styles.swapText}>⇄</Text>
          </TouchableOpacity>

          <View style={styles.pickerWrapper}>
            <Image source={{ uri: CURRENCY_FLAGS[toCurrency] }} style={styles.flagIcon} />
            <Picker
              selectedValue={toCurrency}
              style={styles.picker}
              onValueChange={(itemValue) => setToCurrency(itemValue)}
            >
              <Picker.Item label="Real (BRL)" value="BRL" />
              <Picker.Item label="Dólar (USD)" value="USD" />
              <Picker.Item label="Euro (EUR)" value="EUR" />
              <Picker.Item label="Libra (GBP)" value="GBP" />
            </Picker>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
            <Text style={styles.buttonText}>Converter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Resultado:</Text>
            <Text style={styles.resultValue}>
              {formatCurrency(result, toCurrency)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Últimas Conversões</Text>
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>
                {item.originalValue} ➔ {item.convertedValue}
              </Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyHistory}>Nenhuma conversão recente.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    marginBottom: 20,
  },
  currencySelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    zIndex: 1,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden',
    alignItems: 'center',
  },
  flagIcon: {
    width: 32,
    height: 20,
    marginTop: 10,
    borderRadius: 2,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  swapButton: {
    backgroundColor: '#E5E7EB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  swapText: {
    fontSize: 20,
    color: '#374151',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  convertButton: {
    flex: 2,
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  resultLabel: {
    fontSize: 14,
    color: '#1D4ED8',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  historyContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  historyText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  historyDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyHistory: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 20,
    fontStyle: 'italic',
  },
});