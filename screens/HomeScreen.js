import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
export default function HomeScreen({ navigation }) 

{

return (
    <View style={styles.container}>
    <Text style={styles.text}>Tela Inicial</Text>
    <Button title="Ir para Detalhes" onPress={() => navigation.navigate('Details')} />
</View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', },

        
    text: {
        fontSize: 24,
    },
});