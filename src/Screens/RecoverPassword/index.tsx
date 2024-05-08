import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
type RecoverPasswordType = {
    email: string;
}

export function RecoverPassword() {
    const navigation = useNavigation<routesType>();
    const { control, handleSubmit, formState: { errors } } = useForm<RecoverPasswordType>({
        defaultValues: {
            email: ''
        }
    });
    

    function HandleOnClick(data: RecoverPasswordType) {
        navigation.navigate("Login");
    }

return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueci Minha Senha</Text>
      <Controller
                control={control}
                name="email"
                rules={{ required: "É necessário preencher o email" }}
                render={({ field, fieldState: { error } }) => (
                    <View>
                        <TextInput
                             style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#ccc"
                            keyboardType="email-address"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{color: 'red'}}>{error.message}</Text>}
                    </View>
                )}
            />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar Email de Recuperação</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#6d4c41",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#000000",
  },
  button: {
    backgroundColor: "#6d4c41",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  goBackButton: {
    marginTop: 20,
    backgroundColor: "#6d4c41",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  goBackButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});