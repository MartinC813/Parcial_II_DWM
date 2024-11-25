import { StyleSheet, Text, View, FlatList, Platform, Dimensions, Pressable, ActivityIndicator} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ModalM } from "../components/Modal";
import axios from 'axios';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Index() {
    const router = useRouter();
    const [equipos, setEquipos] = useState(null);
    const [sorted, setSorted] = useState(false);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const getEquipos = async () => {
        try {
            const res = await axios.get(`http://161.35.143.238:8000/mcabral`);
            setEquipos(res.data); 
        } catch (error) {
            console.error('Error fetching:');
        }
    };

    useEffect(() => {
        getEquipos();
    }, [update, open]);

    const goToEquipo = (equipo) => {
        router.push({
            pathname: "/equipo",
            params: {
                equipoId: equipo.id,
            }
        });
    };

    const renderEquipo = (item) => {
        const equipo = item.item;

        return (
            <Pressable onPress={() => goToEquipo(equipo)}>
                <View style={styles.Equipo}>
                    <Text>{equipo.name}</Text>
                </View>
            </Pressable>
        );
    };

    const ordenarEquipos = () => {
        if (!sorted) {
            const ordenados = [...equipos].sort((a, b) => b.points - a.points);
            setEquipos(ordenados);
        } else {
            setUpdate(!update)
        }
        setSorted(!sorted)
    };

    if (!equipos)
        return (
            <View>
                <Text>Cargando</Text>
            </View>
        );

    return (
        <SafeAreaView style={styles.Container}>
            <ModalM
                open={open}
                setOpen={setOpen}
                update={update}
                setUpdate={setUpdate}
                equipo={null}
            />
            <FlatList
                data={equipos}
                renderItem={renderEquipo}
                keyExtractor={item => item.id}
                numColumns={1}
                style={styles.equipoList}
            />
            <View styly={styles.posBoton}>
                <Pressable
                        onPress={() => setOpen(true)}
                    >
                    {Platform.OS === "ios" ?
                        <Text style={styles.boton}>Crear Equipo</Text>
                        : <Text style={styles.boton}>Nuevo Equipo</Text>
                    } 
                </Pressable>

                <Pressable onPress={ordenarEquipos}>
                    <Text style={styles.boton}>🔽</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
    Container: {
        flex:1,
        alignItems:"center",
        display:"flex"
    },
    posBoton:{
        flex:1,
        display:"flex",
        alignItems:"flex-end",
        justifyContent:"flex-end"
    },

    equipoList: {
        width: window.width * 0.85,
        height: window.height * 0.85,
    },

    Equipo: {
        flex: 1,
        alignItems: "center",
        marginTop: 20,
        backgroundColor: "grey",
    },
    boton: {
        gap:10,
    fontSize:20,
        ...Platform.select({
            ios: {
                backgroundColor:"green",
                color:"black",
                left:130
            },
            android:{
                backgroundColor:"blue",
                color:"white",
                right:130
            },
            default:{
                backgroundColor:"red",
            }
        }),
    },
})