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
  TouchableOpacity // 👈 aquí lo agregas
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
    const ml = (pesoNum * valorTemperatura) * horasNum;
    setResultado(ml);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Pérdidas Insensibles</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 70"
              placeholderTextColor="#ccc"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Horas trabajadas</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. 8"
              placeholderTextColor="#ccc"
              value={horas}
              onChangeText={setHoras}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Temperatura corporal</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={valorTemperatura}
                onValueChange={(itemValue) => setValorTemperatura(itemValue)}
                dropdownIconColor="#fff"
                style={styles.picker}
              >
                <Picker.Item label="< 37°C (0.5)" value={0.5} />
                <Picker.Item label="37.1°C - 38°C (0.6)" value={0.6} />
                <Picker.Item label="38.1°C - 39°C (0.7)" value={0.7} />
                <Picker.Item label="> 39°C (1.0)" value={1.0} />
              </Picker>
            </View>
          </View>

<TouchableOpacity style={styles.button} onPress={calcular} activeOpacity={0.8}>
  <Text style={styles.buttonText}>Calcular</Text>
</TouchableOpacity>



          {resultado !== null && (
            <Text style={styles.result}>
              Resultado: {resultado.toFixed(2)} ml
            </Text>
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
    backgroundColor: '#195365',
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1e5e73',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#195365',
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    color: '#fff',
    width: '100%',
  },
  buttonContainer: {
    marginVertical: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  result: {
    color: '#27D98B',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'rgb(5, 77, 159)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});
