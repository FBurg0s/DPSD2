import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import List from '../Components/list';
import { useState } from 'react';
export default function VerListado({ navigation }) {
    return (
        <View style={styles.container} >

            <List></List>

            <View style={styles.circle}>
                <TouchableOpacity onPress={() => navigation.navigate("Agregar Personas")}>
                    <Text style={styles.circle_signo}>+</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "flex-end",
    },
    circle: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'green',
        margin: 30,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    circle_signo: {
        color: "white",
        fontSize: 35,
        textAlign: "center",
    }
});