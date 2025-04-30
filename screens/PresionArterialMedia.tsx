import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const PresionArterialMedia = () => {
  const [pas, setPas] = useState('');
  const [pad, setPad] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);

  const calcularPAM = () => {
    const pasNum = parseFloat(pas);
    const padNum = parseFloat(pad);
    if (!isNaN(pasNum) && !isNaN(padNum)) {
      const pam = (pasNum + 2 * padNum) / 3;
      setResultado(pam);
    }
  };

  const interpretarPAM = (pam: number): { texto: string; color: string } => {
    if (pam < 60) return { texto: '⚠️ Hipoperfusión – Riesgo para órganos', color: '#E57373' };
    if (pam < 70) return { texto: '🟡 Perfusión baja – Monitorizar', color: '#FFB74D' };
    if (pam <= 100) return { texto: '🟢 PAM normal – Buena perfusión', color: '#81C784' };
    return { texto: '🔴 Hipertensión – Posible sobrecarga', color: '#BA68C8' };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cálculo de Presión Arterial Media (PAM)</Text>

      <Text style={styles.formula}>📘 Fórmula: PAM = PAS + (2 x PAD) / 3</Text>

      <TextInput
        style={styles.input}
        placeholder="Presión Arterial Sistólica (PAS)"
        keyboardType="numeric"
        value={pas}
        onChangeText={setPas}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Presión Arterial Diastólica (PAD)"
        keyboardType="numeric"
        value={pad}
        onChangeText={setPad}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.boton} onPress={calcularPAM}>
        <Text style={styles.botonTexto}>Calcular PAM</Text>
      </TouchableOpacity>

      {resultado !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTexto}>PAM: {resultado.toFixed(2)} mmHg</Text>
          <Text
            style={[
              styles.interpretacionTexto,
              { color: interpretarPAM(resultado).color },
            ]}
          >
            {interpretarPAM(resultado).texto}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#195365',
    marginBottom: 10,
  },
  formula: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#195365',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  boton: {
    backgroundColor: '#195365',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultadoContainer: {
    backgroundColor: '#f4f4f4',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#195365',
  },
  resultadoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#195365',
    marginBottom: 10,
    textAlign: 'center',
  },
  interpretacionTexto: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PresionArterialMedia;
