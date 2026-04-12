import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';

type EscalaGlasgowProps = {
  navigation: NavigationProp<any>;
};

// --- PALETA DE COLORES (Consistente con EscalaUpp y App.js) ---
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

const categoriasGlasgow = [
  {
    nombre: 'Apertura Ocular (E)',
    descripcion: `Puntuación:\n4 - Espontánea\n3 - Al orden verbal\n2 - Al dolor\n1 - Ninguna\n\nCómo se valora:\nObserve si el paciente tiene los ojos abiertos al acercarse. Si están cerrados, háblele. Si no responde, aplique estímulo doloroso.`
  },
  {
    nombre: 'Respuesta Verbal (V)',
    descripcion: `Puntuación:\n5 - Orientado\n4 - Confuso\n3 - Palabras inapropiadas\n2 - Sonidos incomprensibles\n1 - Ninguna\n\nCómo se valora:\nPregunte: "¿Sabe dónde está?", "¿Qué día es hoy?". Evalúe coherencia y sentido.`
  },
  {
    nombre: 'Respuesta Motora (M)',
    descripcion: `Puntuación:\n6 - Obedece órdenes\n5 - Localiza el dolor\n4 - Flexión normal (Retirada)\n3 - Flexión anormal (Decorticación)\n2 - Extensión (Descerebración)\n1 - Ninguna\n\nCómo se valora:\nPida que realice una acción. Si no responde, use estímulo doloroso y observe el movimiento.`
  },
  {
    nombre: 'Interpretación del Puntaje',
    descripcion: `Cálculo: E + V + M = Total (3 a 15)\n\nNiveles de Gravedad:\n- TCE Leve: 13 - 15 puntos\n- TCE Moderado: 9 - 12 puntos\n- TCE Grave: 3 - 8 puntos (Requiere intubación)`
  }
];

const EscalaGlasgow: React.FC<EscalaGlasgowProps> = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionSubtitle}>Parámetros de Evaluación</Text>
        
        {categoriasGlasgow.map((item, index) => {
          const isTotal = index === 3;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.card, isTotal && styles.cardTotal]}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('DetallePatron', {
                  descripcion: item.descripcion,
                  nombre: item.nombre,
                })
              }
            >
              <View style={styles.cardContent}>
                {/* Círculo con Letra o Número */}
                <View style={[styles.circleIcon, isTotal && styles.circleIconTotal]}>
                  <Text style={[styles.circleText, isTotal && styles.circleTextTotal]}>
                    {index === 0 ? 'E' : index === 1 ? 'V' : index === 2 ? 'M' : 'Σ'}
                  </Text>
                </View>
                
                <View style={styles.textContainer}>
                  <Text style={[styles.cardTitle, isTotal && styles.cardTitleTotal]}>
                    {item.nombre}
                  </Text>
                  <Text style={[styles.cardSubTitle, isTotal && styles.cardSubTitleTotal]}>
                    {isTotal ? 'Ver niveles de gravedad' : 'Toca para valorar parámetro'}
                  </Text>
                </View>

                {/* Flecha indicadora */}
                <Text style={[styles.arrow, isTotal && styles.arrowTotal]}>›</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        
        {/* Cuadro informativo inferior */}
        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            Puntaje Máximo: 15  |  Puntaje Mínimo: 3
          </Text>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default EscalaGlasgow;

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
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    marginBottom: 15,
    letterSpacing: 1,
    paddingLeft: 5,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
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
  cardTotal: {
    backgroundColor: COLORS.secondary,
    marginTop: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  circleIconTotal: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'transparent',
  },
  circleText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18,
  },
  circleTextTotal: {
    color: COLORS.white,
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  cardTitleTotal: {
    color: COLORS.white,
  },
  cardSubTitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  cardSubTitleTotal: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  arrow: {
    fontSize: 24,
    color: COLORS.border,
    fontWeight: '300',
    marginLeft: 5,
  },
  arrowTotal: {
    color: COLORS.white,
  },
  footerBox: {
    marginTop: 15,
    padding: 18,
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
});