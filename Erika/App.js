import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import SolarSystemScreen from './screens/SolarSystemScreen';
import EarthScreen from './screens/EarthScreen';
import SunScreen from './screens/SunScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'lightblue',
            borderTopWidth: 2,
            borderTopColor: 'blue',
            height: 50, // Altura de la barra de pestañas
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5, // Margen inferior del texto
          },
          tabBarIconStyle: {
            marginBottom: -3, // Ajuste para alinear el icono con el texto
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="Sistema Solar"
          component={SolarSystemScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
                <Text style={styles.tabItemText}>Sistema Solar</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Tierra"
          component={EarthScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
                <Text style={styles.tabItemText}>Tierra</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Sol"
          component={SunScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <View style={[styles.tabItem, focused && styles.tabItemFocused]}>
                <Text style={styles.tabItemText}>Sol</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'white',
  },
  tabItemFocused: {
    backgroundColor: 'lightgray',
  },
  tabItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});