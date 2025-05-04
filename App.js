import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

import CalculoGoteo from './screens/CalculoGoteo';
import Calendario from './screens/Calendario';
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
const tabActiveTintColor = '#FFFFFF';
const tabInactiveTintColor = '#9CA3AF';

const screenWidth = Dimensions.get('window').width;
const buttonSize = (screenWidth / 2) - 30;

const MenuButton = ({
  onPress,
  title,
  icon,
  backgroundColor = buttonActiveColor,
  customIconWrapper = false,
  disabled = false,
}) => (
  <TouchableOpacity
    style={[
      styles.menuButton,
      { backgroundColor, opacity: disabled ? 0.6 : 1 },
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <View style={customIconWrapper ? styles.iconWrapper : null}>
      <Image source={icon} style={styles.menuIcon} />
    </View>
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
        backgroundColor="#3B5B92"
        customIconWrapper={true}
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
      <Stack.Screen name="CalculoGoteo" component={CalculoGoteo} />
    </Stack.Navigator>
  );
}

function CalculosScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MenuButton
        title="Pérdidas Insensibles"
        icon={require('./assets/icono_perdidas.png')}
        backgroundColor="#5C415D"
        customIconWrapper={true}
        onPress={() => navigation.navigate('PerdidasInsensibles')}
      />
      <MenuButton
        title="Regla de 3 - Dosis"
        icon={require('./assets/icono_regla.png')}
        backgroundColor="#4E6E81"
        customIconWrapper={true}
        onPress={() => navigation.navigate('ReglaDeTres')}
      />
      <MenuButton
        title="Presión Arterial Media (PAM)"
        icon={require('./assets/icono_pam.png')}
        backgroundColor="#356E55"
        customIconWrapper={true}
        onPress={() => navigation.navigate('PresionArterialMedia')}
      />
      <MenuButton
        title="Cálculo de Goteo"
        icon={require('./assets/icono-calculogoteo.png')}
        backgroundColor="rgb(56, 158, 195)"
        customIconWrapper={true}
        onPress={() => navigation.navigate('CalculoGoteo')}
      />
    </View>
  );
}

function HerramientasStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="HerramientasInicio" component={HerramientasScreen} options={{ title: 'Herramientas' }} />
      <Stack.Screen name="ContratosEventuales" component={ContratosEventuales} />
      <Stack.Screen name="Calendario" component={Calendario} />
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
          backgroundColor="rgb(67, 169, 110)"
          customIconWrapper={true}
          onPress={() => navigation.navigate('ContratosEventuales')}
        />
        <MenuButton
          title="Calendario"
          icon={require('./assets/icono_calendario.png')}
          backgroundColor="rgb(216, 150, 74)"
          customIconWrapper={true}
          onPress={() => navigation.navigate('Calendario')}
        />
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
          tabBarIcon: ({ color, size }) => {
            let iconSource;

            if (route.name === 'Información') {
              iconSource = require('./assets/icono_info.png');
            } else if (route.name === 'Cálculos') {
              iconSource = require('./assets/icono_calculos.png');
            } else if (route.name === 'Herramientas') {
              iconSource = require('./assets/icono_herramientas.png');
            }

            return (
              <Image
                source={iconSource}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          },
          headerShown: false,
          tabBarActiveTintColor: tabActiveTintColor,
          tabBarInactiveTintColor: tabInactiveTintColor,
          tabBarStyle: { backgroundColor: primaryBackgroundColor },
          tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabBarShowLabel: true,
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
  menuText: {
    color: primaryTextColor,
    fontSize: 18,
    fontWeight: '700',
  },
  iconWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    padding: 10,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
