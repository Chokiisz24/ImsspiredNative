import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type ParamList = {
  DetallePatron: {
    descripcion: string;
    nombre: string;
  };
};

type DetallePatronProps = {
  route: RouteProp<ParamList, 'DetallePatron'>;
  navigation: any;
};

const DetallePatron: React.FC<DetallePatronProps> = ({ route, navigation }) => {
  const { descripcion, nombre } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: nombre,
    });
  }, [nombre, navigation]);

  const renderTextoConFormato = (texto: string) => {
    return texto.split('\n').map((linea, index) => {
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
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.contentBox}>
        <Text style={styles.title}>Detalles del Patrón Funcional</Text>
        {renderTextoConFormato(descripcion)}
      </View>
    </ScrollView>
  );
};

export default DetallePatron;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1,
  },
  contentBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 22,
    color: '#195365',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#195365',
    marginBottom: 8,
  },
  normalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
});
