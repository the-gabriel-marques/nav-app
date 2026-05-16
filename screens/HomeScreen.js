import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  
  const AppIcon = ({ title, routeName, icon }) => (
    <TouchableOpacity 
      style={styles.iconContainer} 
      onPress={() => navigation.navigate(routeName)}
    >
      <Text style={styles.emoji}>{icon}</Text>
      <Text style={styles.iconText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppIcon icon="🔑" title="Login" routeName="Login" />
      <AppIcon icon="🧮" title="Calculadora" routeName="Calculator" />
      <AppIcon icon="🪙" title="Moedas" routeName="Coin" />
      <AppIcon icon="🍔" title="Fast Food" routeName="FastFood" />
      <AppIcon icon="🪐" title="Sistema Solar" routeName="SolarSystem" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#f0f0f0',
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});