import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initDatabase } from "./database";

// Importações de todas as suas telas
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CalculatorScreen from "./screens/CalculatorScreen";
import CoinScreen from "./screens/CoinScreen";
import FastFoodScreen from "./screens/FastFoodScreen";
import SolarSystemScreen from "./screens/SolarSystemScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  
  useEffect(() => {
    initDatabase()
      .then(() => console.log("Banco de dados pronto."))
      .catch((err) => console.log("Erro ao iniciar o banco:", err));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Menu Principal', headerLeft: () => null }}
        />
        
        {/* Rotas das funcionalidades já criadas */}
        <Stack.Screen name="Calculator" component={CalculatorScreen} options={{ title: 'Calculadora de IMC' }} />
        <Stack.Screen name="Coin" component={CoinScreen} options={{ title: 'Conversor de Moedas' }} />
        <Stack.Screen name="FastFood" component={FastFoodScreen} options={{ title: 'Pedidos' }} />
        <Stack.Screen name="SolarSystem" component={SolarSystemScreen} options={{ title: 'Sistema Solar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}