import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';

const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const ContratosEventuales = () => {
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState<{ [key: string]: any }>({});
  const [turno, setTurno] = useState<'diurno' | 'nocturno'>('diurno');
  const [descansos, setDescansos] = useState<string[]>([]);

  const toggleFecha = (day: any) => {
    const fecha = day.dateString;
    setFechasSeleccionadas(prev => {
      const nueva = { ...prev };
      if (nueva[fecha]) {
        delete nueva[fecha];
      } else {
        nueva[fecha] = { selected: true, marked: true, selectedColor: '#27D98B' };
      }
      return nueva;
    });
  };

  const toggleDescanso = (dia: string) => {
    setDescansos(prev =>
      prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
    );
  };

  const calcularUnidades = () => {
    const diasTotales = Object.keys(fechasSeleccionadas).length;

    const diasLaborados = Object.keys(fechasSeleccionadas).filter(fecha => {
      const dia = new Date(fecha).toLocaleDateString('es-MX', { weekday: 'long' });
      const diaCapitalizado = dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase();
      return !descansos.includes(diaCapitalizado);
    });

    const valorUnidad = turno === 'diurno' ? 1.4 : 2.3;
    const unidadesGanadas = diasLaborados.length * valorUnidad;
    const unidadesFaltantes = Math.max(0, 14 - unidadesGanadas);

    Alert.alert(
      'Resultado',
      `Unidades ganadas: ${unidadesGanadas.toFixed(1)}\nUnidades faltantes: ${unidadesFaltantes.toFixed(1)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecciona los días del contrato:</Text>

      <Calendar
        onDayPress={toggleFecha}
        markedDates={fechasSeleccionadas}
        theme={{
          selectedDayBackgroundColor: '#195365',
          todayTextColor: '#27D98B',
        }}
      />

      <Text style={styles.subtitulo}>Selecciona el turno:</Text>
      <View style={styles.turnosContainer}>
        <TouchableOpacity
          style={[styles.boton, turno === 'diurno' && styles.botonSeleccionado]}
          onPress={() => setTurno('diurno')}
        >
          <Text style={turno === 'diurno' ? styles.textoSeleccionado : styles.textoNormal}>Diurno</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.boton, turno === 'nocturno' && styles.botonSeleccionado]}
          onPress={() => setTurno('nocturno')}
        >
          <Text style={turno === 'nocturno' ? styles.textoSeleccionado : styles.textoNormal}>Nocturno</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Selecciona tus días de descanso:</Text>
      <View style={styles.botonesContainer}>
        {diasSemana.map((dia, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => toggleDescanso(dia)}
            style={[
              styles.boton,
              descansos.includes(dia) ? styles.botonSeleccionado : styles.botonNoSeleccionado,
            ]}
          >
            <Text
              style={[
                styles.textoBoton,
                descansos.includes(dia) ? styles.textoSeleccionado : styles.textoNormal,
              ]}
            >
              {dia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={calcularUnidades} style={styles.botonCalcular}>
        <Text style={styles.textoBotonCalcular}>Calcular unidades</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContratosEventuales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  turnosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botonesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  boton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 4,
    borderWidth: 2,
    borderColor: '#195365',
  },
  botonSeleccionado: {
    backgroundColor: '#195365',
  },
  botonNoSeleccionado: {
    backgroundColor: 'transparent',
  },
  textoBoton: {
    fontWeight: '600',
  },
  textoSeleccionado: {
    color: '#fff',
  },
  textoNormal: {
    color: '#195365',
  },
  botonCalcular: {
    backgroundColor: 'rgb(5, 77, 159)',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  textoBotonCalcular: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
