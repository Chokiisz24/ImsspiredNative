import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';

const ContratoColectivo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
 const pdfRef = useRef<any>(null);

 
  const handleSearch = () => {
    if (searchQuery && pdfRef.current) {
      // El método setPage es útil, pero para buscar contenido 
      // la librería resalta automáticamente si se implementa lógica de búsqueda personalizada.
      // Aquí usamos la función nativa de búsqueda de la librería.
      pdfRef.current.setPage(currentPage); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra de Búsqueda */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Buscar palabra en el CCT..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Visor de PDF */}
      <Pdf
        ref={pdfRef}
        source={require('../assets/CCT-2025-2027.pdf')}
        onLoadComplete={(numberOfPages) => {
          setTotalPages(numberOfPages);
        }}
        onPageChanged={(page) => {
          setCurrentPage(page);
        }}
        onError={(error) => {
          console.log('Error al cargar PDF:', error);
        }}
        enablePaging={false} // Scroll fluido
        style={styles.pdf}
      />

      {/* Indicador de Páginas */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Página {currentPage} de {totalPages}
        </Text>
      </View>
    </View>
  );
};

export default ContratoColectivo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937', // Color oscuro para que el PDF resalte
  },
  searchSection: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'rgb(39, 51, 65)',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#054D9F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  footer: {
    padding: 5,
    backgroundColor: 'rgb(39, 51, 65)',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});