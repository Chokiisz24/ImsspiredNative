import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';

type EscalaUppProps = {
  navigation: NavigationProp<any>;
};

// --- PALETA DE COLORES (Consistente con tu App.js) ---
const COLORS = {
  primary: '#195365',       
  secondary: '#2a7a91',     
  background: '#f0f4f7',    // Fondo gris muy claro para que resalten las cards
  white: '#ffffff',
  textPrimary: '#195365',
  textSecondary: '#5a7d87', 
  accent: '#e8f4f8',       
  border: '#d1e0e4',        
  shadow: '#000',
};

const itemsBraden = [
  { nombre: 'Percepción Sensorial', descripcion: '1. Completamente limitada\n2. Muy limitada\n3. Levemente limitada\n4. Sin alteraciones' },
  { nombre: 'Exposición a la Humedad', descripcion: '1. C. húmeda\n2. Muy húmeda\n3. Ocasionalmente\n4. Raramente' },
  { nombre: 'Actividad Física', descripcion: '1. En cama\n2. En silla\n3. Deambula ocasionalmente\n4. Deambula frecuentemente' },
  { nombre: 'Movilidad', descripcion: '1. Inmóvil\n2. Muy limitada\n3. Ligeramente limitada\n4. Sin limitaciones' },
  { nombre: 'Nutrición', descripcion: '1. Muy pobre\n2. Probablemente inadecuada\n3. Adecuada\n4. Excelente' },
  { nombre: 'Roce y Peligro de Lesiones', descripcion: '1. Problema\n2. Problema potencial\n3. Sin problema' },
  { nombre: 'Puntaje Total Braden', descripcion: '6 - 23 puntos.\n\n≤ 9: Riesgo Muy Alto\n10-12: Riesgo Alto\n13-14: Riesgo Medio\n15-18: Riesgo Bajo' }
];

const itemsNorton = [
  { nombre: 'Estado Físico', descripcion: '1. Muy malo\n2. Pobre\n3. Regular\n4. Bueno' },
  { nombre: 'Estado Mental', descripcion: '1. Estuporoso/Comatoso\n2. Confuso\n3. Apático\n4. Alerta' },
  { nombre: 'Actividad', descripcion: '1. Encamado\n2. Sentado\n3. Camina con ayuda\n4. Caminando' },
  { nombre: 'Movilidad', descripcion: '1. Inmóvil\n2. Muy limitada\n3. Ligeramente limitada\n4. Total' },
  { nombre: 'Incontinencia', descripcion: '1. Urinaria y fecal\n2. Fecal\n3. Urinaria\n4. Ninguna' },
  { nombre: 'Puntaje Total Norton', descripcion: '5 - 20 puntos.\n\n5-11: Riesgo Muy Alto\n12-14: Riesgo Medio\n>14: Riesgo Mínimo' }
];

const EscalaUpp: React.FC<EscalaUppProps> = ({ navigation }) => {
  const [escalaSeleccionada, setEscalaSeleccionada] = useState<'braden' | 'norton'>('braden');

  const isBraden = escalaSeleccionada === 'braden';
  const dataActual = isBraden ? itemsBraden : itemsNorton;

  return (
    <View style={styles.mainContainer}>
      {/* Selector de Escalas (Sin margen superior excesivo) */}
      <View style={styles.selectorWrapper}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, isBraden && styles.activeTab]} 
            onPress={() => setEscalaSeleccionada('braden')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, isBraden && styles.activeTabText]}>Braden</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, !isBraden && styles.activeTab]} 
            onPress={() => setEscalaSeleccionada('norton')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, !isBraden && styles.activeTabText]}>Norton</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionSubtitle}>
          {isBraden ? 'Parámetros de Braden' : 'Parámetros de Norton'}
        </Text>
        
        {dataActual.map((item, index) => {
          const isTotal = index === (dataActual.length - 1);

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
                <View style={[styles.circleIcon, isTotal && styles.circleIconTotal]}>
                  <Text style={[styles.circleText, isTotal && styles.circleTextTotal]}>
                    {isTotal ? 'Σ' : index + 1}
                  </Text>
                </View>
                
                <View style={styles.textContainer}>
                  <Text style={[styles.cardTitle, isTotal && styles.cardTitleTotal]}>
                    {item.nombre}
                  </Text>
                  <Text style={[styles.cardSubTitle, isTotal && styles.cardSubTitleTotal]}>
                    {isTotal ? 'Ver interpretación de riesgos' : 'Toca para valorar'}
                  </Text>
                </View>

                <Text style={[styles.arrow, isTotal && styles.arrowTotal]}>›</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        
        <View style={styles.footerBox}>
          <Text style={styles.footerText}>
            {isBraden 
              ? "Puntaje ≤ 12: Riesgo Alto" 
              : "Puntaje ≤ 14: Riesgo Presente"}
          </Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default EscalaUpp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  selectorWrapper: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.white,
    fontWeight: '700',
  },
  scrollContainer: {
    padding: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.secondary,
    textTransform: 'uppercase',
    marginBottom: 15,
    letterSpacing: 1,
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
    marginTop: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circleIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  circleIconTotal: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  circleText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  circleTextTotal: {
    color: COLORS.white,
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  cardTitleTotal: {
    color: COLORS.white,
  },
  cardSubTitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  cardSubTitleTotal: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  arrow: {
    fontSize: 22,
    color: COLORS.border,
    fontWeight: '300',
  },
  arrowTotal: {
    color: COLORS.white,
  },
  footerBox: {
    marginTop: 10,
    padding: 15,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});