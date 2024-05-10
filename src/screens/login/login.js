import { ActivityIndicator, Button, Image, Text, View } from "react-native"
import { Container } from "../../components/container/style"
import { ImageGoogle, Logo } from "../../components/images/style"
import { ButtonTitle, ButtonTitleGoogle, TextAccount, Title } from "../../components/title/style"
import { Input } from "../../components/input/styled"
import { LinkBold, LinkMedium } from "../../components/Links/style"
import { ButtonGoogle, ButtonLogin } from "../../components/button/style"
import { AntDesign } from '@expo/vector-icons';
import { ContainerLogo, ContentAccount } from "./style";

import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../service/service"

//Import das bibliotecas para a biometria
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from "react"


export const Login = ({ navigation }) => {

    const [email, setEmail] = useState('l@gmail.com');
    const [senha, setSenha] = useState('123456');
    const [loadingIcon, setLoadingIcon] = useState(false);
    const [errorEmail, setErrorEmail] = useState("");
    const [errorSenha, setErrorSenha] = useState("");


    async function fieldValidation() {
        let error = false;
    
        if (!email.trim()) {
            setErrorEmail("Email deve ser preenchido corretamente");
            error = true;
        } else {
            setErrorEmail("");
        }
    
        if (!senha.trim()) {
            setErrorSenha("Senha deve ser preenchida corretamente");
            error = true;
        } else {
            setErrorSenha("");
        }
    
        return !error;
    }
    

    async function Login() {
        if (loadingIcon) {
            return; // Se já estiver carregando, não faça nada
        }
    
        if (!fieldValidation()) {
            return; // Se a validação falhar, não continue com o login
        }
    
        setLoadingIcon(true);
    
        //Chamar api de Login
        try {
            const response = await api.post('/Login', {
                email: email,
                senha: senha,
            });
    
            await AsyncStorage.setItem('token', JSON.stringify(response.data));
            navigation.replace("Main");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            // Trate o erro conforme necessário, como exibir uma mensagem de erro para o usuário
        } finally {
            setLoadingIcon(false); // Independentemente do resultado, pare o loading
        }
    }
    
    
    async function LoginDoctor() {
        navigation.replace("MainDoctor")
    };

    useEffect(() => {

    }, []);
    return (
        <Container>

            <StatusBar
                backgroundColor="#49B3BA"
            />
            
            <ContainerLogo>
                <Logo
                    source={require('../../assets/logo.png')}
                />
            </ContainerLogo>


            <Title>Entrar ou criar conta</Title>

            <Input
            placeholder="Usuario ou Email"
            value={email}
            onChangeText={(txt) => setEmail(txt)}
            onSubmitEditing={() => fieldValidation() }
            />
           <Text style={{color: 'red',marginRight:"47.5%"}} >{errorEmail}</Text>
            <Input
            placeholder="Senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={(txt) => setSenha(txt)}
            onSubmitEditing={() => fieldValidation() }
            />
              <Text style={{color: 'red',marginRight:"46.5%"}} >{errorSenha}</Text>

            <LinkMedium onPress={() => navigation.navigate("RecuperarSenha")}>Esqueceu sua senha?</LinkMedium>

            {!loadingIcon ? (
                <ButtonLogin onPress={() => Login()}>
                    <ButtonTitle>Entrar</ButtonTitle>
                </ButtonLogin>
            ) : (
                <ButtonLogin>
                    <ActivityIndicator size="small" color="white"/>
                </ButtonLogin>
            )}

            <ButtonGoogle onPress={() => LoginDoctor()}>
                <AntDesign name="google" size={18} color="#496BBA" />
                <ButtonTitleGoogle >Entrar com google</ButtonTitleGoogle>
            </ButtonGoogle>

            <ContentAccount>
                <TextAccount>Nao tem conta?</TextAccount>
                <LinkBold onPress={() => navigation.navigate('CriarConta')}>Crie uma conta agora!</LinkBold>
            </ContentAccount>
        </Container>
    )
}


