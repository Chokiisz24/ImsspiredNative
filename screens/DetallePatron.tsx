import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type ParamList = {
  DetallePatron: {
    descripcion: string;
    nombre: string; // Añadimos el nombre del patrón
  };
};

type DetallePatronProps = {
  route: RouteProp<ParamList, 'DetallePatron'>;
  navigation: any; // Aquí agregamos `navigation` para actualizar el título
};

const DetallePatron: React.FC<DetallePatronProps> = ({ route, navigation }) => {
  const { descripcion, nombre } = route.params;

  // Usamos useEffect para actualizar el título de la barra de navegación
  useEffect(() => {
    navigation.setOptions({
      title: nombre, // Cambia el título por el nombre del patrón
    });
  }, [nombre, navigation]);

  const renderTextoConFormato = (texto: string) => {
    const partes = texto.split('\n').map((linea, index) => {
      if (linea.includes('Qué valora:') || linea.includes('Cómo se valora:')) {
        return (
          <Text key={index} style={styles.boldText}>
            {linea}
          </Text>
        );
      }
      return (
        <Text key={index} style={styles.normalText}>
          {linea}
        </Text>
      );
    });
    return partes;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalles del Patrón Funcional</Text>
      {renderTextoConFormato(descripcion)}
    </ScrollView>
  );
};

export default DetallePatron;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#195365',
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  normalText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
  },
});
