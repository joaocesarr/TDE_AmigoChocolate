import { useIsFocused, useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {  TouchableOpacity, View, Image,Text, StyleSheet, ScrollView } from "react-native";
import { GroupCard } from "../../Components/GroupCard";
import { FontAwesome5 } from '@expo/vector-icons';

export function Home() {
    const [gruposUsuario, setGruposUsuario] = useState<any[]>([]);
    const navigation = useNavigation<routesType>();
    const focus = useIsFocused();
    useEffect(() => {
        getGruposUsuario()
    }, [focus])

    async function getGruposUsuario() {
        try {
            const apiUrl = `http://localhost:3000/Group`;
            const resposta = await axios.get(apiUrl);
            console.log(resposta);
            setGruposUsuario(resposta.data)

        } catch (err) {
            console.log("Erro ao enviar os dados: ", err);
        }
    }

    return (
      <View style={styles.container}>
     <ScrollView style={styles.scrollView}>
        {gruposUsuario.length > 0? (
          <View style={styles.groupContainer}>
            {gruposUsuario.map((grupo) => (
              <GroupCard key={grupo.id} data={grupo} />
            ))}
          </View>
        ) : (
          <><Text style={styles.noGroupsText}>Você ainda não participa de nenhum grupo 😢</Text>
          <Text style={styles.noGroupsText}>Inicie um grupo no botão "Iniciar" abaixo</Text>
          <br />
          <FontAwesome5  style={styles.noGroupsIcon} name="hand-point-down" size={35} color="black" />
          </>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("RegistrationGroup") }}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
    )
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
    pageBorder: {
      borderColor: "#c7c7c7",
      borderWidth: 2,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#000000",
    },
    button: {
      backgroundColor: "#6d4c41",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      bottom: 5,
    },
    buttonText: {
      fontSize: 18,
      color: "#ffffff",
    },
  });