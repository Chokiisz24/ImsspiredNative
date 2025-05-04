import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';

const CalculoGoteo = () => {
  const [volumen, setVolumen] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);

  // Estado para controlar la visibilidad del modal del selector de equipo
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoEquipo, setTipoEquipo] = useState<number | null>(null);
  const [equipoLabel, setEquipoLabel] = useState<string | null>(null);
  const equipos = [
    { label: 'Normogotero (3)', value: 3 },
    { label: 'Microgotero (1)', value: 1 },
  ];

  const calcularGoteo = () => {
    const v = parseFloat(volumen);
    const t = parseFloat(tiempo);
    const constante = tipoEquipo;

    if (!isNaN(v) && !isNaN(t) && constante) {
      const goteo = v / (constante * t);
      setResultado(Math.round(goteo));
    }
  };

  const handleEquipoSelect = (equipo: { label: string; value: number }) => {
    setTipoEquipo(equipo.value);
    setEquipoLabel(equipo.label);
    setModalVisible(false);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Cálculo de Goteo</Text>
        <Text style={styles.formula}>📘 Fórmula: G = Volumen / (Constante × Tiempo en horas)</Text>

        <View style={styles.selectorContainer}>
          <Text style={styles.label}>Tipo de equipo:</Text>
          <TouchableOpacity style={styles.selector} onPress={() => setModalVisible(true)}>
            <Text style={styles.selectorText}>{equipoLabel || 'Selecciona un tipo de equipo'}</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Volumen (ml)"
          keyboardType="numeric"
          value={volumen}
          onChangeText={setVolumen}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Tiempo (horas)"
          keyboardType="numeric"
          value={tiempo}
          onChangeText={setTiempo}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.boton} onPress={calcularGoteo}>
          <Text style={styles.botonTexto}>Calcular Goteo</Text>
        </TouchableOpacity>

        {resultado !== null && (
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultadoTexto}>{resultado} gotas por minuto</Text>
          </View>
        )}

        {/* Modal para el selector de equipo */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecciona un tipo de equipo</Text>
              <ScrollView>
                {equipos.map((equipo) => (
                  <TouchableOpacity
                    key={equipo.value}
                    style={styles.modalItem}
                    onPress={() => handleEquipoSelect(equipo)}
                  >
                    <Text style={styles.modalItemText}>{equipo.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
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
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#195365',
    marginBottom: 5,
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
    textAlign: 'center',
  },
  selectorContainer: {
    marginBottom: 15,
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
});

export default CalculoGoteo;