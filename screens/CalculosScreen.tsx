import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define el tipo de las rutas que están dentro de CalculosStack en App.js
type CalculosStackParamList = {
  CalculosInicio: undefined;
  PerdidasInsensibles: undefined;
  ReglaDeTres: undefined;
  // Agrega aquí cualquier otra ruta que esté en CalculosStack
};

// Define el tipo de la prop navigation para CalculosScreen
type CalculosScreenNavigationProp = StackNavigationProp<CalculosStackParamList, 'CalculosInicio'>;

type Props = {
  navigation: CalculosScreenNavigationProp;
};

const CalculosScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculos Clínicos</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PerdidasInsensibles')}>
        <Text style={styles.buttonText}>Pérdidas Insensibles</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReglaDeTres')}>
        <Text style={styles.buttonText}>Regla de 3 - Dosis</Text>
      </TouchableOpacity>
      {/* Agrega aquí más botones para otros cálculos */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2196F3',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default CalculosScreen;