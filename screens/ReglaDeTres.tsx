// Opción 1: Mostrar en una alerta
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

const ReglaDeTres = () => {
  const [dosisTotal, setDosisTotal] = useState('');
  const [mlTotal, setMlTotal] = useState('');
  const [dosisIndicada, setDosisIndicada] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    const total = parseFloat(dosisTotal);
    const ml = parseFloat(mlTotal);
    const dosis = parseFloat(dosisIndicada);

    if (isNaN(total) || isNaN(ml) || isNaN(dosis) || total === 0) {
      setResultado(null);
      return;
    }

    const resultadoMl = (dosis * ml) / total;
    setResultado(resultadoMl);
    Keyboard.dismiss();
  };

  const mostrarUnidadesInsulina = (ml: number) => {
    if (ml <= 1) {
      const unidades = [1, 10, 20, 50, 100];
      const mensaje = unidades.map((ui, index) => `${ui} UI = ${(ui * 0.01).toFixed(2)} ml`).join('\n');
      Alert.alert(
        'Unidades de Insulina',
        mensaje,
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: false }
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Cálculo de Dosis (Regla de 3)</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Dosis total del frasco (mg)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={dosisTotal}
              onChangeText={setDosisTotal}
              placeholder="Ej. 100"
              placeholderTextColor="#ccc"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Mililitros totales del frasco (ml)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={mlTotal}
              onChangeText={setMlTotal}
              placeholder="Ej. 2"
              placeholderTextColor="#ccc"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Dosis indicada por el médico (mg)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={dosisIndicada}
              onChangeText={setDosisIndicada}
              placeholder="Ej. 20"
              placeholderTextColor="#ccc"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={calcular}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          {resultado !== null && (
            <View>
              <Text style={styles.resultado}>
                Debes administrar: {resultado.toFixed(2)} ml
              </Text>

              {/* Mostrar unidades de insulina si es menor o igual a 1 ml */}
              {resultado <= 1 && (
                <TouchableOpacity onPress={() => mostrarUnidadesInsulina(resultado)}>
                  <Text style={styles.verUnidadesButton}>Ver Unidades de Insulina</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// ... (estilos)
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#195365',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  field: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1e5e73',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'rgb(5, 77, 159)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  resultado: {
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center',
    color: '#27D98B',
    fontWeight: 'bold',
  },
  verUnidadesButton: {
    marginTop: 10,
    color: '#3498db', // Color azul para indicar que es un enlace/botón
    textAlign: 'center',
    textDecorationLine: 'underline', // Subrayado para mayor claridad
    fontSize: 16,
  },
});

export default ReglaDeTres;