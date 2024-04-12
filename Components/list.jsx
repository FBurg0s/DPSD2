import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function List() {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const userData = await AsyncStorage.getItem('listaRegistro');

        if (userData !== null) {
          const datosParseados = JSON.parse(userData);
          setPersonas(datosParseados);
          console.log('Datos de AsyncStorage:', datosParseados);
        } else {
          setPersonas([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  const calcularDiasHastaRecordatorio = (fechaRecordatorio) => {
    const hoy = new Date();
    const fecha = new Date(fechaRecordatorio);
    fecha.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparación
  
    // Calcular la diferencia en milisegundos entre las dos fechas
    const diferencia = fecha.getTime() - hoy.getTime();
  
    if (diferencia < 0) {
      // Si la fecha de recordatorio ya pasó, calcular los días transcurridos
      const diasTranscurridos = Math.ceil(-diferencia / (1000 * 60 * 60 * 24));
      return -diasTranscurridos; // Retornar días transcurridos como negativo
    } else {
      // Si la fecha de recordatorio es en el futuro, calcular los días restantes
      const diasFaltantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
      return diasFaltantes; // Retornar días faltantes
    }
  };

  const obtenerColorFondo = (diasFaltantes) => {
    if (diasFaltantes <= 0) {
      return 'red';
    } else if (diasFaltantes <= 100) {
      return 'green';
    } else {
      return 'blue';
    }
  };

  const eliminarContacto = async (index) => {
    try {
      Alert.alert(
        'Confirmación',
        '¿Estás seguro de que quieres eliminar este recordatorio?',
        [
          {
            text: 'Cancelar',
            onPress: () => console.log('Eliminación cancelada por el usuario'),
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              const nuevaLista = personas.filter((_, i) => i !== index);
              await AsyncStorage.setItem('listaRegistro', JSON.stringify(nuevaLista));
              setPersonas(nuevaLista);
              console.log('Recordatorio eliminado correctamente');
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error al eliminar el recordatorio:', error);
    }
  };

  return (
    <View style={styles.container}>
      {personas.length === 0 ? (
        <Text style={styles.message}>No hay ningún recordatorio guardado aún :) </Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {personas.map((persona, index) => (
            <View key={index} style={styles.box}>
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  { backgroundColor: obtenerColorFondo(calcularDiasHastaRecordatorio(persona.fecha)) },
                ]}
                key={index}
                onLongPress={() => eliminarContacto(index)}>
                <Text style={styles.text}>{persona.recordatorio}</Text>
                <Text style={styles.text}>
                 faltan {calcularDiasHastaRecordatorio(persona.fecha)} días para el recordatorio
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  box: {
    width: '70%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
    color: 'lightcoral',
  },
});
