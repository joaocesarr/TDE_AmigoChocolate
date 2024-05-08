import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import { useAuth } from "../../contexto/auth";
import { Ionicons } from '@expo/vector-icons';


type UserLoginType = {
    email: string;
    password: string;
}


export function Login() {
    const { login } = useAuth();
    const navigation = useNavigation<routesType>();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
      };

      const { control, handleSubmit } = useForm<UserLoginType>({

        defaultValues: {
            email: '',
            password: ''
        }
    });

    async function HandleOnClick(data: UserLoginType) {
        try {
            await login(data.email, data.password)
        } catch (erro) {
            console.log('Erro ao enviar dados: ', erro);
        }
    }
    

     return (
    <View style={styles.container}>
      <Text style={styles.title}>Amigo Chocolate</Text>
      <Controller
  control={control}
  name="email"
  rules={{ required: "É necessário preencher o email", }}
  render={({ field: {value, onChange,onBlur}, fieldState: { error } }) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
      />
      {error && <Text style={{ color: 'ed' }}>{error.message}</Text>}
    </View>
  )}
/>

<Controller
                control={control}
                name="password"
                rules={{ required: "É necessário preencher a senha"}}
                render={({ field: {value, onChange,onBlur}, fieldState: { error } }) => (
                  <View style={styles.inputContainerPassword}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    style={styles.inputPassword}
                    placeholder="Senha"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  <TouchableOpacity style={styles.button2} onPress={toggleShowPassword}>
                    {
                      <Ionicons
                        name={showPassword ? "eye" : "eye-off"}
                        size={24}
                        color="black"
                      />
                    }
                  </TouchableOpacity>
                  {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                </View>
                
                )}
            />

      <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
        <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUp}>Cadastre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(HandleOnClick)}>
  <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button2: {
    padding: 10,
  },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",

      paddingHorizontal: 20,
    },
    inputContainerPassword: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth:1,
      borderColor: 'gray',
      marginBottom: 10,
    },
    inputPassword: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 40,
      color: "#000000",
      textAlign: "center",
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth:1,
      borderColor: 'gray',
      marginBottom: 10,
      width:226,
      height: 47.33
    },
    
    input: {
      flex: 1,
      height: 50,
      paddingHorizontal: 10,
    },
    forgotPassword: {
      color: "#6d4c41",
      fontSize: 16,
      marginBottom: 20,
    },
    signUp: {
      color: "#6d4c41",
      fontSize: 16,
      marginBottom: 20,
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
  });
