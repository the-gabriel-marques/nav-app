import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { validarLogin, cadastrarUsuario } from '../database';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuthentication = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Campos vazios', 'Por favor, insira o usuário e a senha.');
      return;
    }

    if (isRegistering) {
      const result = await cadastrarUsuario(username, password);
      if (result.success) {
        Alert.alert('Sucesso 🎉', 'Sua conta foi criada com sucesso! Agora faça seu login.');
        setIsRegistering(false);
        setPassword('');
      } else {
        Alert.alert('Erro no cadastro', result.error);
      }
    } else {
      const result = await validarLogin(username, password);
      if (result.success) {
        navigation.replace('Home', { user: result.user });
      } else {
        Alert.alert('Acesso Negado ❌', 'Usuário ou senha inválidos.');
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.emojiLogo}>{isRegistering ? '📝' : '🔐'}</Text>
        <Text style={styles.title}>{isRegistering ? 'Criar Nova Conta' : 'Acessar Sistema'}</Text>
        <Text style={styles.subtitle}>Insira suas credenciais abaixo</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Nome de usuário" 
          placeholderTextColor="#999"
          value={username} 
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Senha" 
          placeholderTextColor="#999"
          secureTextEntry 
          value={password} 
          onChangeText={setPassword}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.buttonText}>{isRegistering ? 'Cadastrar' : 'Entrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isRegistering ? 'Já possui uma conta? Acesse aqui' : 'Não tem conta? Toque para cadastrar'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E24',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
  },
  emojiLogo: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#F5F5F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    marginTop: 20,
  },
  toggleText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});