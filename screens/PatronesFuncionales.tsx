import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
type PatronesFuncionalesProps = {
    navigation: NavigationProp<any>;
  };
  
const patrones = [
  {
    nombre: 'Percepción y Manejo de la Salud',
    descripcion: `
Qué valora: 
- Cómo percibe el individuo la salud y el bienestar.
- Cómo maneja todo lo relacionado con su salud, respecto a su mantenimiento o recuperación.
- La adherencia a las prácteicas terapéuticas.
- Incluye prácticas preventivas (hábitos higiénicos, vacunaciones…).
      
Cómo se valora: 
- Hábitos higiénicos: personales, vivienda, vestido.
- Vacunas.
- Alergias.
- Percepción de su salud.
- Conductas saludables: interés y conocimiento.
- Existencia o no de alteraciones de salud (tipo de alteración, cuidados, conocimiento y disposición).
- Existencia o no de hábitos tóxicos.
- Accidentes laborales, tráfico y domésticos.
- Ingresos hospitalarios.
    `
  },
  {
    nombre: 'Nutricional-metabólico',
    descripcion: `
Qué valora:
- Describe el consumo de alimentos y líquidos en relación con sus necesidades metabólicas.
- Horarios de comida, preferencias y suplementos.
- Problemas en su ingesta.
- Altura, peso y temperatura.
- Condiciones de piel, mucosas y membranas.

Cómo se valora: 
- Valoración del IMC.
- Recoge el número de comidas, el lugar, el horario, dietas específicas… así como los líquidos recomendados para tomar en el día.
- Se deben hacer preguntas sobre el tipo de alimentos que toma por grupos: frutas, verduras, carnes, pescados, legumbres y lácteos.
- Alteraciones bucales (caries, úlceras, etc.).
- Dificultades para masticar, tragar.
- Problemas digestivos (náuseas, vómitos, pirosis).
- Suplementos alimenticios y vitaminas.
- Alteraciones de la piel (fragilidad de uñas, falta de hidratación, prurito, edemas, etc.).
    `
  },
  {
    nombre: 'Eliminación',
    descripcion: `
Qué valora:
- Describe las funciones excretoras intestinal, urinaria y de la piel.

Cómo se valora:
- Intestinal: Consistencia, regularidad, dolor al defecar, sangre en heces, uso de laxantes, presencia de ostomías, incontinencia.
- Urinaria: Micciones/día, características de la orina, problemas de micción, sistemas de ayuda (absorbentes, colectores, sondas, urostomías), incontinencias.
- Cutánea: Sudoración copiosa.
    `
  },
  {
    nombre: 'Actividad / Ejercicio',
    descripcion: `
Qué valora:
- El patrón de ejercicio.
- La actividad.
- Tiempo libre y recreo.
- Los requerimientos de consumo de energía de las actividades de la vida diaria (higiene, compra, comer, mantenimiento del hogar, etc.).
- La capacidad funcional.
- El tipo, cantidad y calidad del ejercicio.
- Las actividades de tiempo libre.

Cómo se valora:
- Valoración del estado cardiovascular: Frecuencia cardiaca o PA anormales en respuesta a la actividad, cambios ECG que reflejen isquemia o arritmia.
- Valoración del estado respiratorio: Antecedentes de enfermedades respiratorias, ambiente laboral, disnea, molestias de esfuerzo, tos nocturna, etc.
- Tolerancia a la actividad: Fundamentalmente en pacientes cardiacos y respiratorios.
- Valoración de la movilidad: Debilidad generalizada, cansancio, grado de movilidad en articulaciones, fuerza, tono muscular.
- Actividades cotidianas: Actividades que realiza, encamamiento, mantenimiento del hogar, capacidad funcional.
- Estilo de vida: Sedentario, activo.
- Ocio y actividades recreativas: Tipo de actividades y tiempo que se le dedica.
    `
  },
  {
    nombre: 'Sueño-Descanso',
    descripcion: `
Qué valora:
- Describe la capacidad de la persona para conseguir dormir, descansar o relajarse a lo largo de las 24 horas del día.
- La percepción de cantidad y calidad del sueño – descanso.
- La percepción del nivel de energía.
- Las ayudas para dormir (medicamentos, rutinas, etc.).

Cómo se valora:
- El espacio físico (ventilación, temperatura agradable y libre de ruidos).
- El tiempo dedicado al sueño u otros descansos diurnos.
- Recursos físicos o materiales favorecedores del descanso (mobiliario).
- Exigencias laborales (turnos, viajes).
- Hábitos socio-culturales (hora de acostarse o levantarse, siestas, descansos).
- Problemas de salud física que provoquen dolor o malestar.
- Problemas de salud psicológica que afecten al estado de ánimo (ansiedad, depresión).
- Tratamientos farmacológicos que puedan influir en el sueño (broncodilatadores, esteroides, betabloqueantes).
- Consumo de sustancias estimulantes (cafeína, nicotina, alcohol).
- Presencia de ronquidos o apneas del sueño.
    `
  },
  {
    nombre: 'Cognitivo-Perceptivo',
    descripcion: `
Qué valora:
- Patrones sensorio-perceptuales y cognitivos.
- Nivel de conciencia.
- Conciencia de la realidad.
- Adecuación de los órganos de los sentidos.
- Compensación o prótesis.
- Percepción del dolor y tratamiento.
- Lenguaje.
- Ayudas para la comunicación.
- Memoria.
- Juicio, comprensión de ideas.
- Toma de decisiones.

Cómo se valora:
- Nivel de consciencia y orientación.
- Nivel de instrucción (si puede leer y escribir).
- Alteraciones cognitivas (problemas para expresar ideas, memoria, decisiones, lenguaje, concentración).
- Alteraciones perceptivas (visión, audición, olfato, gusto, sensibilidad táctil).
- Información sobre el dolor: tipo, localización, intensidad y control.
- Alteraciones de la conducta: irritabilidad, intranquilidad o agitación.
    `
  },
  {
    nombre: 'Autopercepción - Autoconcepto',
    descripcion: `
Qué valora:
- Autoconcepto y percepciones de uno mismo.
- Actitudes acerca de uno mismo.
- Percepción de las capacidades cognitivas, afectivas o físicas.
- Imagen corporal, social, identidad.
- Sentido general de valía.
- Patrón emocional.
- Patrón de postura corporal y movimiento.
- Contacto visual, patrones de voz y conversación.

Cómo se valora:
- Problemas consigo mismo.
- Imagen corporal.
- Cambios recientes.
- Postura, patrón de voz, rasgos personales, contacto visual.
- Si se siente querido, cambios frecuentes de estado de ánimo, asertividad/pasividad, nerviosismo/relajación.
    `
  },
  {
    nombre: 'Rol - Relaciones',
    descripcion: `
Qué valora:
- El patrón de compromisos de rol y relaciones.
- La percepción de los roles más importantes.
- Responsabilidades en su situación actual.
- Satisfacción o alteraciones en familia, trabajo, relaciones sociales.

Cómo se valora:
- Familia: Con quién vive, estructura familiar, rol en la familia.
- Grupo social: Si tiene amigos cercanos, si pertenece a algún grupo social.
- Trabajo o escuela: Satisfacción laboral o escolar, entorno seguro.
- Pérdidas, cambios, fracasos, conflictos, aislamiento social, violencia.
    `
  },
  {
    nombre: 'Sexualidad y Reproducción',
    descripcion: `
Qué valora:
- Los patrones de satisfacción o insatisfacción de la sexualidad.
- Alteraciones en la sexualidad o en las relaciones sexuales.
- Seguridad en las relaciones sexuales.
- Patrón reproductivo (menstruación, menopausia, anticonceptivos, embarazos, abortos).

Cómo se valora:
- Menarquía y todo lo relacionado con ciclo menstrual.
- Menopausia y síntomas relacionados.
- Métodos anticonceptivos.
- Embarazos, abortos, problemas reproductivos.
- Problemas en relaciones sexuales.
    `
  },
  {
    nombre: 'Adaptación - Tolerancia al estrés',
    descripcion: `
Qué valora:
- Las formas o estrategias de afrontamiento general del individuo.
- Las respuestas habituales ante situaciones estresantes y control del estrés.
- La capacidad de adaptación a los cambios.
- El soporte individual y familiar.

Cómo se valora:
- Descripción de situaciones estresantes y evaluación de la adaptación.
- Cambios importantes en los últimos dos años.
- Uso de medicamentos, drogas o alcohol ante situaciones estresantes.
- Existencia de alguien cercano a quien contar los problemas.
    `
  },
  {
    nombre: 'Valores y Creencias',
    descripcion: `
Qué valora:
- Los patrones de valores y creencias que guían las elecciones o decisiones.
- Lo que se considera correcto, apropiado, bien y mal, bueno y malo.
- Percepciones de conflicto en valores, creencias o expectativas en relación con la salud.
- Decisiones sobre tratamientos, prioridades de salud, vida o muerte.

Cómo se valora:
- Si tiene planes de futuro importantes, si está satisfecho con su vida.
- Pertenencia a alguna religión, si le causa algún problema o le ayuda.
- Preocupaciones relacionadas con la vida, la muerte, el dolor o enfermedad.
    `
  }
];

const PatronesFuncionales: React.FC<PatronesFuncionalesProps> = ({ navigation }) => {
    const mostrarDescripcion = (descripcion: string) => {
      navigation.navigate('DetallePatron', { descripcion });
    };
  
    return (
        
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>11 Patrones Funcionales</Text>
        {patrones.map((patron, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => 
                navigation.navigate('DetallePatron', { 
                  descripcion: patron.descripcion,
                  nombre: patron.nombre, // Asegúrate de que el objeto `patron` tiene la propiedad `nombre`
                })
              }
                        >
            <Text style={styles.cardText}>{`${index + 1}. ${patron.nombre}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  

export default PatronesFuncionales;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#195365',
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgb(5, 77, 159)',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
