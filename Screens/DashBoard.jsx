import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import VerListado from './VerListado';
import AgregarPersonas from './AgregarPersonas';
const Drawer = createDrawerNavigator();

export default function DashBoard() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Listado de recordatorios " component={VerListado} />
      <Drawer.Screen name="Agregar Recordatorio" component={AgregarPersonas} />
    </Drawer.Navigator>
  );
}
