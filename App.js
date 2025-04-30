// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import PerdidasInsensibles from './screens/PerdidasInsensibles';
import PatronesFuncionales from './screens/PatronesFuncionales';
import ReglaDeTres from './screens/ReglaDeTres';
import PresionArterialMedia from './screens/PresionArterialMedia';
import ContratosEventuales from './screens/ContratosEventuales';
import DetallePatron from './screens/DetallePatron';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const primaryBackgroundColor = 'rgb(39, 51, 65)';
const buttonActiveColor = 'rgb(5, 77, 159)';
const buttonDisabledColor = '#5C6F88';
const primaryTextColor = '#FFFFFF';
const secondaryTextColor = '#D1D5DB';
const tabActiveTintColor = '#FFFFFF';
const tabInactiveTintColor = '#9CA3AF';

const screenWidth = Dimensions.get('window').width;
const buttonSize = (screenWidth / 2) - 30;

const MenuButton = ({ onPress, title, icon }) => (
  <TouchableOpacity style={styles.menuButton} onPress={onPress}>
    <Image source={icon} style={styles.menuIcon} />
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);



function InfoStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="InfoInicio" component={InfoScreen} options={{ title: 'Información' }} />
      <Stack.Screen name="PatronesFuncionales" component={PatronesFuncionales} />
      <Stack.Screen name="DetallePatron" component={DetallePatron} />
    </Stack.Navigator>
  );
}

function InfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MenuButton
        title="Patrones Funcionales"
        icon={require('./assets/icono_patrones.png')}
        onPress={() => navigation.navigate('PatronesFuncionales')}
      />
    </View>
  );
}

function CalculosStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="CalculosInicio" component={CalculosScreen} options={{ title: 'Cálculos' }} />
      <Stack.Screen name="PerdidasInsensibles" component={PerdidasInsensibles} />
      <Stack.Screen name="ReglaDeTres" component={ReglaDeTres} />
      <Stack.Screen name="PresionArterialMedia" component={PresionArterialMedia} />
    </Stack.Navigator>
  );
}

function CalculosScreen({ navigation }) {
  return (
<View style={styles.container}>
  <MenuButton
    title="Pérdidas Insensibles"
    icon={require('./assets/icono_perdidas.png')}
    onPress={() => navigation.navigate('PerdidasInsensibles')}
  />
  <MenuButton
    title="Regla de 3 - Dosis"
    icon={require('./assets/icono_regla.png')}
    onPress={() => navigation.navigate('ReglaDeTres')}
  />
  <MenuButton
    title="Presión Arterial Media"
    icon={require('./assets/icono_pam.png')}
    onPress={() => navigation.navigate('PresionArterialMedia')}
  />
</View>

  );
}

function HerramientasStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="HerramientasInicio" component={HerramientasScreen} options={{ title: 'Herramientas' }} />
      <Stack.Screen name="ContratosEventuales" component={ContratosEventuales} />
    </Stack.Navigator>
  );
}

function HerramientasScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
      <MenuButton
  title="Contratos Eventuales"
  icon={require('./assets/icono_contratos.png')}
  onPress={() => navigation.navigate('ContratosEventuales')}
/>
<TouchableOpacity style={[styles.menuButton, { backgroundColor: buttonDisabledColor }]} disabled>
  <Image source={require('./assets/icono_contratos.png')} style={styles.menuIcon} />
  <Text style={styles.menuText}>Calendario</Text>
</TouchableOpacity>
      </View>
    </View>
  );
}

const stackScreenOptions = {
  headerStyle: { backgroundColor: primaryBackgroundColor },
  headerTitleStyle: { color: primaryTextColor },
  headerTintColor: primaryTextColor,
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size * 0.6 }}>{route.name.slice(0, 3).toUpperCase()}</Text>
          ),
          headerShown: false,
          tabBarActiveTintColor: tabActiveTintColor,
          tabBarInactiveTintColor: tabInactiveTintColor,
          tabBarStyle: { backgroundColor: primaryBackgroundColor },
          tabBarLabelStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen name="Información" component={InfoStack} />
        <Tab.Screen name="Cálculos" component={CalculosStack} />
        <Tab.Screen name="Herramientas" component={HerramientasStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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

  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: buttonActiveColor,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  menuIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 16,
  },
  menuText: {
    color: primaryTextColor,
    fontSize: 18,
    fontWeight: '700',
  },
  
});
