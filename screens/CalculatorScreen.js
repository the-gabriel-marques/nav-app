import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";

export default function App() {
  const [peso, setPeso] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState("");

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      Alert.alert('Erro', 'Por favor, insira números válidos.');
      setImc(null);
    } else {
      const calculoIMC = pesoNum / (alturaNum * alturaNum);
      
      setImc(calculoIMC);

      if (calculoIMC < 18.5) {
        setClassificacao('Magreza');
      } else if (calculoIMC >= 18.5 && calculoIMC < 25) {
        setClassificacao('Normal');
      } else if (calculoIMC >= 25 && calculoIMC < 30) {
        setClassificacao('Sobrepeso');
      } else if (calculoIMC >= 30 && calculoIMC < 40) {
        setClassificacao('Obesidade');
      } else if (calculoIMC >= 40) {
        setClassificacao('Obesidade Grave');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Digite seu peso:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Digite sua altura:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
      </View>

      <Button title="Calcular seu IMC" onPress={calcularIMC} />    

      {imc !== "" && imc !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTexto}>
            Seu IMC: {imc.toFixed(2)}
          </Text>
          <Text style={styles.resultadoClassificacao}>
            {classificacao}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  resultadoContainer: {
    marginTop: 30,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
  },
  resultadoTexto: {
    fontSize: 22,
    fontWeight: "bold",
  },
  resultadoClassificacao: {
    fontSize: 20,
    color: "#00796b",
    marginTop: 10,
    fontWeight: "bold",
  }
});