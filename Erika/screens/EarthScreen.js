import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';

const EarthScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [earthInfo, setEarthInfo] = useState(null);



  useEffect(() => {
    const fetchEarthInfo = async () => {
      try {
        const response = await fetch('https://66173115ed6b8fa43482235e.mockapi.io/system');
        const data = await response.json();
        const earthData = data.find((planet) => planet.nombre === 'Tierra');
        setEarthInfo(earthData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Earth info:', error);
        setIsLoading(false);
      }
    };

    fetchEarthInfo();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : earthInfo ? (
        <View style={styles.item}>
          <Image source={{ uri: earthInfo.imagen }} style={styles.image} />
          <Text>Nombre: {earthInfo.nombre}</Text>
          <Text>Tipo: {earthInfo.tipo}</Text>
          <Text>Masa: {earthInfo.masa}</Text>
          <Text>Radio: {earthInfo.radio}</Text>
          <Text>Distancia al Sol: {earthInfo.distanciaSol}</Text>
          <Text>Órbita: {earthInfo.orbita}</Text>
          <Text>Rotación: {earthInfo.rotacion}</Text>
          <Text>Lunas: {earthInfo.lunas}</Text>
          <Text>Descripción: {earthInfo.Description}</Text>
          
        </View>
      ) : (
        <Text>No se encontró información de la Tierra</Text>
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

export default EarthScreen;