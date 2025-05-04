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
  Modal,
} from 'react-native';

interface TemperaturaOption {
  label: string;
  value: number;
}

const PerdidasInsensibles = () => {
  const [peso, setPeso] = useState('');
  const [horas, setHoras] = useState('');
  const [valorTemperatura, setValorTemperatura] = useState<number | null>(0.5);
  const [temperaturaLabel, setTemperaturaLabel] = useState<string>('< 37°C (0.5)');
  const [resultado, setResultado] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const temperaturaOptions: TemperaturaOption[] = [
    { label: '< 37°C (0.5)', value: 0.5 },
    { label: '37.1°C - 38°C (0.6)', value: 0.6 },
    { label: '38.1°C - 39°C (0.7)', value: 0.7 },
    { label: '> 39°C (1.0)', value: 1.0 },
  ];

  const calcular = () => {
    const pesoNum = parseFloat(peso);
    const horasNum = parseFloat(horas);
    if (!isNaN(pesoNum) && !isNaN(horasNum) && valorTemperatura !== null) {
      const ml = (pesoNum * valorTemperatura) * horasNum;
      setResultado(ml);
    }
    Keyboard.dismiss();
  };

  const handleTemperaturaSelect = (option: TemperaturaOption) => {
    setValorTemperatura(option.value);
    setTemperaturaLabel(option.label);
    setModalVisible(false); // Close modal after selection
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

          {/* Custom Selector (Modal Trigger) */}
          <View style={styles.selectorContainer}>
            <Text style={styles.pickerLabel}>Temperatura corporal</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setModalVisible(true)} // Open modal on press
            >
              <Text style={styles.selectorText}>{temperaturaLabel}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.boton} onPress={calcular}>
            <Text style={styles.botonTexto}>Calcular</Text>
          </TouchableOpacity>

          {resultado !== null && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoTexto}>Resultado: {resultado.toFixed(2)} ml</Text>
            </View>
          )}

          {/* Modal Component */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)} // Handle back button on Android
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecciona la Temperatura</Text>
                <ScrollView>
                  {temperaturaOptions.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.modalItem}
                      onPress={() => handleTemperaturaSelect(option)} // Select option
                    >
                      <Text style={styles.modalItemText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)} // Close button
                >
                  <Text style={styles.modalCloseText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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
  selectorContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#195365',
    marginBottom: 6,
  },
  selector: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  selectorText: {
    color: '#888',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#195365',
    marginBottom: 15,
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#195365',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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

export default PerdidasInsensibles;
