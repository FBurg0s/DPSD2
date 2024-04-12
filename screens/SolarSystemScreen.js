import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, Image, StyleSheet } from 'react-native';

const SolarSystemScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [solarSystemInfo, setSolarSystemInfo] = useState([]);

  useEffect(() => {
    const fetchSolarSystemInfo = async () => {
      try {
        const response = await fetch('https://66173115ed6b8fa43482235e.mockapi.io/system');
        const data = await response.json();
        setSolarSystemInfo(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching solar system info:', error);
        setIsLoading(false);
      }
    };

    fetchSolarSystemInfo();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <Text>Nombre: {item.nombre}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <Text>Masa: {item.masa}</Text>
      <Text>Radio: {item.radio}</Text>
      <Text>Distancia al Sol: {item.distanciaSol}</Text>
      <Text>Órbita: {item.orbita}</Text>
      <Text>Rotación: {item.rotacion}</Text>
      <Text>Lunas: {item.lunas}</Text>
      <Text>Descripción: {item.Description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={solarSystemInfo}
          renderItem={renderItem}
          keyExtractor={(item) => item.planeta}
        />
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

export default SolarSystemScreen;