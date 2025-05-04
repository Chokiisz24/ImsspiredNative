import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';

const categoriasIngresos = [
  'Vía Oral',
  'Sondas',
  'Sol. Parenterales y elect.',
  'Sangre y Hemoderivados',
  'Nutrición Parenteral T.',
  'Medicamentos',
  'Otros',
];

const categoriasEgresos = [
  'Uresis',
  'Evacuaciones',
  'Sangrado',
  'Vómito',
  'Aspiración',
  'Drenajes',
  'Pérdidas insensibles',
];

const ControlLiquidos: React.FC = () => {
  const [ingresos, setIngresos] = useState<{ [key: string]: string }>({});
  const [egresos, setEgresos] = useState<{ [key: string]: string }>({});

  const handleChange = (
    category: string,
    value: string,
    type: 'ingresos' | 'egresos'
  ) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (type === 'ingresos') {
      setIngresos({ ...ingresos, [category]: numericValue });
    } else {
      setEgresos({ ...egresos, [category]: numericValue });
    }
  };

  const calcularTotal = (datos: { [key: string]: string }) =>
    Object.values(datos).reduce((total, val) => total + Number(val || 0), 0);

  const totalIngresos = calcularTotal(ingresos);
  const totalEgresos = calcularTotal(egresos);
  const balance = totalIngresos - totalEgresos;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🟦 Ingresos</Text>
      {categoriasIngresos.map((cat) => (
        <View key={cat} style={styles.row}>
          <Text style={styles.label}>{cat}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={ingresos[cat] || ''}
            onChangeText={(text) => handleChange(cat, text, 'ingresos')}
            placeholder="ml"
          />
        </View>
      ))}
      <Text style={styles.total}>Total Ingresos: {totalIngresos} ml</Text>

      <Text style={styles.title}>🟥 Egresos</Text>
      {categoriasEgresos.map((cat) => (
        <View key={cat} style={styles.row}>
          <Text style={styles.label}>{cat}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={egresos[cat] || ''}
            onChangeText={(text) => handleChange(cat, text, 'egresos')}
            placeholder="ml"
          />
        </View>
      ))}
      <Text style={styles.total}>Total Egresos: {totalEgresos} ml</Text>

      <Text style={styles.balance}>
        ⚖️ Balance de líquidos: {balance} ml
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#195365',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    width: 100,
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#195365',
  },
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#27D98B',
    textAlign: 'center',
  },
});

export default ControlLiquidos;
