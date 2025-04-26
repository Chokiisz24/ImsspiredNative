// src/types.ts (o en cualquier carpeta donde prefieras guardarlo)

export type RootStackParamList = {
    Home: undefined; // No recibe parámetros en la pantalla principal
    PerdidasInsensibles: undefined; // No recibe parámetros en la pantalla de Balance de líquidos
    Calendario: undefined; // No recibe parámetros en la pantalla de Calendario
    ContratosEventuales: undefined; // No recibe parámetros en la pantalla de Contratos
    PatronesFuncionales: undefined;
    ReglaDeTres: undefined;
    DetallePatron: { patron: { nombre: string; descripcion: string } }; // Definimos que 'patron' tendrá estas propiedades  };
  };
  