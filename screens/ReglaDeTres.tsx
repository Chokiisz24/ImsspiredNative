import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';

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
      Alert.alert('Error', 'Por favor, completa todos los campos correctamente.');
      setResultado(null);
      return;
    }

    const resultadoMl = (dosis * ml) / total;
    setResultado(resultadoMl);
    Keyboard.dismiss();
  };

  const mostrarUnidadesInsulina = (ml: number) => {
    const unidades = [1, 10, 20, 50, 100];
    const mensaje = unidades.map((ui) => `${ui} UI = ${(ui * 0.01).toFixed(2)} ml`).join('\n');

    Alert.alert(
      'Equivalencias de Unidades de Insulina',
      mensaje,
      [{ text: 'Cerrar', style: 'default' }],
      { cancelable: true }
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.titulo}>Cálculo Regla de Tres</Text>
          <Text style={styles.formula}>📘 Fórmula: (Dosis indicada × ml) / Dosis total</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={dosisTotal}
            onChangeText={setDosisTotal}
            placeholder="Dosis total del frasco (mg)"
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={mlTotal}
            onChangeText={setMlTotal}
            placeholder="Mililitros totales del frasco (ml)"
            placeholderTextColor="#888"
          />

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={dosisIndicada}
            onChangeText={setDosisIndicada}
            placeholder="Dosis indicada por el médico (mg)"
            placeholderTextColor="#888"
          />

          <TouchableOpacity style={styles.boton} onPress={calcular}>
            <Text style={styles.botonTexto}>Calcular</Text>
          </TouchableOpacity>

          {resultado !== null && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoTexto}>Resultado: {resultado.toFixed(2)} ml</Text>

              {resultado <= 1 && (
                <TouchableOpacity onPress={() => mostrarUnidadesInsulina(resultado)}>
                  <Text style={styles.verUnidadesButton}>Ver Unidades de Insulina</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ReglaDeTres;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
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
  verUnidadesButton: {
    marginTop: 10,
    textAlign: 'center',
    color: '#195365',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
