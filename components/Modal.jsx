import { useState } from "react";
import { Modal, StyleSheet, View, Text, Pressable } from "react-native"
import { TextInput } from "react-native";
import axios from "axios";

export function ModalM({ equipo , open, setOpen, update, setUpdate}) {
    const [name, setName] = useState(equipo?.name || "");
    const [description, setDescription] = useState(equipo?.description || "");
    const [goals, setGoals] = useState(equipo?.goals || "");
    const [points, setPoints] = useState(equipo?.points || "");

    const validateForm = () => {
        if (!name || !description || !goals || !points) {
            console.log("Error", "All fields are required.");
            return false;
        }
        if (isNaN(goals) || isNaN(points)) {
            console.log("Error", "Moons must be a numeric value.");
            return false;
        }
        return true;
    };

    const pegar = async () => {
        if (!validateForm()) return;

        const newEquipo = {
            name,
            description,
            goals: Number(goals),
            points: Number(points),
        };

        try {
            if (equipo) {
                await axios.put(`http://161.35.143.238:8000/mcabral/${equipo.id}`, newEquipo);
            } else {
                await axios.post(`http://161.35.143.238:8000/mcabral`, newEquipo);
            }

            setUpdate(!update);
        } catch (error) {
            console.error("Error with API request:", error);
        } finally {
            
        }
    };

    return (
        <Modal
            transparent={true}
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <View style={styles.CenteredView}>
                <View style={styles.ModalView}>
                    <Text>
                        {equipo ? "Editar" : "Añadir"}
                    </Text>
    
                    <TextInput
                        style={styles.Input}
                        onChangeText={setName}
                        placeholder="Ingrese el nombre"
                    />
                    <Text style={styles.Label}>
                        Name
                    </Text>
    
                    <TextInput
                        style={styles.Input}
                        onChangeText={setGoals}
                        placeholder="Ingrese cantidad de goles"
                        keyboardType="numeric"
                    />
                    <Text style={styles.Label}>
                        Goles
                    </Text>
                    <TextInput
                        style={styles.Input}
                        onChangeText={setDescription}
                        placeholder="Ingrese una descripcion"
                    />
                    <Text style={styles.Label}>
                        Description
                    </Text>
                    <TextInput
                        style={styles.Input}
                        onChangeText={setPoints}
                        placeholder="Ingrese la cantidad de puntos"
                        keyboardType="numeric"
                    />
                    <Text style={styles.Label}>
                        Cantidad de puntos
                    </Text>
                    <Pressable onPress={pegar}>
                        <Text style={styles.Button}>Aplicar</Text>
                    </Pressable>    
                    <Pressable onPress={() => setOpen(false)}>
                        <Text style={styles.Button}>X</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
    
}


const styles = StyleSheet.create({
    CenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ModalView: {
        width: "90%",
        maxWidth: "90%",
        margin: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    Label: {
        fontWeight: "normal",
        fontSize: 10,
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 20,
    },

    Button: {
        fontWeight: "bold",
        marginTop: 20,
        color: "red",
    }
});

