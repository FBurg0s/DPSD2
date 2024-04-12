import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';

const SunScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sunInfo, setSunInfo] = useState(null);

  useEffect(() => {
    const fetchSunInfo = async () => {
      try {
        const response = await fetch('https://6618b12b9a41b1b3dfbdb6cf.mockapi.io/sol');
        const data = await response.json();
        const sunData = data.find((planet) => planet.nombre === 'El Sol');
        setSunInfo(sunData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Sun info:', error);
        setIsLoading(false);
      }
    };

    fetchSunInfo();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : sunInfo ? (
        <View style={styles.item}>
          <Image source={{ uri: sunInfo.imagen }} style={styles.image} />
          <Text>Nombre: {sunInfo.nombre}</Text>
          <Text>Tipo: {sunInfo.tipo}</Text>
          <Text>Masa: {sunInfo.masa}</Text>
          <Text>Radio: {sunInfo.radio}</Text>
          <Text>Distancia: {sunInfo.distancia}</Text>
          <Text>Órbita: {sunInfo.orbita}</Text>
          <Text>Rotación: {sunInfo.rotacion}</Text>
          <Text>Descripción: {sunInfo.descripcion}</Text>
        </View>
      ) : (
        <Text>No se encontró información del Sol</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default SunScreen;