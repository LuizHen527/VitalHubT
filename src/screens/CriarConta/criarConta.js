import { useState } from "react"
import { LinkCancel } from "../../components/Links/style"
import { ButtonLoginVE } from "../../components/button/style"
import { Container, ContainerLogoTipo } from "../../components/container/style"
import { Logo } from "../../components/images/style"
import { Input } from "../../components/input/styled"
import { ButtonTitle, RegularTextRP, Title } from "../../components/title/style"
import api from "../../service/service"

export const CriarConta = ({navigation}) => {

    const [nome,setNome]= useState("")
    const [email,setEmail]= useState("")
    const [senha,setSenha]= useState("")

    // const handleEmailInputChange = (event) => setEmail(event.target.value)
    // const handleSenhaInputChange = (event) => setSenha(event.target.value)


    async function CadastrarConta(){
        await api.post(`/Pacientes`, {
            rg: "",
            cpf: "",
            dataNascimento: "",
            cep: "",
            logradouro: "",
            numero:0,
            nome: nome,
            email: email,
            senha:senha,
            idTipoUsuario: "21A9FD40-9E9E-410F-B45D-861F3A0FFACB",
            foto: ""
        }).then(response => {
            console.log(response);
            console.log("USUÁRIO CADASTRAD:-------",email,senha)
        })
        .catch(error => {
            console.log(error);
        })
      
    
          
    
    }





    return(
        <Container>
            <ContainerLogoTipo>
                <Logo
                    source={require('../../assets/logo.png')}
                />
            </ContainerLogoTipo>

            <Title>Entrar ou criar conta</Title>

            <RegularTextRP>Insira seu endereço de e-mail e senha para realizar seu cadastro.</RegularTextRP>

            <Input
            onChangeText={(txt) => setNome(txt)}
            placeholder="Nome"
            />
            <Input
            onChangeText={(txt) => setEmail(txt)}
            placeholder="Usuario ou Email"
            />

            <Input
            onChangeText={(txt) => setSenha(txt)}
            placeholder="Senha"
            secureTextEntry={true}
            />
            
            <Input

            placeholder="Confirmar senha"
            secureTextEntry={true}
            />
            <ButtonLoginVE
                title='Volta para login'
                onPress={() => CadastrarConta()}
                // onPress={() => navigation.navigate('Login')}
            >
                <ButtonTitle>CADASTRAR</ButtonTitle>
            </ButtonLoginVE>

            <LinkCancel
                title='Volta para login'
                onPress={() => navigation.navigate('Login')}
            >Cancelar</LinkCancel>
            
        </Container>
    )
}