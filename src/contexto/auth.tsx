// auth.tsx

import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';

interface AuthContextType {
    authenticated: boolean;
    user: any;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    authenticated: false,
    user: null,
    loading: true,
    login: async () => { },
    logout: () => { }
});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        // const recoveredUser = localStorage.getItem("amigochocolate:user");

        // if (recoveredUser) {
        //     setUser(JSON.parse(recoveredUser));
        // }

        // setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
       try {
        
            const resposta = await axios.get(
                `http://localhost:3000/User?Email=${email}&Password=${password}`);

            if (resposta.data.length != 0) {
                setUser(resposta.data);

                console.log("User", resposta.data)

                localStorage.setItem("amigochocolate:user", JSON.stringify(resposta.data));
                navigation.navigate('Home');
            }
            else{
               alert("Usuario não encontrado!");             
            }
        } catch (err) {
            console.log("Erro ao enviar os dados: ", err);
        }
    };

    const logout = () => {
        setUser(null);
        navigation.navigate("Login");
    };

    useEffect(() => {
        const clearStorage = () => {
            try {
                logout();
            } catch (error) {
                console.log(error);
            }
        };

        const id = setInterval(() => {
            clearStorage();
        }, 43200000);

        return () => clearInterval(id);
    }, []);

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
