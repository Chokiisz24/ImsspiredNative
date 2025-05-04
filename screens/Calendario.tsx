import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SectionList } from 'react-native';

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

type TipoDia = 'normal' | 'festivo' | 'pago' | 'vacaciones' | 'vacio';

type Dia = {
  day: number | string;
  type: TipoDia;
};

type SectionMes = {
  title: string;
  data: Dia[][];
};

const eventosPorFecha: Record<string, TipoDia> = {
  '2025-01-01': 'festivo',
  '2025-02-03': 'festivo',
  '2025-03-17': 'festivo',
  '2025-04-17': 'festivo',
  '2025-04-18': 'festivo',
  '2025-04-19': 'festivo',
  '2025-05-01': 'festivo',
  '2025-05-10': 'festivo',
  '2025-09-15': 'festivo',
  '2025-09-16': 'festivo',
  '2025-11-17': 'festivo',
  '2025-12-25': 'festivo',
  '2025-01-11': 'pago',
  '2025-01-28': 'pago',
  '2025-02-12': 'pago',
  '2025-02-26': 'pago',
  '2025-03-12': 'pago',
  '2025-03-26': 'pago',
  '2025-04-11': 'pago',
  '2025-04-26': 'pago',
  '2025-05-13': 'pago',
  '2025-05-28': 'pago',
  '2025-06-11': 'pago',
  '2025-06-26': 'pago',
  '2025-07-11': 'pago',
  '2025-07-26': 'pago',
  '2025-08-13': 'pago',
  '2025-08-27': 'pago',
  '2025-09-10': 'pago',
  '2025-09-26': 'pago',
  '2025-10-11': 'pago',
  '2025-10-28': 'pago',
  '2025-11-12': 'pago',
  '2025-11-26': 'pago',
  '2025-12-11': 'pago',
  '2025-12-26': 'pago',
  '2025-01-20': 'vacaciones',
  '2025-02-04': 'vacaciones',
  '2025-02-18': 'vacaciones',
  '2025-03-04': 'vacaciones',
  '2025-03-24': 'vacaciones',
  '2025-04-07': 'vacaciones',
  '2025-04-23': 'vacaciones',
  '2025-05-08': 'vacaciones',
  '2025-05-26': 'vacaciones',
  '2025-06-09': 'vacaciones',
  '2025-06-23': 'vacaciones',
  '2025-07-07': 'vacaciones',
  '2025-07-21': 'vacaciones',
  '2025-08-04': 'vacaciones',
  '2025-08-18': 'vacaciones',
  '2025-09-01': 'vacaciones',
  '2025-09-17': 'vacaciones',
  '2025-10-01': 'vacaciones',
  '2025-10-20': 'vacaciones',
  '2025-11-03': 'vacaciones',
  '2025-11-18': 'vacaciones',
  '2025-12-16': 'vacaciones',
  '2025-12-31': 'vacaciones',
};

const getDiasDelMes = (year: number, month: number): Dia[] => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dias: Dia[] = [];

  const offset = (firstDay === 0) ? 6 : firstDay - 1;
  for (let i = 0; i < offset; i++) {
    dias.push({ day: '', type: 'vacio' });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const tipo = eventosPorFecha[dateStr] || 'normal';
    dias.push({ day: i, type: tipo });
  }

  return dias;
};

const getSemanasDelMes = (year: number, month: number): Dia[][] => {
  const dias = getDiasDelMes(year, month);
  const semanas: Dia[][] = [];
  let semanaActual: Dia[] = [];
  dias.forEach((dia) => {
    semanaActual.push(dia);
    if (semanaActual.length === 7) {
      semanas.push(semanaActual);
      semanaActual = [];
    }
  });
  if (semanaActual.length > 0) {
    while (semanaActual.length < 7) {
      semanaActual.push({ day: '', type: 'vacio' });
    }
    semanas.push(semanaActual);
  }
  return semanas;
};

const getDatosCalendarioCompleto = (year: number): SectionMes[] => {
  return meses.map((mes, index) => ({
    title: mes,
    data: getSemanasDelMes(year, index),
  }));
};

const Calendario = () => {
  const hoy = new Date();
  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [mostrarCompleto, setMostrarCompleto] = useState(false);
  const year = 2025;

  const cambiarMes = (delta: number) => {
    setMesActual((prev) => {
      let nuevoMes = prev + delta;
      if (nuevoMes < 0) return 11;
      if (nuevoMes > 11) return 0;
      return nuevoMes;
    });
  };

  const renderDia = ({ item }: { item: Dia }) => (
    <View style={[styles.dia, estilosPorTipo[item.type]]}>
      <Text style={styles.textoDia}>{item.day}</Text>
    </View>
  );

  const renderHeaderMes = ({ section }: { section: SectionMes }) => (
    <View>
      <Text style={styles.tituloMes}>{section.title} {year}</Text>
      <View style={styles.encabezado}>
        {diasSemana.map((dia) => (
          <Text key={dia} style={styles.encabezadoDia}>{dia}</Text>
        ))}
      </View>
    </View>
  );

  const renderSemana = ({ item: semana }: { item: Dia[] }) => (
    <View style={styles.filaSemana}>
      {semana.map((dia, index) => (
        <View key={index} style={[styles.dia, estilosPorTipo[dia.type]]}>
          <Text style={styles.textoDia}>{dia.day}</Text>
        </View>
      ))}
    </View>
  );

  const renderCalendarioCompleto = () => {
    const datos = getDatosCalendarioCompleto(year);
    return (
      <SectionList
        sections={datos}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={renderHeaderMes}
        renderItem={renderSemana}
        stickySectionHeadersEnabled={false} // Desactivamos los encabezados pegajosos
      />
    );
  };

  const renderCalendarioUnMes = () => {
    const semanas = getSemanasDelMes(year, mesActual);

    return (
      <View>
        <Text style={styles.tituloMes}>{meses[mesActual]} {year}</Text>
        <View style={styles.encabezado}>
          {diasSemana.map((dia) => (
            <Text key={dia} style={styles.encabezadoDia}>{dia}</Text>
          ))}
        </View>
        <FlatList
          data={semanas}
          renderItem={renderSemana}
          keyExtractor={(semana, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.botonesMes}>
        <TouchableOpacity onPress={() => cambiarMes(-1)} style={styles.botonMes}>
          <Text style={styles.botonTextoMes}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMostrarCompleto(!mostrarCompleto)} style={styles.botonMostrar}>
          <Text style={styles.botonTextoMostrar}>
            {mostrarCompleto ? 'Ver un mes' : 'Ver todo el año'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => cambiarMes(1)} style={styles.botonMes}>
          <Text style={styles.botonTextoMes}>→</Text>
        </TouchableOpacity>
      </View>

      {mostrarCompleto ? renderCalendarioCompleto() : renderCalendarioUnMes()}

      <View style={styles.leyendaContainer}>
        <View style={[styles.leyendaColor, { backgroundColor: estilosPorTipo.festivo.backgroundColor }]} />
        <Text style={styles.leyendaTexto}>Días Festivos</Text>
        <View style={[styles.leyendaColor, { backgroundColor: estilosPorTipo.pago.backgroundColor }]} />
        <Text style={styles.leyendaTexto}>Días de Pago</Text>
        <View style={[styles.leyendaColor, { backgroundColor: estilosPorTipo.vacaciones.backgroundColor }]} />
        <Text style={styles.leyendaTexto}>Roles Vacacionales</Text>
      </View>
    </View>
  );
};

const estilosPorTipo: Record<TipoDia, { backgroundColor: string }> = {
  normal: { backgroundColor: 'transparent' },
  festivo: { backgroundColor: '#A9D7B8' },
  pago: { backgroundColor: 'rgb(100, 160, 238)' },
  vacaciones: { backgroundColor: '#F6B9BC' },
  vacio: { backgroundColor: 'transparent' },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  tituloMes: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#1F2937',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  encabezadoDia: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6B7280',
  },
  filaSemana: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dia: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 2,
  },
  textoDia: {
    fontSize: 16,
    color: '#111827',
  },
  botonesMes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  botonMes: {
    backgroundColor: '#1F2937',
    padding: 10,
    borderRadius: 8,
    width: '15%',
    alignItems: 'center',
  },
  botonTextoMes: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  botonMostrar: {
    backgroundColor: '#4472C4',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexGrow: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  botonTextoMostrar: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  leyendaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  leyendaColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  leyendaTexto: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default Calendario;