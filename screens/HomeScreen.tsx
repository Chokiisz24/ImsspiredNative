// // screens/HomeScreen.tsx
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types';

// type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// const HomeScreen = ({ navigation }: Props) => {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>Herramientas</Text>
//         <Text style={styles.subtitle}>Selecciona una herramienta:</Text>

//         <View style={styles.group}>
//           <Text style={styles.groupTitle}>Patrones Funcionales</Text>
//           <TouchableOpacity
//             style={[styles.button, styles.patronesButton]}
//             onPress={() => navigation.navigate('PatronesFuncionales')}
//           >
//             <Text style={styles.buttonText}>Patrones Funcionales de Gordon</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Puedes agregar más herramientas aquí */}

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f0f0f0', // Un fondo claro para la pestaña de herramientas
//   },
//   container: {
//     padding: 20,
//     flexGrow: 1,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 30,
//     color: '#333',
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#777',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   group: {
//     width: '90%',
//     marginBottom: 25,
//   },
//   groupTitle: {
//     color: '#555',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'left',
//   },
//   button: {
//     paddingVertical: 14,
//     paddingHorizontal: 28,
//     borderRadius: 8,
//     marginBottom: 15,
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   patronesButton: {
//     backgroundColor: '#3498DB',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//     textTransform: 'uppercase',
//   },
// });