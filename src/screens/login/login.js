import { ActivityIndicator, Button, Image, View } from "react-native"
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


export const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loadingIcon, setLoadingIcon] = useState(false);
    const [errorEmail, setErrorEmail] = useState("");
    const [errorSenha, setErrorSenha] = useState("");


    async function fieldValidation() {
        let error = false;
    
        if (!email.trim()) {
            setErrorEmail("Email deve ser preenchido");
            error = true;
        } else {
            setErrorEmail("");
        }
    
        if (!senha.trim()) {
            setErrorSenha("Senha deve ser preenchida");
            error = true;
        } else {
            setErrorSenha("");
        }
    
        return !error;
    }
    

    async function Login() {
        if (fieldValidation()) {
    
            console.log("TA ERRADO");
            console.log(errorEmail,errorSenha);

            return; // Se a validação falhar, não continue com o login
        }

        setLoadingIcon(true);

        //Chamar api de Login
        const response = await api.post('/Login', {
            email: email,
            senha: senha,
        });

        //console.log(response);

        await AsyncStorage.setItem('token', JSON.stringify(response.data));
        // await AsyncStorage.setItem('idUsuario', (response.data.));

        navigation.replace("Main");

        setLoadingIcon(false);
    }
    
    async function LoginDoctor() {
        navigation.replace("MainDoctor")
    };

     useEffect(() => {

     }, []);
    return(
        <Container>
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
            errorMessage={errorEmail}
            />
            <Input
            placeholder="Senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={(txt) => setSenha(txt)}
            errorMessage={errorSenha}
            />

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
