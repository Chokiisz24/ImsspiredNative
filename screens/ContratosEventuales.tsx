import React, { useState } from 'react';
 import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
 import { Calendar } from 'react-native-calendars';

 const diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

 interface FechasSeleccionadas {
   [key: string]: { selected: boolean; marked: boolean; selectedColor: string };
 }

 type Turno = 'diurno' | 'nocturno';

 const ContratosEventuales: React.FC = () => {
   const [fechasSeleccionadas, setFechasSeleccionadas] = useState<FechasSeleccionadas>({});
   const [turno, setTurno] = useState<Turno>('diurno');
   const [descansos, setDescansos] = useState<string[]>([]);

   const toggleFecha = (day: any) => {
     const fecha: string = day.dateString;
     setFechasSeleccionadas(prev => {
       const nueva: FechasSeleccionadas = { ...prev };
       if (nueva[fecha]) {
         delete nueva[fecha];
       } else {
         nueva[fecha] = { selected: true, marked: true, selectedColor: '#27D98B' };
       }
       return nueva;
     });
   };

   const toggleDescanso = (dia: string) => {
     setDescansos(prev => {
       if (prev.includes(dia)) {
         return prev.filter(d => d !== dia);
       } else {
         return [...prev, dia];
       }
     });
   };

   const calcularUnidades = () => {
     const diasTotales: number = Object.keys(fechasSeleccionadas).length;
     const diasLaborados: string[] = Object.keys(fechasSeleccionadas).filter(fecha => {
       const dia: string = new Date(fecha).toLocaleDateString('es-MX', { weekday: 'long' });
       const diaCapitalizado: string = dia.charAt(0).toUpperCase() + dia.slice(1).toLowerCase();
       return !descansos.includes(diaCapitalizado);
     });
     const valorUnidad: number = turno === 'diurno' ? 1.4 : 2.3;
     const unidadesGanadas: number = diasLaborados.length * valorUnidad;
     const unidadesFaltantes: number = Math.max(0, 14 - unidadesGanadas);

     Alert.alert(
       'Resultado',
       `Unidades ganadas: ${unidadesGanadas.toFixed(1)}\nUnidades faltantes: ${unidadesFaltantes.toFixed(1)}`
     );
   };

   return (
     <View style={{ flex: 1 }}>
       <ScrollView contentContainerStyle={styles.contentContainer}>
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
         <View style={{ marginBottom: 20 }} />
       </ScrollView>
     </View>
   );
 };

 export default ContratosEventuales;

 const styles = StyleSheet.create({
   contentContainer: {
     padding: 16,
     paddingBottom: 80,
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