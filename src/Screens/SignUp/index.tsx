import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
type UserSignUpType = {
    image: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const { width, height } = Dimensions.get("window");

export function SignUp() {
    const [newImage, setNewImage] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const navigation = useNavigation<routesType>();

    const { control, handleSubmit } = useForm<UserSignUpType>({
        defaultValues: {
            image: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

   



const toggleShowPassword = () => {
setShowPassword(!showPassword);
};
const toggleShowPasswordConfirm = () => {
  setShowPasswordConfirm(!showPasswordConfirm);
  };

    async function HandleOnClick(data: UserSignUpType) {

        data.image = newImage;

        if (data.password.toString != data.confirmPassword.toString) {
            alert("A senha de confrimação está incorreta")
        }
        else {
            try {
                const resposta = await axios.post(
                    'http://localhost:3000/User', {
                // Image: data.image,
                    Name: data.name,
                    Email: data.email,
                    Password: data.password,
                });
 
                if (resposta.status === 201) {
                    navigation.navigate("Login");
                }
            } catch (err) {
                console.log("Erro ao enviar os dados: ", err);
            }
        }
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setNewImage(result.assets[0].uri);
        }
    };

return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}> 
              <Controller
                    control={control}
                    name="image"
                    render={({ field }) => (
                        <View>
                            {newImage ? <Image style={styles.imageContainer} source={{ uri: newImage }} /> : <AntDesign name="camera" size={50} color="black"/>}          
                        </View>
                    )}
                />
        </TouchableOpacity>
        <Text style={styles.description}>Coloque uma foto</Text>
      </View>
      <Text style={styles.title}>Cadastre-se no Amigo Chocolate</Text>
 <Controller
  control={control}
  name="name"
  rules={{ required: "É necessário preencher o nome" }}
  render={({ field, fieldState: { error } }) => (
    <View style={styles.inputContainer}> 
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
      />
      {error && <Text style={{ color: 'ed' }}>{error.message}</Text>}
    </View>
  )}
/>

<Controller
  control={control}
  name="email"
  rules={{ required: "É necessário preencher o email", }}
  render={({ field, fieldState: { error } }) => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
      />
      {error && <Text style={{ color: 'ed' }}>{error.message}</Text>}
    </View>
  )}
/>
      <Controller
                control={control}
                name="password"
                rules={{ required: "É necessário preencher a senha" }}
                render={({ field: {value, onBlur,onChange}, fieldState: { error } }) => (
                  <View style={styles.inputContainerPassword}>
                  <TextInput
                    secureTextEntry={!showPassword}
                    style={styles.inputPassword}
                    placeholder="Senha"
                    value={value}
                    onChangeText={onChange}
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
                </View>
                )}
            />
      
      <Controller
                control={control}
                name="confirmPassword"
                rules={{ required: "É necessário confirmar a senha" }}
                render={({  field: {value, onBlur,onChange}, fieldState: { error } }) => (
                  <View style={styles.inputContainerPassword}>
                  <TextInput
                    secureTextEntry={!showPasswordConfirm}
                    style={styles.inputPassword}
                    placeholder="Confirmar Senha"
                    value={value}
                    onChangeText={onChange}
                  />
                  <TouchableOpacity style={styles.button2} onPress={toggleShowPasswordConfirm}>
                    {
                      <Ionicons
                        name={showPasswordConfirm ? "eye" : "eye-off"}
                        size={24}
                        color="black"
                      />
                    }
                  </TouchableOpacity>
                </View>
                )}
            />
         
      <TouchableOpacity style={styles.button} onPress={handleSubmit(HandleOnClick)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  
  inputContainerPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:1,
    borderColor: 'gray',
    marginBottom: 10,
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

  inputPassword: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  button2: {
    padding: 10,
  },
  description:{
    fontSize: 15,
    color: "white",
    textAlign: "center",
    marginTop: 2,
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#6d4c41",
    justifyContent: "center",
    borderWidth: 1,
    alignItems: "center",
    borderColor: "black",
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
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
  image: {   
    width: 110,
    height: 110,
    borderRadius: 55,
  }

});