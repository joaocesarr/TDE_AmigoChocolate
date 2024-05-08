import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { routesType } from "../../Routes/routes";
import React from "react";


type GroupType = {
        Nome: string,
        QtdUsuario: string,
        Valor: string,
        DataRevelacao: string,
        Descricao:  string,
        Id_Status: number,
        id: number
    
}

type GruopCardType = {
    data: GroupType;
}


export function GroupCard({data} : GruopCardType) {
    const navigation = useNavigation<routesType>();
    return (
        <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate("RegistrationGroup") }}>
            <View style={styles.imageBorder}>
                <Image style={styles.image} source={require('../../assets/groups.png') } />
            </View>
            
            <View style={styles.textView}>
                <Text style={styles.textTitles}  numberOfLines={1}  adjustsFontSizeToFit>
                    {data.Nome}
                </Text>
                <Text style={styles.textSubtitle}>
                {data.DataRevelacao}
                </Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
styledView:{
    maxHeight: 300,
    minHeight: 100,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
},

card:{
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height:150,
},
cardTitles: {
    color: 'red',
    fontSize:15,
    height:40,
    width:120,
    textAlign: 'center'
},
text:{
    color: 'yellow',
    fontSize:15,
    height:40,
    width:120,
    textAlign: 'center',

},
textTitles: {
    fontSize: 24,
    lineHeight: 38,
    fontWeight: 'bold',
    maxWidth: '100%',
},
textSubtitle: {
    top:-10,
    fontSize: 14,
    lineHeight: 18,
    margin: 1,
    marginBottom: -8,
    color: "#000000",

},
image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderWidth:1.5,
    borderColor: 'black',
},
imageBorder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 75,
    height:75,
    backgroundColor: 'gray',
},
textView:{
    width:150,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
}

})
