import { Button, Image, View } from "react-native"
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
import { useState } from "react"


export const Login = ({navigation}) => {

    const [email, setEmail] = useState('l@gmail.com');
    const [senha, setSenha] = useState('123456');

    async function Login() {

        //Chamar api de Login
        const response = await api.post('http://192.168.19.125:4466/api/login', {
            email: email,
            senha: senha
        });

        await AsyncStorage.setItem('token', JSON.stringify(response.data));

        navigation.replace("Main");
    }
    async function LoginDoctor() {
        navigation.replace("MainDoctor")
    }
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
            // onChange={event => event.nativeEvent.text}
            />
            <Input
            placeholder="Senha"
            secureTextEntry={true}
            value={senha}
            onChangeText={(txt) => setSenha(txt)}
            />

            <LinkMedium onPress={() => navigation.navigate("RecuperarSenha")}>Esqueceu sua senha?</LinkMedium>

            <ButtonLogin onPress={() => Login()}>
                <ButtonTitle>Entrar</ButtonTitle>
            </ButtonLogin>

            <ButtonGoogle onPress={() => LoginDoctor()}>
            <AntDesign name="google" size={18} color="#496BBA" />
                <ButtonTitleGoogle>Entrar com google</ButtonTitleGoogle>
            </ButtonGoogle>

            <ContentAccount>
                <TextAccount>Nao tem conta?</TextAccount>
                <LinkBold onPress={() => navigation.navigate('CriarConta')}>Crie uma conta agora!</LinkBold>
            </ContentAccount>
        </Container>
    )
}