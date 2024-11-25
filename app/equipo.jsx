import { Dimensions, StyleSheet, View, Text, ActivityIndicator, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ModalM } from "../components/Modal";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Equipo() {
    const { equipoId } = useLocalSearchParams();

    const router = useRouter();
    const [equipo, setEquipo] = useState(null);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const getEquipo = async () => {
        try {
            const res = await axios.get(`http://161.35.143.238:8000/mcabral/${equipoId}`);
            console.log(res)
            setEquipo(res.data);
        } catch (error) {
            console.error('Error fetching equipo:', error.response?.data || error.message);
        }
    };
    
    const deleteEquipo = async () => {
        try {
            await axios.delete(`http://161.35.143.238:8000/mcabral/${equipoId}`);
            router.back(); 
        } catch (error) {
            console.error('Error deleting equipo:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        getEquipo();
    }, [update]);

    if (!equipo)
        return (
            <View>
                <Text>Cargando</Text>
            </View>
        );

        return (
            <SafeAreaView style={styles.Container}>
                <ModalM
                    equipo={equipo}
                    open={open}
                    setOpen={setOpen}
                    update={update}
                    setUpdate={setUpdate}
                />
                <View style={styles.Caracteristicas}>
                    <Text style={styles.Texto}>{equipo.name}</Text>
                    <Text style={styles.Texto}>
                        {equipo.description}{' '}
                    </Text >
                    <Text style={styles.Texto}>
                        Goles totales: {equipo.goals}
                    </Text>
                    <Text style={styles.Texto}>
                        Puntos totales: {equipo.points}
                    </Text>
                </View>
                <View styles={styles.separador}>
                    <Pressable
                        onPress={() => setOpen(true)}
                    >
                        <Text style={styles.boton}>Editar</Text>
                    </Pressable>
                    <Pressable
                        onPress={deleteEquipo}
                    >
                    <Text style={styles.boton}>Borrar</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );        
};

const styles = StyleSheet.create({

    Caracteristicas:{
    },
    Texto: {
        fontSize:30
    },
    Container:{
        alignItems:"center"
    },
    boton: {
        fontSize:20,
        position:"relative",
        top:200
    }
})
