import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
//asyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useEffect, useState } from 'react';
export default function SingUp({ navigation }) {
  //variables para el registro
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    //validamos que las dos contrasenas sean iguales
    if (password !== confirmPassword) {
      alert('la contraseña no coincide, intente de nuevo');
      return;
    }

    //guaramos los datos del usuario en AsynStorage
    try {

      // Verificar si algún campo está vacío
      if (!username || !email || !password || !confirmPassword) {
        alert('Por favor complete todos los campos');
        return;
      }
      // Comprobar si ya existe un usuario con la misma dirección de correo electrónico
      const existingUser = await AsyncStorage.getItem(email);
      if (existingUser) {
        alert('Ya existe un usuario con esta dirección de correo electrónico');
        return;
      }
      // Guardar los datos del usuario en AsyncStorage
      const userData = JSON.stringify({ username, email, password });

      await AsyncStorage.setItem(username, userData);

      alert('Usuario Creado Correctamente');
      //Si todo es correcto 
      // Redirigimos a la pantalla de inicio de sesión
      navigation.goBack();


    } catch (error) {
      console.log("error al guardar los datos " + error)
      alert("error en el servidor intente mas tarde");
    }

  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>REGISTRATE</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder='Usuario'
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        value={email}
        placeholder='Correo'
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder='Contraseña'
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        value={confirmPassword}
        placeholder=' Repite la Contraseña'
        secureTextEntry={true}
        onChangeText={text => setConfirmPassword(text)}
      />

      <TouchableOpacity>
        <Button title='CREAR CUENTA' onPress={handleSignUp} style={styles.btnCrearCuenta} ></Button>

      </TouchableOpacity>
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
  title: {
    fontSize: 40,
    marginBottom: 50,
    color: "blue",
    

  }, input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  btnCrearCuenta: {
    width: '80%'
  }

});
