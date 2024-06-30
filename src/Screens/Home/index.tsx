import React, { useEffect, useState } from "react";
import axios from "axios";
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { GroupCard } from "../../Components/GroupCard";
import { FontAwesome5 } from '@expo/vector-icons';

export function Home() {
    const [gruposUsuario, setGruposUsuario] = useState<any[]>([]);
    const [grupoSorteado, setGrupoSorteado] = useState<any>(null); // Estado para armazenar o grupo sorteado
    const navigation = useNavigation<routesType>();
    const focus = useIsFocused();

    useEffect(() => {
        getGruposUsuario();
    }, [focus]);

    async function getGruposUsuario() {
        try {
            const apiUrl = `http://localhost:3000/Group`;
            const resposta = await axios.get(apiUrl);
            setGruposUsuario(resposta.data);
        } catch (err) {
            console.log("Erro ao enviar os dados: ", err);
        }
    }

    function handleSorteio() {
        if (gruposUsuario.length > 0) {
            const randomIndex = Math.floor(Math.random() * gruposUsuario.length);
            const grupoSorteado = gruposUsuario[randomIndex];
            setGrupoSorteado(grupoSorteado);

            // Exibir alerta com o nome do grupo sorteado
            Alert.alert("Grupo Sorteado", grupoSorteado.nome); // Substitua 'nome' pelo campo correto do seu objeto de grupo
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {grupoSorteado ? (
                    <View style={styles.groupContainer}>
                        <GroupCard key={grupoSorteado.id} data={grupoSorteado} />
                    </View>
                ) : (
                    <>
                        {gruposUsuario.length > 0 ? (
                            <View style={styles.groupContainer}>
                                {gruposUsuario.map((grupo) => (
                                    <GroupCard key={grupo.id} data={grupo} />
                                ))}
                            </View>
                        ) : (
                            <>
                                <Text style={styles.noGroupsText}>Você ainda não participa de nenhum grupo 😢</Text>
                                <Text style={styles.noGroupsText}>Inicie um grupo no botão "Iniciar" abaixo</Text>
                                <FontAwesome5 style={styles.noGroupsIcon} name="hand-point-down" size={35} color="black" />
                            </>
                        )}
                    </>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={handleSorteio}>
                <Text style={styles.buttonText}>Sortear Grupo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("RegistrationGroup") }}>
                <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    noGroupsText: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 150,
        color: "#000000",
        textAlign: "center",
    },
    noGroupsIcon: {
        fontWeight: "bold",
        marginTop: 150,
        color: "#000000",
        textAlign: "center",
    },
    groupContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 30,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    button: {
        backgroundColor: "#6d4c41",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
    },
});
