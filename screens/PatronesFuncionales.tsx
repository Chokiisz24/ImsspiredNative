import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';

type PatronesFuncionalesProps = {
  navigation: NavigationProp<any>;
};

// --- PALETA DE COLORES (Consistente con EscalaUpp y Glasgow) ---
const COLORS = {
  primary: '#195365',       
  secondary: '#2a7a91',     
  background: '#f0f4f7',    
  white: '#ffffff',
  textPrimary: '#195365',
  textSecondary: '#5a7d87', 
  accent: '#e8f4f8',       
  border: '#d1e0e4',        
  shadow: '#000',
};

const patrones = [
  {
    nombre: 'Percepción y Manejo de la Salud',
    descripcion: `Qué valora:\n- Cómo percibe el individuo la salud y el bienestar.\n- Cómo maneja su salud y adherencia terapéutica.\n- Prácticas preventivas.\n\nCómo se valora:\nHábitos higiénicos, vacunas, alergias, percepción de salud, hábitos tóxicos e ingresos previos.`
  },
  {
    nombre: 'Nutricional-Metabólico',
    descripcion: `Qué valora:\n- Consumo de alimentos y líquidos.\n- Horarios, preferencias y suplementos.\n- Piel, mucosas y termorregulación.\n\nCómo se valora:\nIMC, tipo de alimentos, estado de la dentición, hidratación y alteraciones cutáneas.`
  },
  {
    nombre: 'Eliminación',
    descripcion: `Qué valora:\n- Funciones excretoras (intestinal, urinaria y piel).\n\nCómo se valora:\nConsistencia y regularidad de heces, características de la orina, sudoración y uso de dispositivos de ayuda.`
  },
  {
    nombre: 'Actividad / Ejercicio',
    descripcion: `Qué valora:\n- Patrón de ejercicio y actividad diaria.\n- Capacidad funcional y ocio.\n\nCómo se valora:\nEstado cardiovascular y respiratorio, movilidad articular, fuerza muscular y estilo de vida.`
  },
  {
    nombre: 'Sueño-Descanso',
    descripcion: `Qué valora:\n- Capacidad para dormir, descansar o relajarse.\n- Calidad percibida del sueño.\n\nCómo se valora:\nHoras de sueño, ayudas farmacológicas, entorno físico (ruido/luz) y presencia de apneas o ronquidos.`
  },
  {
    nombre: 'Cognitivo-Perceptivo',
    descripcion: `Qué valora:\n- Nivel de conciencia y sentidos.\n- Memoria, lenguaje y toma de decisiones.\n- Percepción del dolor.\n\nCómo se valora:\nOrientación, capacidad de lectura, alteraciones sensoriales y escala de dolor.`
  },
  {
    nombre: 'Autopercepción - Autoconcepto',
    descripcion: `Qué valora:\n- Actitudes hacia uno mismo.\n- Imagen corporal e identidad.\n- Patrón emocional.\n\nCómo se valora:\nProblemas de autoestima, cambios recientes en la imagen y contacto visual durante la entrevista.`
  },
  {
    nombre: 'Rol - Relaciones',
    descripcion: `Qué valora:\n- Compromisos de rol y relaciones sociales.\n- Satisfacción familiar y laboral.\n\nCómo se valora:\nEstructura familiar, apoyo social, entorno laboral y posibles conflictos o aislamiento.`
  },
  {
    nombre: 'Sexualidad y Reproducción',
    descripcion: `Qué valora:\n- Satisfacción o alteraciones en la sexualidad.\n- Patrón reproductivo.\n\nCómo se valora:\nCiclo menstrual, métodos anticonceptivos, embarazos y problemas en relaciones sexuales.`
  },
  {
    nombre: 'Adaptación - Tolerancia al Estrés',
    descripcion: `Qué valora:\n- Estrategias de afrontamiento.\n- Respuesta ante situaciones estresantes.\n\nCómo se valora:\nCambios importantes en los últimos años, red de apoyo cercana y uso de sustancias para el control del estrés.`
  },
  {
    nombre: 'Valores y Creencias',
    descripcion: `Qué valora:\n- Patrones que guían las decisiones del individuo.\n- Conflicto entre creencias y salud.\n\nCómo se valora:\nReligión, planes de futuro, y percepciones sobre la vida, la muerte y la enfermedad.`
  }
];

const PatronesFuncionales: React.FC<PatronesFuncionalesProps> = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionSubtitle}>Patrones de Marjory Gordon</Text>
        
        {patrones.map((patron, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate('DetallePatron', {
                descripcion: patron.descripcion,
                nombre: patron.nombre,
              })
            }
          >
            <View style={styles.cardContent}>
              {/* Círculo numerado */}
              <View style={styles.circleNumber}>
                <Text style={styles.circleText}>{index + 1}</Text>
              </View>
              
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{patron.nombre}</Text>
                <Text style={styles.cardSubTitle}>Toca para ver valoración</Text>
              </View>

              {/* Icono de flecha */}
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            Basado en el modelo de Valoración de Enfermería
          </Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default PatronesFuncionales;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 15,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    marginBottom: 15,
    letterSpacing: 1.2,
    paddingLeft: 5,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: { elevation: 2 },
    }),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circleNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  circleText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  cardSubTitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  arrow: {
    fontSize: 22,
    color: COLORS.border,
    fontWeight: '300',
    marginLeft: 5,
  },
  footerInfo: {
    marginTop: 10,
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});