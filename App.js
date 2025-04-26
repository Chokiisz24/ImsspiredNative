// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerdidasInsensibles from './screens/PerdidasInsensibles';
import PatronesFuncionales from './screens/PatronesFuncionales';
import ReglaDeTres from './screens/ReglaDeTres';
import ContratosEventuales from './screens/ContratosEventuales';
import DetallePatron from './screens/DetallePatron'; // Asegúrate de que esta importación esté aquí
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const primaryBackgroundColor = '#195365';
const primaryTextColor = '#fff';
const screenWidth = Dimensions.get('window').width;
const buttonSize = (screenWidth / 2) - 30;

// Componente para la pestaña de Información
function InfoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: primaryBackgroundColor },
        headerTitleStyle: { color: primaryTextColor },
        headerTintColor: primaryTextColor,
      }}
    >
      <Stack.Screen name="InfoInicio" component={InfoScreen} options={{ title: 'Información' }} />
      <Stack.Screen name="PatronesFuncionales" component={PatronesFuncionales} options={{ title: 'Patrones Funcionales' }} />
      {/* Aquí es donde debes incluir la pantalla DetallePatron */}
      <Stack.Screen name="DetallePatron" component={DetallePatron} options={{ title: 'Detalle del Patrón' }} />
    </Stack.Navigator>
  );
}

// Pantalla de inicio para la pestaña de Información
function InfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.largeSquareButton} onPress={() => navigation.navigate('PatronesFuncionales')}>
        <Text style={styles.largeSquareButtonText}>Patrones Funcionales</Text>
      </TouchableOpacity>
      {/* Aquí podrías agregar más botones de información en el futuro */}
    </View>
  );
}

// Componente para la pestaña de Cálculos
function CalculosStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: primaryBackgroundColor },
        headerTitleStyle: { color: primaryTextColor },
        headerTintColor: primaryTextColor,
      }}
    >
      <Stack.Screen name="CalculosInicio" component={CalculosScreen} options={{ title: 'Cálculos' }} />
      <Stack.Screen name="PerdidasInsensibles" component={PerdidasInsensibles} options={{ title: 'Pérdidas Insensibles' }} />
      <Stack.Screen name="ReglaDeTres" component={ReglaDeTres} options={{ title: 'Regla de Tres' }} />
    </Stack.Navigator>
  );
}

// Pantalla de inicio para la pestaña de Cálculos
function CalculosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.largeSquareButton} onPress={() => navigation.navigate('PerdidasInsensibles')}>
          <Text style={styles.largeSquareButtonText}>Pérdidas Insensibles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeSquareButton} onPress={() => navigation.navigate('ReglaDeTres')}>
          <Text style={styles.largeSquareButtonText}>Regla de 3 - Dosis</Text>
        </TouchableOpacity>
      </View>
      {/* Aquí puedes agregar más botones de cálculos en el futuro */}
    </View>
  );
}

// Componente para la pestaña de Herramientas
function HerramientasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: primaryBackgroundColor },
        headerTitleStyle: { color: primaryTextColor },
        headerTintColor: primaryTextColor,
      }}
    >
      <Stack.Screen name="HerramientasInicio" component={HerramientasScreen} options={{ title: 'Herramientas' }} />
      <Stack.Screen name="ContratosEventuales" component={ContratosEventuales} options={{ title: 'Contratos Eventuales' }} />
    </Stack.Navigator>
  );
}

// Pantalla de inicio para la pestaña de Herramientas
function HerramientasScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.largeSquareButton} onPress={() => navigation.navigate('ContratosEventuales')}>
          <Text style={styles.largeSquareButtonText}>Contratos Eventuales</Text>
        </TouchableOpacity>
        {/* Aquí puedes agregar más botones de herramientas en el futuro */}
      </View>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Información') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'Cálculos') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'Herramientas') {
              iconName = focused ? 'hammer' : 'hammer-outline';
            }

            return <Text style={{ color: color, fontSize: size * 0.6 }}>{iconName ? '' : route.name.slice(0, 3).toUpperCase()}</Text>;
          },
          headerShown: false,
          tabBarActiveTintColor: '#64CCC5',
          tabBarInactiveTintColor: 'lightgray',
          tabBarStyle: { backgroundColor: primaryBackgroundColor },
          tabBarLabelStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen name="Información" component={InfoStack} options={{ title: 'Información' }} />
        <Tab.Screen name="Cálculos" component={CalculosStack} options={{ title: 'Cálculos' }} />
        <Tab.Screen name="Herramientas" component={HerramientasStack} options={{ title: 'Herramientas' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: primaryBackgroundColor,
    padding: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: primaryTextColor,
    textAlign: 'center',
  },
  largeSquareButton: {
    backgroundColor: '#2E8B57',
    width: buttonSize,
    height: buttonSize,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  largeSquareButtonText: {
    color: primaryTextColor,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingHorizontal: 10,
  },
});

export default App;