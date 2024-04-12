import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Button } from 'react-native';
//asynStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
//tipografia
import * as Font from 'expo-font' 
import SingUp from './SingUp';

export default function Login({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async()=>{
    try {
       // Obtener los datos del usuario utilizando el correo electrónico como clave
       const userData = await AsyncStorage.getItem(username);
      if (userData) {
        const user = JSON.parse(userData);
         if (user.password === password) {
           navigation.navigate('Salir');
          } else { // Aquí estaba el error de sintaxis
             alert('Error: Contraseña incorrecta');
          }

      } else {
        alert('Error: Usuario no encontrado');
      }
    } catch (error) {
      console.log('Error:', error);
      alert('Error: Ocurrió un error al iniciar sesión');
    }
  };

  
  return(
    <View style={styles.container}>
      <Text style={styles.title} >AGENDA</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder='Usuario'
      />
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
        <Text style={styles.btnText}>INGRESAR</Text>
      </TouchableOpacity>



      <View style={styles.container_CrearCuenta}>
        <Text style={styles.parrafo}>¿Todavía no tiene una cuenta? </Text>
        
        <TouchableOpacity >
        <Button title='Registrate aquí' onPress={() => navigation.navigate("Crear Cuenta")} />
        </TouchableOpacity>
      </View>

    </View>
  );  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:40,
    marginBottom:50,
    color:"black",
    

  },
  parrafo:{
    fontSize:16,
    padding:10
  },
  input:{
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  container_CrearCuenta:{
    marginTop: '50%',
    borderRadius:20,
  },
  btnText:{
    width:'80%',
    paddingHorizontal:50,
    paddingVertical:10,
    borderRadius:12,
    backgroundColor:'red',
    color:'white'
  }
});
