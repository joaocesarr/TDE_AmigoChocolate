import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  ScrollView
} from "react-native";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MaskInput, { Masks } from 'react-native-mask-input';


type GroupRegistrationType = {
    image?: string;
    name: string;
    qtdUsers: string;
    amount: string;
    dtReveal: string;
    description?: string;
}

export function RegistrationGroup() {
    const [newImage, setNewImage] = useState('');

    const navigation = useNavigation<routesType>();

    const { control, handleSubmit, setValue } = useForm<GroupRegistrationType>({
        defaultValues: {
            image: '',
            name: '',
            qtdUsers: '',
            amount: '',
            dtReveal: '',
            description: ''
        }
    });

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setValue('image', result.assets[0].uri);
            setNewImage(result.assets[0].uri);
        }
    };

    async function HandleOnClick(data: GroupRegistrationType) {
        try {
            console.log("Data :", data);

            const resposta = await axios.post(
                'http://localhost:3000/Group', {
                    // Foto: data.image,
                    Nome: data.name,
                    QtdUsuario: data.qtdUsers,
                    Valor: data.amount,
                    DataRevelacao: data.dtReveal,
                    Descricao: data.description,
                    Id_Status: 1                        
            });

            if (resposta.status === 201) {
                navigation.navigate("Home");
            }
        } catch (err) {
            console.log("Erro ao enviar os dados: ", err);
        }
    }

    return (

      <ScrollView
      horizontal={false}
showsVerticalScrollIndicator={false}
contentContainerStyle={styles.container}
onScroll={(event) => console.log(event.nativeEvent.contentOffset.x)}
> 
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
      <Text style={styles.title}>Criar Grupo</Text>
      <Controller
                control={control}
                name="name"
                rules={{ required: "Informar um Nome" }}
                render={({ field, fieldState: { error } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do Grupo"
                            placeholderTextColor="#ccc"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                 )}
                     />

<Controller
                control={control}
                name="description"
                render={({ field, fieldState: { error } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Descrição do Grupo"
                            placeholderTextColor="#ccc"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

<Controller
  control={control}
  name="amount"
  rules={{ required: "É necessário informar uma valor" }}
  render={({ field, fieldState: { error } }) => (
    <View style={styles.inputContainer}>
      <MaskInput
        style={[styles.input]}
        placeholderTextColor="#ccc"
        placeholder="Valor minimo"
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        mask={Masks.BRL_CURRENCY}
      />
      {error && <Text style={{ color: 'ed' }}>{error.message}</Text>}
    </View>
  )}
/>

       <Controller
  control={control}
  name="dtReveal"
  rules={{ required: "É necessário informar uma data" }}
  render={({ field, fieldState: { error } }) => (
    <View style={styles.inputContainer}>
      <MaskInput
        style={[styles.input]}
        placeholderTextColor="#ccc"
        placeholder="Data"
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        mask={Masks.DATE_DDMMYYYY}
      />
      {error && <Text style={{ color: 'ed' }}>{error.message}</Text>}
    </View>
  )}
/>
          

            
             <Controller
                control={control}
                name="qtdUsers"
                rules={{ required: "É necessário informar a quantidade de participantes", }}
                render={({ field, fieldState: { error } }) => (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input]}
                            placeholderTextColor="#ccc"
                            placeholder="Quantidade de pessoas"
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                        />
                        {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                    </View>
                )}
            />

      
      <TouchableOpacity style={styles.button} onPress={handleSubmit(HandleOnClick)}>
        <Text style={styles.buttonText}>Criar Grupo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 20,
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
    avatarContainer: {
      marginTop: 100,
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
    description:{
      fontSize: 15,
      color: "white",
      textAlign: "center",
      marginTop: 2,
    },
    photoContainer: {
      marginTop:150,
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 20,
      backgroundColor: "#6d4c41",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#000000",
      textAlign: "center",
    },
    textArea: {
      height: 100,
    },
    participantsTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#000000",
    },
    participantsContainer: {
      width: "100%",
      marginBottom: 20,
    },
    participantText: {
      fontSize: 16,
      color: "#000000",
    },
    addButton: {
      backgroundColor: "#6d4c41",
      width: "100%",
      height: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#6d4c41",
      width: "100%",
      height: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 10,
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
      backgroundColor: "#6d4c41",
      width: "100%",
      height: 50,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 50,
    },
    goBackButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    image: {   
      width: 90,
      height: 90,
      borderRadius: 45,
    }
  });