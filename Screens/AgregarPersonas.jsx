import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AgregarPersonas() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [recordatorios, setRecordatorio] = useState('');
  const [lugares, setLugares] = useState('');
  const [descripciones, setDescripcion] = useState('');
  

  const navigation = useNavigation();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const handleConfirmTime = (time) => {
    const formattedTime = time.toLocaleTimeString().split(' ')[0];
    setSelectedTime(formattedTime);
    hideTimePicker();
  };

  const guardarDatos = async () => {
    try {
      if (!recordatorios || !lugares || !descripciones || !selectedDate || !selectedTime) {
        alert('Por favor complete todos los campos');
        return;
      }

      

      const nuevoRecordatorio = {
        recordatorio: recordatorios,
        lugar: lugares,
        descripcion: descripciones,
        
        fecha: selectedDate + ' ' + selectedTime,
      };

      let listaRegistro = await AsyncStorage.getItem('listaRegistro');
      listaRegistro = listaRegistro ? JSON.parse(listaRegistro) : [];
      listaRegistro.push(nuevoRecordatorio);
      await AsyncStorage.setItem('listaRegistro', JSON.stringify(listaRegistro));

      alert('Recordatorio agregado correctamente');
      navigation.navigate('ver Listado');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COMPLETA LA INFORMACION</Text>
      <TextInput
        style={styles.input}
        placeholder='Recordatorio'
        value={recordatorios}
        onChangeText={setRecordatorio}
      />
      <TextInput
        style={styles.input}
        placeholder='Lugar'
        value={lugares}
        onChangeText={setLugares}
      />
      <TextInput
        style={styles.input}
        placeholder='Descripcion'
        value={descripciones}
        onChangeText={setDescripcion}
      />
      

      <View style={styles.boxDate}>
        <Button title="Seleccionar fecha de Recordatorio" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de Recordatorio"
          value={selectedDate}
          editable={false}
        />
      </View>

      <View style={styles.boxDate}>
        <Button title="Seleccionar hora de Recordatorio" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />
        <TextInput
          style={styles.input}
          placeholder="Hora de Recordatorio"
          value={selectedTime}
          editable={false}
        />
      </View>

      <Button title='Agregar Recordatorio' onPress={guardarDatos}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  boxDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
