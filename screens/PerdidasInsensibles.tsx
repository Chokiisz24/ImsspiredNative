import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PerdidasInsensibles = () => {
  const [peso, setPeso] = useState('');
  const [horas, setHoras] = useState('');
  const [valorTemperatura, setValorTemperatura] = useState(0.5);
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    const pesoNum = parseFloat(peso);
    const horasNum = parseFloat(horas);
    if (!isNaN(pesoNum) && !isNaN(horasNum)) {
      const ml = (pesoNum * valorTemperatura) * horasNum;
      setResultado(ml);
    }
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.titulo}>Cálculo de Pérdidas Insensibles</Text>

          <Text style={styles.formula}>📘 Fórmula: Peso × Temperatura × Horas</Text>

          <TextInput
            style={styles.input}
            placeholder="Peso en kg (ej. 70)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={peso}
            onChangeText={setPeso}
          />

          <TextInput
            style={styles.input}
            placeholder="Horas trabajadas (ej. 8)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={horas}
            onChangeText={setHoras}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Temperatura corporal</Text>
            <Picker
              selectedValue={valorTemperatura}
              onValueChange={(itemValue) => setValorTemperatura(itemValue)}
              dropdownIconColor="#195365"
              style={styles.picker}
            >
              <Picker.Item label="< 37°C (0.5)" value={0.5} />
              <Picker.Item label="37.1°C - 38°C (0.6)" value={0.6} />
              <Picker.Item label="38.1°C - 39°C (0.7)" value={0.7} />
              <Picker.Item label="> 39°C (1.0)" value={1.0} />
            </Picker>
          </View>

          <TouchableOpacity style={styles.boton} onPress={calcular}>
            <Text style={styles.botonTexto}>Calcular</Text>
          </TouchableOpacity>

          {resultado !== null && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoTexto}>Resultado: {resultado.toFixed(2)} ml</Text>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PerdidasInsensibles;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#195365',
    marginBottom: 10,
    textAlign: 'center',
  },
  formula: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#195365',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#195365',
    marginBottom: 6,
  },
  picker: {
    width: '100%',
    color: '#000',
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
    textAlign: 'center',
  },
});
